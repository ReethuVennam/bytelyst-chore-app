import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [chores, setChores] = useState([]);
  
  // NEW: State for the input fields in our form
  const [newChoreName, setNewChoreName] = useState('');
  const [newChorePoints, setNewChorePoints] = useState('');

  // Fetch chores when the component loads
  useEffect(() => {
    const fetchChores = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chores');
        const data = await response.json();
        setChores(data);
      } catch (error) {
        console.error("Error fetching chores:", error);
      }
    };
    fetchChores();
  }, []);

  // NEW: Function to handle form submission
  const handleChoreSubmit = async (event) => {
    event.preventDefault(); // Prevent the browser from refreshing the page

    const newChore = {
      name: newChoreName,
      points: Number(newChorePoints) // Make sure points is a number
    };

    try {
      const response = await fetch('http://localhost:5000/api/chores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChore),
      });

      const createdChore = await response.json();
      
      // Add the new chore to our existing list in the UI
      setChores([...chores, createdChore]);
      
      // Clear the input fields
      setNewChoreName('');
      setNewChorePoints('');

    } catch (error) {
      console.error('Error creating chore:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chore Management App</h1>
      </header>
      <main>
        {/* NEW: Form for adding a new chore */}
        <div className="form-container">
          <h2>Add a New Chore</h2>
          <form onSubmit={handleChoreSubmit}>
            <input
              type="text"
              placeholder="Chore name"
              value={newChoreName}
              onChange={(e) => setNewChoreName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Points"
              value={newChorePoints}
              onChange={(e) => setNewChorePoints(e.target.value)}
              required
            />
            <button type="submit">Add Chore</button>
          </form>
        </div>

        <h2>Available Chores</h2>
        <div className="chore-list">
          {chores.length === 0 ? (
            <p>No chores available. Add one above!</p>
          ) : (
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