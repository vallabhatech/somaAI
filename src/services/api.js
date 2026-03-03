const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://somaai-jfuq.onrender.com';

export const apiService = {
  // Create a new chat session
  async createSession(language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/api/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.session_id;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  },

  // Send a message to the chat API
  async sendMessage(sessionId, message, language = 'en') {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: message,
          language: language,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};

export default apiService;
