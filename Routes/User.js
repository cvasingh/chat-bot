const express = require('express')
const router = express.Router();

const User = require('../db').User



router.post('/register', async (req, res) => {
    const temp = new User(req.body)
    await temp.save()
        .then(() => res.send("Data Inserted"))
})


router.post('/checkEmail', (req, res) => {
    User.find({
        email: { $eq: req.body.email }
    }, { _id: 0, __v: 0 }, (err, docs) => {
        if (docs.length < 1) {
            let otp = Math.floor((Math.random() * 1000000) + 1);
            res.send({ otp })
        } else {
            res.send('AE')
        }
    })
})


router.post('/forgetPassword', async (req, res) => {
    await User.find({
        email: { $eq: req.body.email }
    }, { _id: 0, __v: 0 }, (err, docs) => {
        if (docs.length === 1) {
            let otp = Math.floor((Math.random() * 1000000) + 1);
            res.send({ otp })
        } else {
            res.send('NM')
        }
    })
})

router.post('/updatePassword', async (req, res) => {
    await User.updateOne(
        { email: { $eq: req.body.email } },
        { $set: { password: req.body.password } }
    )
    res.send('D')
})

router.post('/login', async (req, res) => {
    User.find({
        email: { $eq: req.body.email },
        password: { $eq: req.body.password }
    }, { _id: 0, __v: 0 }, (err, docs) => {
        if (docs.length === 1) {
            res.send(docs)
        } else {
            res.send('NM')
        }
    })
})




module.exports = router;