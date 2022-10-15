const express = require('express')
const router = express.Router();

const User = require('../db').User



router.post('/update', async (req, res) => {
    await User.updateOne(
        { email: { $eq: req.body.email } },
        { $set: { messages: req.body.messages } }
    )
    res.send('D')
})

router.get('/emailList', async (req, res) => {
    User.find({}, { email: 1 }, (err, docs) => res.send(docs))
})

router.post('/chatList', async (req, res) => {
    User.find({
        email: { $eq: req.body.email }
    }, { messages: 1 }, (err, docs) => {
        if (docs.length > 0) {
            res.send(docs[0]?.messages)
        } else {
            res.send('E')
        }
    })
})

module.exports = router;