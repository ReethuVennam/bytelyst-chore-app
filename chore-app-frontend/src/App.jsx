import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [chores, setChores] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  const [newChoreName, setNewChoreName] = useState('');
  const [newChorePoints, setNewChorePoints] = useState('');
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardPoints, setNewRewardPoints] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const choreResponse = await fetch('http://localhost:5000/api/chores');
        const choreData = await choreResponse.json();
        setChores(choreData);

        const initialPoints = choreData
          .filter(chore => chore.completed)
          .reduce((sum, chore) => sum + chore.points, 0);
        
        const rewardResponse = await fetch('http://localhost:5000/api/rewards');
        const rewardData = await rewardResponse.json();
        setRewards(rewardData);
        
        setTotalPoints(initialPoints); 

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

  const deleteReward = async (rewardId) => {
    try {
      await fetch(`http://localhost:5000/api/rewards/${rewardId}`, {
        method: 'DELETE',
      });
      setRewards(rewards.filter((reward) => reward._id !== rewardId));
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };

  const handleCompleteChore = async (choreToComplete) => {
    if (choreToComplete.completed) return;
    try {
      const response = await fetch(`http://localhost:5000/api/chores/${choreToComplete._id}/complete`, {
        method: 'PATCH',
      });
      const updatedChore = await response.json();

      setTotalPoints(totalPoints + updatedChore.points);
      setChores(chores.map(chore => 
        chore._id === updatedChore._id ? updatedChore : chore
      ));
    } catch (error) {
      console.error("Error completing chore:", error);
    }
  };
  
  const handleRedeemReward = (rewardToRedeem) => {
    if (totalPoints >= rewardToRedeem.points) {
      setTotalPoints(totalPoints - rewardToRedeem.points);
      alert(`You have redeemed "${rewardToRedeem.name}"!`);
    } else {
      alert("You don't have enough points for this reward!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chore & Reward App</h1>
        <div className="points-display">
          <h2>Total Points: {totalPoints}</h2>
        </div>
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
            <ul>
              {chores.map((chore) => (
                <li key={chore._id} className={chore.completed ? 'completed' : ''}>
                  {chore.name} - <strong>{chore.points} points</strong>
                  <div className="buttons">
                    <button className="complete-btn" onClick={() => handleCompleteChore(chore)} disabled={chore.completed}>
                      ✓
                    </button>
                    <button className="delete-btn" onClick={() => deleteChore(chore._id)}>X</button>
                  </div>
                </li>
              ))}
            </ul>
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
            <ul>
              {rewards.map((reward) => (
                <li key={reward._id}>
                  {reward.name} - <strong>{reward.points} points</strong>
                  <div className="buttons">
                    <button className="redeem-btn" onClick={() => handleRedeemReward(reward)} disabled={totalPoints < reward.points}>
                      Redeem
                    </button>
                    <button className="delete-btn" onClick={() => deleteReward(reward._id)}>X</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;