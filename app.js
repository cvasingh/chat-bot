const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const PORT = process.env.PORT || 3000
const app = express();
app.use(cors());


//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

//default router
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
})
app.use(express.static(__dirname + '/build'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendFile(__dirname + "/build/index.html")
    // next(createError(404));
  });

  
//actual routes for users
const User = require('./Routes/User')
app.use('/auth', User)

//actual routes for Chats
const Chat = require('./Routes/Chat')
app.use('/chat', Chat)




app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})
