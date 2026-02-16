import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

const mockAvailableTimes = ['17:00', '18:00'];
const mockDispatch = jest.fn();
const mockSubmit = jest.fn();

test('Renders the BookingForm heading', () => {
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatchAvailableTimes={mockDispatch}
      submitForm={mockSubmit}
    />
  );
  const headingElement = screen.getByText('Choose date');
  expect(headingElement).toBeInTheDocument();
});

test('Validates HTML5 attributes', () => {
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatchAvailableTimes={mockDispatch}
      submitForm={mockSubmit}
    />
  );
  const dateInput = screen.getByLabelText(/Choose date/);

  expect(dateInput).toHaveAttribute('required');
  expect(dateInput).toHaveAttribute('type', 'date');
});

test('Submit button is disabled initially', () => {
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatchAvailableTimes={mockDispatch}
      submitForm={mockSubmit}
    />
  );
  const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
  expect(submitButton).toBeDisabled();
});

test('Submit button enabled when form is valid', () => {
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatchAvailableTimes={mockDispatch}
      submitForm={mockSubmit}
    />
  );
  
  const dateInput = screen.getByLabelText(/Choose date/);
  const timeSelect = screen.getByLabelText(/Choose time/);
  const guestsInput = screen.getByLabelText(/Number of guests/);
  const occasionSelect = screen.getByLabelText(/Occasion/);
  const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });


  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  const dateString = futureDate.toISOString().split('T')[0];

  fireEvent.change(dateInput, { target: { value: dateString } });
  fireEvent.change(timeSelect, { target: { value: '17:00' } });
  fireEvent.change(guestsInput, { target: { value: '2' } });
  fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });


  expect(submitButton).not.toBeDisabled();
});

test('Shows error when guests are out of range', () => {
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatchAvailableTimes={mockDispatch}
      submitForm={mockSubmit}
    />
  );
  
  const guestsInput = screen.getByLabelText(/Number of guests/);
  fireEvent.change(guestsInput, { target: { value: '0' } });

  const errorMsg = screen.getByText(/Number of guests must be between 1 and 10/i);
  expect(errorMsg).toBeInTheDocument();
});
