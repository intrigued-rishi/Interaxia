const kue = require('kue');

const queue = kue.createQueue();
const Message = require('../models/messages');
const friendMailer = require('../mailers/friend_mailer');

queue.process('emails', function(job, done){
    
    friendMailer.mail(job.data,done);    

});

queue.process('messages', function(job,data){
    Message.create(job.data);
});

module.exports = queue;