const Message = require('../models/messages');

module.exports.chatter=function(req,res){
    const toUser = req.params.to;
    res.render('chatBox',{
        toUser:toUser
    });
}

module.exports.save= async function(req,res){
    try {
        await Message.create({
            from:req.body.par.from,
            to:req.body.par.to,
            content:req.body.val
        });
        res.status(200).json({message:"Message created successfully!"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Unable to create message"});
    }
}