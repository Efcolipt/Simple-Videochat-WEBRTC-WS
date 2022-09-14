const socket = io('/')
const videosContainer = document.getElementById('videos-container')
const micro = {
    el: document.getElementById('video-micro'),
    off: true
}
const chat = {
    chatAreaEl: document.getElementById('chat-message-area'),
    chatInpMessageEl: document.getElementById('chat-message-input'),
    chatBtnSendEl: document.getElementById('chat-message-btn'),
}
const peer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
const peers = {}

const localVideo = document.createElement('video')
localVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(localVideo, stream)

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) {
        peers[userId].close()
        chat.chatAreaEl.innerHTML = ""
        delete peers[userId]
    }
})

socket.on('user-send-message', ({ userId, messageJSON }) => {
    const message = JSON.parse(messageJSON)
    const el = document.createElement('div')
    el.classList.add('message-correspondence__item')
    el.innerHTML = `
        <div class="message-correspondence__img">
            <img src="/img/no-img.png" alt="Нет аватарки">
        </div>
        <div class="message-correspondence__name">
            ${userId}
        </div>
        <div class="message-correspondence__date">
            ${(new Date()).toLocaleString()}
        </div>
        <div class="message-correspondence__data">
            ${message}
        </div>
    `
    chat.chatAreaEl.append(el)
})

peer.on('open', userId => {
    socket.emit('join-room', ROOM_ID, userId)

    const sendMessage = () => {
        const val = chat.chatInpMessageEl.value
        if(val.length >= 1 && Object.keys(peers).length >= 1) {
         socket.emit('send-message', {
             userId,
             messageJSON: JSON.stringify(val)
            })
            chat.chatInpMessageEl.value = ''
        }
    }

    chat.chatInpMessageEl.addEventListener('keypress',  e => {
        if (e.key === 'Enter') sendMessage()
    });
    chat.chatBtnSendEl.addEventListener('click', sendMessage)
})


function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')

    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream (video, stream) {
    video.srcObject = stream
    video.muted = micro.off

    video.addEventListener('loadedmetadata', () => {
        video.play()
    })

    micro.el.addEventListener('click', () => {
        micro.off = !micro.off
        video.muted = micro.off
        micro.el.textContent = micro.off ? 'Вкл микрофон' : 'Выкл микрофон'
    })

    videosContainer.append(video)
}
