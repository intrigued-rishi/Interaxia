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
        const self = this;
        this.socket.on('connect',function(){
            console.log("Connected to chat server!");
        });
        this.socket.emit('join_room',{me:this.userMail,other:this.otherUser});
        this.socket.on('new_person',function(data){
            alert(data.message);
        });
        this.socket.on('get_mssg',function(data){
            let item;
            if(data.email==self.userMail){
                item = $(`<p>${data.val}</p>`);
                item.addClass('self-mssg');
            }else{
                let name = $('#chat-name').text();
                item = $(`<p><small>${name}</small>${data.val}</p>`);
                item.addClass('other-mssg');
            }
            $('#body-chat').append(item);
        });
        var participants = {from:this.userMail,to:this.otherUser};
        $('#mssg-send').on('click',function(){
            let val = $('#mssg-form').val();
            self.socket.emit('new_mssg',{val:val,email:self.userMail});
            $('#mssg-form').val("");
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