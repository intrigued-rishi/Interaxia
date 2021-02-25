const kue = require('kue');

const queue = kue.createQueue();

const friendMailer = require('../mailers/friend_mailer');

queue.process('emails', async function(job, done){
    
    friendMailer.mail(job.data);    

    done();
});

module.exports = queue;