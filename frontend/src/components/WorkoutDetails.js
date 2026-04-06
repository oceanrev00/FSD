import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async () => {
    // Optional confirmation (recommended for UX)
    if (!window.confirm(`Delete "${workout.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Failed to delete workout');
      }

      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (err) {
      console.error('Delete failed:', err);
      setDeleteError(err.message || 'Could not delete workout');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`workout-details ${isDeleting ? 'deleting' : ''}`}>
      <h4>{workout.title}</h4>

      <div className="workout-info">
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p className="timestamp">
          {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
        </p>
      </div>

      <button
        className="delete-btn material-symbols-outlined"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label={`Delete workout: ${workout.title}`}
        title="Delete workout"
      >
        {isDeleting ? 'hourglass_empty' : 'delete'}
      </button>

      {deleteError && (
        <div className="delete-error">{deleteError}</div>
      )}
    </div>
  );
};

export default WorkoutDetails;