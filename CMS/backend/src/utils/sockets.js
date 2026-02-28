import { Server } from 'socket.io'
let io
const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    })
    io.on("connection", (socket) => {
        console.log("socket is connected successfully")
        socket.on('join-post', (postid) => {
            socket.join(postid)
            console.log('post joined successfully');
        })
        socket.on('disconnect', () => {
            console.log('user disconnected successfully');
        })
    })

}
const getio = () => {
    if (!io) {
        throw new Error("socket is not connected");
    }
    return io;
}
export {
    getio,
    initSocket
}