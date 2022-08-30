const express = require('express');
require('dotenv').config();
const router  = express.Router();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsServiceSID = process.env.SMS_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const orders = require('../db/queries/orders');
const orderDetails = require('../db/queries/order_details');
const items = require('../db/queries/items');

router.post('/', (req, res) => {
  console.log('got here');
  const cart = req.cookies.cart;
  if (!cart) {
    return res.status(400).end();
  }

  const name = req.body.name;
  const phone = req.body.phone;
  const note = req.body.note;
  const tax = req.body.tax;
  const tip = req.body.tip;
  console.log(name, phone, note, tax, tip);
  const orderArguments = {name, phone, note, tax, tip};

  orders.insertOrder(orderArguments)
    .then(order => {
      const parsed = JSON.parse(cart);
      const queries = [];
      for (const itemId in parsed) { //parsed[id] is count
        const orderDetailArgs = {
          order_id: order.id,
          item_id: Number(itemId),
          quantity: parsed[itemId],
          price: 10
        };
        queries.push(orderDetails.insertOrderDetails(orderDetailArgs));
      }
      Promise.all(queries)
        .then((allOrderDetails) => {
          items.getItemsByOrderId(order.id)
            .then(items => {
              console.log('all order items', items);
              const date = new Date();
              const twiml = new MessagingResponse();
              client.messages
                .create({
                  body: `Hello ${name}, ${date}`,
                  messagingServiceSid: smsServiceSID,
                  to: phone
                })
                .then(message => {
                  //console.log(message.sid)
                })
                .done();
              //res.writeHead(200, {'Content-Type': 'text/xml'});
              //res.end(twiml.toString());
              res.send(items);
            });
        });
    });
});

module.exports = router;
