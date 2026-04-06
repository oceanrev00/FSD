import { useEffect } from 'react';
import { useWorkoutsContext } from './hooks/useWorkoutsContext';
import './App.css';

// components
import WorkoutDetails from './components/WorkoutDetails';
import WorkoutForm from './components/WorkoutForm';

function App() {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="App">
      <header>
        <h1>Workout Tracker</h1>
      </header>
      <div className="container">
        <div className="workouts">
          {workouts && workouts.length > 0 ? (
            workouts.map(workout => (
              <WorkoutDetails workout={workout} key={workout._id} />
            ))
          ) : (
            <p>No workouts yet. Add one!</p>
          )}
        </div>
        <WorkoutForm />
      </div>
    </div>
  );
}

export default App;