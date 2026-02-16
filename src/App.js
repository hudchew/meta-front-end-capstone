import { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import { initializeTimes, updateTimes } from './reducers/bookingTimesReducer';

function App() {
  const navigate = useNavigate();
  const [availableTimes, dispatchAvailableTimes] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  function submitForm(formData) {
    let success = true;
    if (typeof window !== 'undefined' && window.submitAPI) {
      success = window.submitAPI(formData);
    }
    
    if (success) {
      navigate('/booking-confirmed');
    }
    return success;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<main><h2>About</h2></main>} />
        <Route path="/menu" element={<main><h2>Menu</h2><p>Online menu coming soon.</p></main>} />
        <Route path="/order" element={<main><h2>Order Online</h2><p>Ordering coming soon.</p></main>} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatchAvailableTimes={dispatchAvailableTimes}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </div>
  );
}

export default App;
