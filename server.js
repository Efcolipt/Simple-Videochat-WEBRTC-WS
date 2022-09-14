const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const {v4: uuidV4} = require('uuid')


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/room/${uuidV4()}`)
})

app.get('/room/:room', (req, res) => {
    console.log(req.params)
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        io.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', () => {
            io.to(roomId).emit('user-disconnected', userId);
        })

        socket.on('send-message', params => {
            io.to(roomId).emit('user-send-message', {
                userId: params.userId,
                messageJSON: params.messageJSON,
            })
        })
    })
})

server.listen(3000)