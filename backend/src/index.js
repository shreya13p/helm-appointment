const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoDbUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}` || 'mongodb://mogno:27017/appointments';

mongoose.connect(mongoDbUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).catch(err => console.log('MongoDB connection error:', err));

const AppointmentSchema = new mongoose.Schema({
    patientName: String,
    doctorName: String,
    date: Date,
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

app.get('/appointments', async (req, res) => {
    const appointments = await Appointment.find();
    res.json(appointments);
});

app.post('/appointments', async (req, res) => {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json(appointment);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});