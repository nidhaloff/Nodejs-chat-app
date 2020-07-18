const io = require('socket.io')(3000) // create server

const users = {}


io.on('connection', socket => {

  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  //socket.emit('chat-message', 'hello world')
  socket.on('send-chat', data => {

    socket.broadcast.emit('message-received', {data: data, user: users[socket.id]})
  })

  socket.on('disconnect', ()=> {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})