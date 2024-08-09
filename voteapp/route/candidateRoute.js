const express = require('express');
const {verifyTokenMiddleware} = require('../jwt')
const Candidate = require('../models/candidate');
const User = require('../models/user');

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('hello candidate');
});

router.post('/create',verifyTokenMiddleware, async function(req, res) {
    try {
        let data = req.body;
        let uderdi = req.user;

        console.log(uderdi.userId)

        let userId = req.user.userId
        let user = await User.findById(userId)
  


        if(user.role != 'admin'){
            return res.json({msg:"only admin can choose candidates"})
        }
        let candidateExist = await Candidate.findOne({
            $or: [{ email: data.email }, { party: data.party }]
        });

        if (candidateExist) {
            return res.status(400).json({ msg: `Choose another party -> ${data.party} or email -> ${data.email} has already been chosen` });
        }

        // Create a new candidate
        let newCandidate = new Candidate(data);
        await newCandidate.save();

        res.status(201).json({ msg: "Candidate has been created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

router.post('/vote/:candidateId',verifyTokenMiddleware, async (req, res) => {
    try {
        let candidateId = req.params.candidateId;
        let userId = req.user.userId

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if(user.role == 'admin'){
            return res.json({msg:'admin cant vote'})
        }

        let candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ msg: "Candidate not found" });
        }

        if (user.isVoted) {
            return res.status(400).json({ msg: "You have already voted!" });
        }

        candidate.votes.push({ user: user._id });
        candidate.votesCount++;
        await candidate.save();

        user.isVoted = true;
        await user.save();

        res.status(200).json({ msg: "Successfully voted!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Voting error", error });
    }
});

router.delete('/delete/:candidateId',verifyTokenMiddleware,async (req,res)=>{

   

    try {
        let userId = req.user.userId;

        let user = await User.findById(userId)

        if(user.role != 'admin') {
            return res.json({msg:"only admin can delete candidates"})
        }

        let candidate = await Candidate.findByIdAndDelete(req.params.candidateId)

        res.json({msg:"candidate deleted succesfully !"})




    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Delete candidate error", error });
    }
})
module.exports = router;
