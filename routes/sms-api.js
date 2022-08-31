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

function scrubData(data, val){
  if (!data){
    data = val;
  }
  return data;
}

router.post('/customer', (req, res) => {
  const cart = req.cookies.cart;
  const name = req.body.name;
  const phone = req.body.phone;
  const note = scrubData(req.body.note, '');
  const tax = scrubData(req.body.tax, 0);
  const tip = scrubData(req.body.tip, 0);
  const discount = scrubData(req.body.discount, 0);
  if (!cart){
    console.log('gotta have a cart baby');
    return res.status(400).end();
  }
  if (!name || !phone){
    console.log('missing contact info');
    return res.status(400).end();
  }
  const orderArguments = {name, phone, note, tax, tip, discount}
  orders.insertOrder(orderArguments)
  .then(order => {
    console.log('new order', order);
    const parsed = JSON.parse(cart);
    const queries = [];
    for (const itemId in parsed){ //parsed[id] is count
      const orderDetailArgs = {
        order_id: order.id,
        item_id: Number(itemId),
        quantity: parsed[itemId],
        price: 10
      }
      queries.push(orderDetails.insertOrderDetails(orderDetailArgs));
    }
    Promise.all(queries)
    .then((allOrderDetails) => {
      console.log('linked with all items');
      items.getItemsByOrderId(order.id)
      .then(items => {
        console.log('all order items', items);
        const twiml = new MessagingResponse();
        client.messages
          .create({
            body:
            `Hello ${name}. The restaurant has received your order`,
            messagingServiceSid: smsServiceSID,
            to: phone
          })
          .then(message => {
            //console.log(message.sid)
          })
          .done();

        client.messages
          .create({
            body: `
            New order id: ${order.id} from ${order.name} with phone ${order.phone}`,
            messagingServiceSid: smsServiceSID,
            to: process.env.RESTAURANT_PHONE
          })
          .then(message => {
            //console.log(message.sid)
          })
          .done();

        //res.writeHead(200, {'Content-Type': 'text/xml'});
        //res.end(twiml.toString());
        res.clearCookie('cart');
        res.cookie('orderId', order.id);
        res.send({order, items});
      });
    })
  });
});

router.post('/restaurant', (req, res) => {
  console.log(req.body.Body);
  const twiml = new MessagingResponse();
  twiml.message('Guy Fieri says scrumptious.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

});

module.exports = router;
