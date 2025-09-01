import React, { useState } from "react";
import LessonCard from "./LessonCard";
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
import Navbar from "./Navbar";

export default function Lessons() {
  const [search, setSearch] = useState("");
  const [lessons, setLessons] = useState([]);
  const filtered = lessons.filter(l => {
    const term = search.toLowerCase();
    const name = l.name?.toLowerCase() || "";
    const content = l.content?.toLowerCase() || "";
    return name.includes(term) || content.includes(term);
  });

  React.useEffect(() => {
      async function fetchData() {
          const docs = await getDocs(collection(db, "Lessons"));
          const lessonsWithId = docs.docs.map(d => ({
            id: d.id,
            ...d.data()
          }));

          lessonsWithId.sort((a, b) => Number(a.id) - Number(b.id));
          setLessons(lessonsWithId);
      }
      fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Lessons</h2>
            <input
              type="text"
              placeholder="Search lessons…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-lg px-4 py-2 border border-emerald-200 shadow focus:ring-emerald-400 focus:outline-none"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map(lesson => (
                <LessonCard 
                    key={lesson.id}
                    id={lesson.id}
                    name={lesson.name}
                    content={lesson.content.slice(20)}
                />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center text-slate-500 py-12">No lessons found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}