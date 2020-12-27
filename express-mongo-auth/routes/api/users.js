const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const validateRegistrationInput = require('../../validation/registration')
const validateLogin = require('../../validation/login')

const User = require('../../models/Users')

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegistrationInput(req.body)

    if (!isValid) res.status(400).send(errors)

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.status(400).send({ message: 'Email already exists!' })
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => res.send(user))
                    .catch(err => console.log(err))
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body)

    if (!isValid) res.status(400).send(errors)

    User.findOne({ email: req.body.email }).then(user => {
        if (!user) return res.status(404).send({message:"Email not found!"})

        bcrypt.compare(req.body.password, user.password).then(isMatch=>{
            if(isMatch) {
                const payload = {
                    id : user.id,
                    name : user.name
                }

                jwt.sign(
                    payload,
                    process.env.SECRET_OR_KEYS || 'secret',
                    {
                        expiresIn : 31556926 // 1 year in seconds
                    },
                    (err,token)=>{
                        res.json({
                            success : true,
                            token : token
                        })
                    }
                )
            }

            else res.status(400).send({message:"Password Incorrect"})
        })
    })
})

module.exports = router;