const mongoose = require('mongoose');
const Candidate = require('./models/candidate'); // Make sure the path is correct

const mongoLocalURL = 'mongodb+srv://konain7:Kaunain99@cluster0.rmyvhx6.mongodb.net/'; // Replace 'your_database_name' with your actual DB name



async function initializeDatabase() {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(mongoLocalURL);
        

        console.log('Connected to MongoDB');

        // Drop the existing index if it exists
        await Candidate.collection.dropIndex('createdAt_1');

        // Ensure indexes are created, including the new TTL index
        await Candidate.ensureIndexes();
        console.log('Indexes ensured');

        const db = mongoose.connection;
        db.on('connected', () => console.log('MongoDB is connected'));
        db.on('error', (err) => console.log('MongoDB error:', err));
        db.on('disconnected', () => console.log('MongoDB is disconnected'));

    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with an error
    }
}


// Call the function to initialize the database and export the db connection
const db = initializeDatabase();

module.exports = db;
