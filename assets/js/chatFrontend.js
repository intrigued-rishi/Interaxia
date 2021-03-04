class Chat{
    constructor(boxId,userMail,other){
        this.userMail=userMail;
        this.box=$(`#${boxId}`);
        this.otherUser = other;
        this.socket=io();
        if(userMail)
            this.connectionHandler();
    }
    connectionHandler(){
        this.socket.on('connect',function(){
            console.log("Connected to chat server!");
        });
        this.socket.emit('join_room',{me:this.userMail,other:this.otherUser});
        this.socket.on('new_person',function(data){
            console.log(data.message);
        });
        var participants = {from:this.userMail,to:this.otherUser};
        $('#mssg-send').on('click',function(){
            let val = $('#mssg-form').val();
            $.ajax({
                type: "POST",
                url: "/message/save",
                data:{val:val,par:participants},
                success: function (response) {
                    console.log(response);
                }
            });
        });
    }
}