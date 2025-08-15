// import { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [chores, setChores] = useState([]);
//   const [rewards, setRewards] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);

//   const [newChoreName, setNewChoreName] = useState('');
//   const [newChorePoints, setNewChorePoints] = useState('');
//   const [newRewardName, setNewRewardName] = useState('');
//   const [newRewardPoints, setNewRewardPoints] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const choreResponse = await fetch('http://localhost:5000/api/chores');
//         const choreData = await choreResponse.json();
//         setChores(choreData);

//         const initialPoints = choreData
//           .filter(chore => chore.completed)
//           .reduce((sum, chore) => sum + chore.points, 0);
        
//         const rewardResponse = await fetch('http://localhost:5000/api/rewards');
//         const rewardData = await rewardResponse.json();
//         setRewards(rewardData);
        
//         setTotalPoints(initialPoints); 

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChoreSubmit = async (event) => {
//     event.preventDefault();
//     const newChore = { name: newChoreName, points: Number(newChorePoints) };
//     try {
//       const response = await fetch('http://localhost:5000/api/chores', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newChore),
//       });
//       const createdChore = await response.json();
//       setChores([...chores, createdChore]);
//       setNewChoreName('');
//       setNewChorePoints('');
//     } catch (error) {
//       console.error('Error creating chore:', error);
//     }
//   };

//   const deleteChore = async (choreId) => {
//     try {
//       await fetch(`http://localhost:5000/api/chores/${choreId}`, {
//         method: 'DELETE',
//       });
//       setChores(chores.filter((chore) => chore._id !== choreId));
//     } catch (error) {
//       console.error('Error deleting chore:', error);
//     }
//   };

//   const handleRewardSubmit = async (event) => {
//     event.preventDefault();
//     const newReward = { name: newRewardName, points: Number(newRewardPoints) };
//     try {
//       const response = await fetch('http://localhost:5000/api/rewards', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newReward),
//       });
//       const createdReward = await response.json();
//       setRewards([...rewards, createdReward]);
//       setNewRewardName('');
//       setNewRewardPoints('');
//     } catch (error) {
//       console.error('Error creating reward:', error);
//     }
//   };

//   const deleteReward = async (rewardId) => {
//     try {
//       await fetch(`http://localhost:5000/api/rewards/${rewardId}`, {
//         method: 'DELETE',
//       });
//       setRewards(rewards.filter((reward) => reward._id !== rewardId));
//     } catch (error) {
//       console.error('Error deleting reward:', error);
//     }
//   };

//   const handleCompleteChore = async (choreToComplete) => {
//     if (choreToComplete.completed) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/chores/${choreToComplete._id}/complete`, {
//         method: 'PATCH',
//       });
//       const updatedChore = await response.json();

//       setTotalPoints(totalPoints + updatedChore.points);
//       setChores(chores.map(chore => 
//         chore._id === updatedChore._id ? updatedChore : chore
//       ));
//     } catch (error) {
//       console.error("Error completing chore:", error);
//     }
//   };
  
//   const handleRedeemReward = (rewardToRedeem) => {
//     if (totalPoints >= rewardToRedeem.points) {
//       setTotalPoints(totalPoints - rewardToRedeem.points);
//       alert(`You have redeemed "${rewardToRedeem.name}"!`);
//     } else {
//       alert("You don't have enough points for this reward!");
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Chore & Reward App</h1>
//         <div className="points-display">
//           <h2>Total Points: {totalPoints}</h2>
//         </div>
//       </header>
//       <main className="container">
//         {/* Chores Section */}
//         <section className="column">
//           <h2>Chores</h2>
//           <div className="form-container">
//             <form onSubmit={handleChoreSubmit}>
//               <input type="text" placeholder="Chore name" value={newChoreName} onChange={(e) => setNewChoreName(e.target.value)} required />
//               <input type="number" placeholder="Points" value={newChorePoints} onChange={(e) => setNewChorePoints(e.target.value)} required />
//               <button type="submit">Add Chore</button>
//             </form>
//           </div>
//           <div className="list-container">
//             <ul>
//               {chores.map((chore) => (
//                 <li key={chore._id} className={chore.completed ? 'completed' : ''}>
//                   {chore.name} - <strong>{chore.points} points</strong>
//                   <div className="buttons">
//                     <button className="complete-btn" onClick={() => handleCompleteChore(chore)} disabled={chore.completed}>
//                       ✓
//                     </button>
//                     <button className="delete-btn" onClick={() => deleteChore(chore._id)}>X</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>

//         {/* Rewards Section */}
//         <section className="column">
//           <h2>Rewards</h2>
//           <div className="form-container">
//             <form onSubmit={handleRewardSubmit}>
//               <input type="text" placeholder="Reward name" value={newRewardName} onChange={(e) => setNewRewardName(e.target.value)} required />
//               <input type="number" placeholder="Points cost" value={newRewardPoints} onChange={(e) => setNewRewardPoints(e.target.value)} required />
//               <button type="submit">Add Reward</button>
//             </form>
//           </div>
//           <div className="list-container">
//             <ul>
//               {rewards.map((reward) => (
//                 <li key={reward._id}>
//                   {reward.name} - <strong>{reward.points} points</strong>
//                   <div className="buttons">
//                     <button className="redeem-btn" onClick={() => handleRedeemReward(reward)} disabled={totalPoints < reward.points}>
//                       Redeem
//                     </button>
//                     <button className="delete-btn" onClick={() => deleteReward(reward._id)}>X</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
// We don't need to import any .css files anymore

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
    <div className="bg-slate-100 min-h-screen font-sans">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Chore & Reward App</h1>
          <div className="bg-indigo-500 text-white rounded-lg px-4 py-2">
            <h2 className="text-xl font-bold">Total Points: {totalPoints}</h2>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chores Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Chores</h2>
          <form onSubmit={handleChoreSubmit} className="flex flex-col gap-4 mb-6">
            <input type="text" placeholder="Chore name" value={newChoreName} onChange={(e) => setNewChoreName(e.target.value)} required className="p-2 border rounded focus:outline-indigo-500" />
            <input type="number" placeholder="Points" value={newChorePoints} onChange={(e) => setNewChorePoints(e.target.value)} required className="p-2 border rounded focus:outline-indigo-500" />
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 font-semibold">Add Chore</button>
          </form>
          <ul className="space-y-3">
            {chores.map((chore) => (
              <li key={chore._id} className={`flex justify-between items-center p-3 rounded ${chore.completed ? 'bg-slate-200 text-slate-500' : 'bg-slate-50'}`}>
                <span className={chore.completed ? 'line-through' : ''}>
                  {chore.name} - <strong className="font-semibold">{chore.points} points</strong>
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleCompleteChore(chore)} disabled={chore.completed} className="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600 disabled:bg-green-300">✓</button>
                  <button onClick={() => deleteChore(chore._id)} className="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600">X</button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Rewards Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Rewards</h2>
          <form onSubmit={handleRewardSubmit} className="flex flex-col gap-4 mb-6">
            <input type="text" placeholder="Reward name" value={newRewardName} onChange={(e) => setNewRewardName(e.target.value)} required className="p-2 border rounded focus:outline-indigo-500" />
            <input type="number" placeholder="Points cost" value={newRewardPoints} onChange={(e) => setNewRewardPoints(e.target.value)} required className="p-2 border rounded focus:outline-indigo-500" />
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 font-semibold">Add Reward</button>
          </form>
          <ul className="space-y-3">
            {rewards.map((reward) => (
              <li key={reward._id} className="flex justify-between items-center p-3 rounded bg-slate-50">
                <span>
                  {reward.name} - <strong className="font-semibold">{reward.points} points</strong>
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleRedeemReward(reward)} disabled={totalPoints < reward.points} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-blue-300">Redeem</button>
                  <button onClick={() => deleteReward(reward._id)} className="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600">X</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;