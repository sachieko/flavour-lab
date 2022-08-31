/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
require('dotenv').config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsServiceSID = process.env.SMS_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);
const express = require('express');
const router = express.Router();
const items = require('../db/queries/items');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const orders = require('../db/queries/orders');
const orderDetails = require('../db/queries/order_details');

router.post('/', (req, res) => {
  const cart = JSON.parse(req.cookies.cart);
  const order = req.body;
  orders.insertOrder(order)
    .then(order => {
      const queries = [];
      for (const itemId in cart) {
        items.getItemById(itemId)
          .then(item => {
            const detailObj = {};
            detailObj.order_id = Number(order.id);
            detailObj.item_id = Number(item.id);
            detailObj.quantity = Number(cart[itemId]);
            detailObj.price = item.price;
            detailObj.note = null;
            queries.push(orderDetails.insertOrderDetails(detailObj));
          })
          .catch(err => console.log(err.message));
      }
      Promise.all(queries)
        .then((allOrderDetails) => {
          items.getItemsByOrderId(order.id)
            .then(items => {
              const date = new Date();
              const twiml = new MessagingResponse();
              client.messages
                .create({
                  body: `Hello ${order.name}, your order was submitted at: ${date}`,
                  messagingServiceSid: smsServiceSID,
                  to: order.phone
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
    })
    .catch(err => console.log(err.message));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  orders.getDetailsForOrderById(id)
    .then(details => {
      console.log(details);
    })
    .catch(err => console.log(err.message));
});

module.exports = router;
