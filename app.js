const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

var path = require('path');
const PORT = process.env.PORT || 3333
const app = express();
app.use(cors());


//Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));

//default router
app.get('/*', (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
})

//actual routes for Auths
const Auth = require('./Routes/Auth')
app.use('/auth', Auth)

//actual routes for Chats
const Chat = require('./Routes/Chat')
app.use('/chat', Chat)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.sendFile(__dirname + "/build/index.html")
    // next(createError(404));
  });

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})
