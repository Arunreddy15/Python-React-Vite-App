// React Frontend (Vite)
// File: src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import './my.css'
function App() {
  const [name, setName] = useState('');
  const [sport, setSport] = useState('');
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGreeting('');
    setError(null);
    try {
      const res = await axios.post('/api/greet', { name,sport }); // proxy is used
      setGreeting(res.data.message);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(`Server responded with status ${err.response.status}: ${err.response.statusText}`);
      } else if (err.request) {
        setError('No response received. Is the backend running?');
      } else {
        setError('Error: ' + err.message);
      }
    }
  };

  return (
    <div className="card">
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">React + Python App</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            className="inputboxes"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <input className="inputboxes" type='text' value={sport} placeholder='Enter Favorite Sport' onChange={(e)=>setSport(e.target.value)}/>
          <br/><button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Greet</button>
        </form>
        {greeting && <p className="mt-4 text-lg text-green-700">{greeting}</p>}
        {error && <p className="mt-4 text-lg text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default App;
