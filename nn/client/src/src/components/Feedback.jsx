import React from 'react';

function Feedback() {
  return (
    <form>
      <h1>Your Feedback</h1>
      <label>Name (Optional):</label>
      <input type="text" placeholder="Your Name" />
      
      <label>Email:</label>
      <input type="email" placeholder="Your Email" required />
      
      <label>Feedback:</label>
      <textarea rows="6" placeholder="Your feedback..." required></textarea>
      
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default Feedback;
