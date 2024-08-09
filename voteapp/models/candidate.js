const mongoose = require('mongoose');
const User = require('./user')
// Define the candidate schema with additional fields
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        min: 25,
        required: true
    },
   
    email: {
        type: String,
        unique: true,
        required:true
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            voteAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    votesCount:{
        type:Number,
        default:0
    }
    
});


// Pre-save middleware to validate email and name
candidateSchema.pre('save', async function(next) {
    const candidate = this;
    const user = await User.findOne({ email: candidate.email, name: candidate.name });
    if (!user) {
        const err = new Error('Invalid email or name: No corresponding user found');
        next(err);
    } else {
        next();
    }
});

// Create the model from the schema
const Candidate = mongoose.model('Candidate', candidateSchema);

// Export the model
module.exports = Candidate;
