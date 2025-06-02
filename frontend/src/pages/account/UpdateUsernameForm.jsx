import { useState } from 'react';
import { useUpdateUsernameMutation } from '../../services/authSlice';

function UpdateUsernameForm() {
  const [newUsername, setNewUsername] = useState('');
  const [updateUsername, { isLoading, error }] = useUpdateUsernameMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsername({ newUsername }).unwrap();
      setNewUsername('');
      // showToast('success')
    } catch (err) {
      // Error handled by RTK Query hook (accessible via `error.data`)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New username"
        required
      />
      <button type="submit" disabled={isLoading}>
        Change
      </button>
      {error && (
        <div style={{ color: 'red' }}>
          {'data' in error ? error.data.message : 'Update failed'}
        </div>
      )}
    </form>
  );
}

export default UpdateUsernameForm