import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ReactMarkdown from "react-markdown";
import { db } from "./firebase";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

// Language detection: Hindi (Devanagari), else English
const detectLang = (text) => /[\u0900-\u097F]/.test(text) ? "hi" : "en";

export default function ChatbotPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (!loading && !user) navigate("/signin");
  }, [user, loading, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-emerald-50 to-white text-slate-800">
      <Navbar />
      <main className="flex-1 flex flex-col w-full items-center justify-center px-2 py-0">
        <div className="flex flex-col md:flex-row w-full h-full max-w-7xl grow pt-12 pb-4">
          {/* Left panel text */}
          <div className="hidden md:flex flex-1 flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold mb-4">SomaAI Chat</h1>
            <p className="text-lg max-w-md text-center mb-6">
              Ask anything about health, safety, or growing up. Our AI is always ready to help—privately and kindly.
            </p>
            <a
              href="/lessons"
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg font-bold hover:scale-105 transition-all"
            >
              Browse Lessons
            </a>
          </div>
          {/* Right panel: chat window */}
          <div className="flex-1 flex flex-col items-stretch justify-end w-full h-[70vh] md:h-[calc(100vh-110px)]">
            <ChatBox user={user} lang={lang} setLang={setLang} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ChatBox({ user, lang, setLang }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I’m SomaAI. What’s your question?" },
  ]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const listRef = useRef(null);

  // Load chat history from Firestore on mount
  useEffect(() => {
    async function loadHistory() {
      if (user && user.uid) {
        const q = query(collection(db, "users", user.uid, "chatHistory"), orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        const history = [];
        querySnapshot.forEach((doc) => {
          history.push(doc.data());
        });
        if (history.length > 0) setMessages(history);
      }
    }
    loadHistory();
  }, [user]);

  useEffect(() => {
    // Always scroll to bottom
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  async function saveMessage(msg) {
    if (user && user.uid) {
      await addDoc(collection(db, "users", user.uid, "chatHistory"), {
        ...msg,
        timestamp: new Date()
      });
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const detectedLang = detectLang(input);
    setLang(detectedLang);

    const API_BASE = "https://somaai-jfuq.onrender.com";
    const userMsg = { role: "user", text: input.trim(), lang: detectedLang };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setAiTyping(true);
    await saveMessage(userMsg);

    let session_id = sessionId;
    try {
      if (!session_id) {
        // Create new session if first message
        const res = await fetch(`${API_BASE}/api/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: detectedLang }),
        });
        const data = await res.json();
        session_id = data.session_id;
        setSessionId(session_id);
      }
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id,
          message: input.trim(),
          language: detectedLang,
        }),
      });
      const data = await res.json();
      let aiMsg;
      if (data.answer_simple) {
        aiMsg = { role: "assistant", text: data.answer_simple };
        setMessages([...newMsgs, aiMsg]);
        await saveMessage(aiMsg);
      } else if (data.answer) {
        aiMsg = { role: "assistant", text: data.answer };
        setMessages([...newMsgs, aiMsg]);
        await saveMessage(aiMsg);
      } else if (data.error) {
        aiMsg = { role: "assistant", text: data.error };
        setMessages([...newMsgs, aiMsg]);
        await saveMessage(aiMsg);
      } else {
        aiMsg = { role: "assistant", text: "Sorry, no response from backend." };
        setMessages([...newMsgs, aiMsg]);
        await saveMessage(aiMsg);
      }
      setSessionId(session_id);
    } catch {
      const aiMsg = { role: "assistant", text: "Error connecting to backend. Try again soon." }
      setMessages([...newMsgs, aiMsg]);
      await saveMessage(aiMsg);
    }
    setAiTyping(false);
  }

  return (
    <div className="flex flex-col w-full h-full max-h-[80vh] bg-white border border-emerald-100 rounded-xl shadow-lg p-3 md:p-6"
      style={{ minHeight: "500px", flexGrow: 1 }}
    >
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto mb-2 space-y-3 pr-1"
        style={{ minHeight: "300px" }}
      >
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
        {aiTyping && <TypingIndicator />}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 pt-2">
        <input
          className="flex-1 border-2 border-emerald-400 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring focus:ring-emerald-300"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-all text-base font-bold" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[90%] text-base whitespace-pre-line break-words ${
          isUser ? "bg-emerald-600 text-white" : "bg-cyan-100 text-slate-800"
        }`}
        style={{
          fontFamily: isUser ? undefined : "inherit",
          marginLeft: isUser ? "auto" : 0,
          marginRight: !isUser ? "auto" : 0
        }}
      >
        <ReactMarkdown
          components={{
            strong: ({node, ...props}) => <strong style={{fontWeight: 700}} {...props} />,
            b: ({node, ...props}) => <b style={{fontWeight: 700}} {...props} />,
            p: ({node, ...props}) => <p style={{margin: "0.2em 0"}} {...props} />,
            ul: ({node, ...props}) => <ul style={{margin: "0.3em 0 0.3em 1.5em"}} {...props} />
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-2 rounded-lg bg-emerald-100 text-slate-800 flex items-center space-x-1 text-sm">
        <span className="animate-bounce">●</span>
        <span className="animate-bounce delay-100">●</span>
        <span className="animate-bounce delay-200">●</span>
        <span className="ml-2">AI is typing...</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-4 text-center text-xs text-slate-500 border-t border-emerald-100">
      © {new Date().getFullYear()} SomaAI — Built for learning and empowerment.
    </footer>
  );
}