import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 'chores' is a state variable to hold our list of chores
  const [chores, setChores] = useState([]);

  // 'useEffect' runs code when the component first loads
  useEffect(() => {
    // This function fetches data from our back-end API
    const fetchChores = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chores');
        const data = await response.json();
        setChores(data); // Update our state with the fetched chores
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };

    fetchChores();
  }, []); // The empty array [] means this effect runs only once

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chore Management App</h1>
      </header>
      <main>
        <h2>Available Chores</h2>
        <div className="chore-list">
          {/* If there are no chores, show a loading message */}
          {chores.length === 0 ? (
            <p>Loading chores...</p>
          ) : (
            // Otherwise, map over the chores and display them
            <ul>
              {chores.map((chore) => (
                <li key={chore._id}>
                  {chore.name} - <strong>{chore.points} points</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;