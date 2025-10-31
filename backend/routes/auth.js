import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const {username, password} = req.body;
      
      const existingUser = await User.findOne({username});
      if (existingUser) {
        return res.status(400).json({message: 'Username already taken'})
      }

      const user = new User({username, password});
      await user.save();

      const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

      res.status(201).json({token, user: {id: user._id, username}});
    }  catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
});

export default router;