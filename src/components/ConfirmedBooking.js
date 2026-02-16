import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <main className="confirmed-booking">
      <div className="confirmation-card">
        <div className="success-icon">🎉</div>
        <h1>Booking Confirmed!</h1>
        <p>Thank you for your reservation at Little Lemon.</p>
        <p>We look forward to serving you!</p>
        
        <div className="confirmation-actions">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/booking" className="btn-secondary">Make another reservation</Link>
        </div>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
