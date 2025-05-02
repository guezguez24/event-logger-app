import { useState, useEffect } from 'react';

function App() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch events on initial load
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(setEvents)
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // Submit event to the backend
  const submitEvent = async () => {
    // Ensure the message is not empty
    if (!message) return;

    try {
      await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      // Clear input field after submitting
      setMessage("");

      // Re-fetch events after logging the new one
      const data = await fetch("http://localhost:5000/api/events")
        .then(res => res.json());

      setEvents(data);
    } catch (error) {
      console.error("Error logging event:", error);
    }
  };

  return (
    <div className="App">
      <h1>Event Logger</h1>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Enter event message"
      />
      <button onClick={submitEvent}>Log Event</button>
      <ul>
        {events.map(e => (
          <li key={e.id}>{e.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;