const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

user = prompt('enter a new user')
addMessage('you joined')

socket.emit('new-user', user)

socket.on('user-connected', name => {
  addMessage(`${name} connected`)
})

socket.on('message-received', data => {
  addMessage(`${data.user}: ${data.data}`)
})

socket.on('new-user', name => {
  addMessage(name)
})

socket.on('user-disconnected', user => {
  addMessage(`${user} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  message = `${messageInput.value}`
  addMessage(`You: ${message}`)
  socket.emit('send-chat', message)
  messageInput.value = ''

})

function addMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}