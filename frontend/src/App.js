import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', date: '' });
  useEffect(() => {
    if (window.location.pathname === '/health') {
      // Respond with a 200 OK for health check
      const response = {
        status: 200,
        message: "OK",
      };
      // Mimic a 200 response for Kubernetes health check
      console.log(response); // Logs the mock response for health check
    }
  }, []);
  const react_app_url = process.env.REACT_APP_BASE_APP_URI || "http://backend:3000";
  useEffect(() => {
    fetch(`${react_app_url}/appointments`)
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${react_app_url}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(res => res.json())
      .then(newAppointment => setAppointments([...appointments, newAppointment]));
  };

  return (
    <div className="App">
      <h1>Doctor's Office Appointments</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Patient Name" 
          value={form.patientName} 
          onChange={(e) => setForm({ ...form, patientName: e.target.value })} 
        />
        <input 
          placeholder="Doctor Name" 
          value={form.doctorName} 
          onChange={(e) => setForm({ ...form, doctorName: e.target.value })} 
        />
        <input 
          type="date" 
          value={form.date} 
          onChange={(e) => setForm({ ...form, date: e.target.value })} 
        />
        <button type="submit">Book Appointment</button>
      </form>

      <ul>
        {appointments.map((appt) => (
          <li key={appt._id}>
            {appt.patientName} with Dr. {appt.doctorName} on {new Date(appt.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
