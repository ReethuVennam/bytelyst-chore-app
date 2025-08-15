import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [chores, setChores] = useState([]);
  const [newChoreName, setNewChoreName] = useState('');
  const [newChorePoints, setNewChorePoints] = useState('');

  const [rewards, setRewards] = useState([]);
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardPoints, setNewRewardPoints] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const choreResponse = await fetch('http://localhost:5000/api/chores');
        const choreData = await choreResponse.json();
        setChores(choreData);

        const rewardResponse = await fetch('http://localhost:5000/api/rewards');
        const rewardData = await rewardResponse.json();
        setRewards(rewardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChoreSubmit = async (event) => {
    event.preventDefault();
    const newChore = { name: newChoreName, points: Number(newChorePoints) };
    try {
      const response = await fetch('http://localhost:5000/api/chores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChore),
      });
      const createdChore = await response.json();
      setChores([...chores, createdChore]);
      setNewChoreName('');
      setNewChorePoints('');
    } catch (error) {
      console.error('Error creating chore:', error);
    }
  };
  
  const deleteChore = async (choreId) => {
    try {
      await fetch(`http://localhost:5000/api/chores/${choreId}`, {
        method: 'DELETE',
      });
      setChores(chores.filter((chore) => chore._id !== choreId));
    } catch (error) {
      console.error('Error deleting chore:', error);
    }
  };

  const handleRewardSubmit = async (event) => {
    event.preventDefault();
    const newReward = { name: newRewardName, points: Number(newRewardPoints) };
    try {
      const response = await fetch('http://localhost:5000/api/rewards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReward),
      });
      const createdReward = await response.json();
      setRewards([...rewards, createdReward]);
      setNewRewardName('');
      setNewRewardPoints('');
    } catch (error) {
      console.error('Error creating reward:', error);
    }
  };

  // NEW: Function to handle deleting a reward
  const deleteReward = async (rewardId) => {
    try {
      await fetch(`http://localhost:5000/api/rewards/${rewardId}`, {
        method: 'DELETE',
      });
      // Update the UI by filtering out the deleted reward
      setRewards(rewards.filter((reward) => reward._id !== rewardId));
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chore & Reward App</h1>
      </header>
      <main className="container">
        {/* Chores Section */}
        <section className="column">
          <h2>Chores</h2>
          <div className="form-container">
            <form onSubmit={handleChoreSubmit}>
              <input type="text" placeholder="Chore name" value={newChoreName} onChange={(e) => setNewChoreName(e.target.value)} required />
              <input type="number" placeholder="Points" value={newChorePoints} onChange={(e) => setNewChorePoints(e.target.value)} required />
              <button type="submit">Add Chore</button>
            </form>
          </div>
          <div className="list-container">
            {chores.length === 0 ? <p>No chores available.</p> : (
              <ul>
                {chores.map((chore) => (
                  <li key={chore._id}>
                    {chore.name} - <strong>{chore.points} points</strong>
                    <button className="delete-btn" onClick={() => deleteChore(chore._id)}>X</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Rewards Section */}
        <section className="column">
          <h2>Rewards</h2>
          <div className="form-container">
            <form onSubmit={handleRewardSubmit}>
              <input type="text" placeholder="Reward name" value={newRewardName} onChange={(e) => setNewRewardName(e.target.value)} required />
              <input type="number" placeholder="Points cost" value={newRewardPoints} onChange={(e) => setNewRewardPoints(e.target.value)} required />
              <button type="submit">Add Reward</button>
            </form>
          </div>
          <div className="list-container">
            {rewards.length === 0 ? <p>No rewards available.</p> : (
              <ul>
                {rewards.map((reward) => (
                  <li key={reward._id}>
                    {reward.name} - <strong>{reward.points} points</strong>
                    {/* NEW: Delete button */}
                    <button className="delete-btn" onClick={() => deleteReward(reward._id)}>X</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;