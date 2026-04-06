import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);
    setEmptyFields([]);

    const workout = { title, load, reps };

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || 'Failed to add workout');
        setEmptyFields(json.emptyFields || []);
        return;
      }

      // Success
      setTitle('');
      setLoad('');
      setReps('');
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } catch (err) {
      setError('Network error - please check your connection');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <div className="form-group">
        <label>Exercise Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
          placeholder="e.g. Bench Press"
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label>Load (in kg)</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}
          placeholder="e.g. 80"
          min="0"
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label>Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
          placeholder="e.g. 10"
          min="0"
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Workout'}
      </button>

      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default WorkoutForm;