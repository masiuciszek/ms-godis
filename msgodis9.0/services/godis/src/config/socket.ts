import * as socketio from 'socket.io';

//@ts-ignore
export function socketServer(server) {
  const io = socketio.listen(server);

  //@ts-ignore
  io.on('connection', socket => {
    console.log('client connected');
  })
  
  //@ts-ignore
  io.on('disconnect', socket => {
    console.log('client disconnected');
  })

  return io
};

