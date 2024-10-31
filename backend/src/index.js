const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

(async () => {
    try {
        let adminUri;
        if (process.env.MONGODB_USER && process.env.MONGODB_PASS) {
            adminUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/admin`;
        } else {
            adminUri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/admin`;
        }

        // Connect to MongoDB as admin
        const client = await MongoClient.connect(adminUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB admin database');
        const db = client.db(process.env.MONGODB_DB);

        // Create collection if it doesn’t already exist
        const collections = await db.listCollections().toArray();
        if (!collections.some(col => col.name === 'appointments')) {
            await db.createCollection('appointments');
            console.log(`Collection 'appointments' created in database ${process.env.MONGODB_DB}`);
        }

        await client.close();

        let mongoUri;
        // Connect with mongoose using the specific database
        if (process.env.MONGODB_USER && process.env.MONGODB_PASS) {
            mongoUri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=admin`;
        } else {
            mongoUri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}?authSource=admin`;
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Mongoose connected to ${process.env.MONGODB_DB} database`);

    } catch (error) {
        console.error('Database initialization error:', error);
        process.exit(1);
    }
})();


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