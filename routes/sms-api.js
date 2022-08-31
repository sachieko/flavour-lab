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
  const args = req.body.Body.split(' ');
  const cmd = args[0];
  const id = args[1];
  const estimate = args[2];
  const twiml = new MessagingResponse();
  if (cmd !== 'Start' && cmd !== 'Estimate' && cmd !== 'Complete'){
    twiml.message(
      `Oops. The optional commands are Start 'orderId', Estimate 'OrderId' 'minutes', or Complete 'orderId'`
    );
    res.writeHead(200, {'Content-Type': 'text/xml'});
    return res.end(twiml.toString());
  }
  orders.updateField(cmd, id, estimate)
  .then((updatedOrder) => {
    twiml.message(`Updated order ${updatedOrder.id}`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    return res.end(twiml.toString());
  })
  .catch((err) => {
    console.log(err);
    twiml.message(`oops wrong something went wrong. We got ${cmd}, ${id}, ${estimate}`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    return res.end(twiml.toString());
  })
});

module.exports = router;
