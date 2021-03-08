module.exports.chatSockets=function(server){
    const io = require('socket.io')(server);
    io.sockets.on('connection', function(socket){
        socket.on('disconnect',()=>{
            console.log("Chat Socket disconnected!");
        });
        socket.on('join_room',function(data){
            let s1=data.me;
            let s2=data.other;
            let res;
            if(s1.localeCompare(s2)===1)
                res=s2+s1;
            else
                res=s1+s2;    
            socket.join(res);
            socket.broadcast.to(res).emit('new_person',{message:"Other Person joined the chat!"});
            socket.on('new_mssg',function(data){
                io.in(res).emit('get_mssg',data);
            });
        });
    });
}