const express = require('express');
const router  = express.Router();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.post('/', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const date = new Date();
  const twiml = new MessagingResponse();
  client.messages
    .create({
      body: `Hello ${name}, ${date}`,
      messagingServiceSid: 'MG4eb433bb980dbf399424222f574c569e',
      to: phone
    })
    .then(message => {
      //console.log(message.sid)
    })
    .done();

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

module.exports = router;
