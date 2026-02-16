import { useState, useEffect, useCallback } from 'react';

function BookingForm({ availableTimes = [], dispatchAvailableTimes, submitForm }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '1',
    occasion: 'Birthday',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  const validateForm = useCallback(() => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);


    if (!formData.date) {
      errors.date = 'Date is required';
    } else if (selectedDate < today) {
      errors.date = 'Date cannot be in the past';
    }


    if (!formData.time) {
      errors.time = 'Time is required';
    } else if (!availableTimes.includes(formData.time)) {
      errors.time = 'Please select an available time';
    }


    const guestsNum = Number(formData.guests);
    if (guestsNum < 1 || guestsNum > 10) {
      errors.guests = 'Number of guests must be between 1 and 10';
    }


    if (!formData.occasion) {
      errors.occasion = 'Please select an occasion';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, availableTimes]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [validateForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date' && dispatchAvailableTimes) {
      dispatchAvailableTimes(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && submitForm) {
      submitForm(formData);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Table reservation form">
      <div className="form-group">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
          aria-invalid={!!formErrors.date}
          aria-describedby="date-error"
        />
        {formErrors.date && (
          <span id="date-error" className="form-error" role="alert">
            {formErrors.date}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          aria-invalid={!!formErrors.time}
          aria-describedby="time-error"
        >
          <option value="">Select a time</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {formErrors.time && (
          <span id="time-error" className="form-error" role="alert">
            {formErrors.time}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-label="Number of guests"
          aria-invalid={!!formErrors.guests}
          aria-describedby="guests-error"
        />
        {formErrors.guests && (
          <span id="guests-error" className="form-error" role="alert">
            {formErrors.guests}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
          aria-invalid={!!formErrors.occasion}
          aria-describedby="occasion-error"
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Engagement">Engagement</option>
          <option value="Other">Other</option>
        </select>
        {formErrors.occasion && (
          <span id="occasion-error" className="form-error" role="alert">
            {formErrors.occasion}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={!isFormValid}
        aria-label="Make Your Reservation"
      >
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
