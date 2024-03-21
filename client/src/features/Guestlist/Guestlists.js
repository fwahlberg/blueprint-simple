import React from 'react';
import { useFetchGuestlistsQuery } from '../../services/api';

// Add some basic card styling
const cardStyle = {
  background: '#fff',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const buttonStyle = {
  marginLeft: '10px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
};

const Guestlists = () => {
  const { data: guestlists, error, isLoading } = useFetchGuestlistsQuery();

  const copyToClipboard = async (inviteCode) => {
    const url = `${window.location.origin}/join/${inviteCode}`;
    try {
      await navigator.clipboard.writeText(url);
      alert(`Copied: ${url}`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching guestlists: {error.message}</div>;

  return (
    <div>
      <h2>My Guestlists</h2>
      <ul style={listStyle}>
        {guestlists?.map((guestlist) => (
          <li key={guestlist._id} style={cardStyle}>
            <strong>{guestlist.title}</strong> - Invite Code:
            <input
              type="text"
              value={`${window.location.origin}/join/${guestlist.inviteCode}`}
              disabled
              readOnly
              style={{marginLeft: '10px', width: 'auto', minWidth: '250px'}}
            />
            <button style={buttonStyle} onClick={() => copyToClipboard(guestlist.inviteCode)}>Copy</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guestlists;
