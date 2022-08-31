/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getItems = function() {
  let url = "/api/items";
  return $.get(url);
};

const sendText = function() {
  let url = "/api/sms/customer";
  return $.get(url);
};

const getCart = function() {
  let url = "/api/cart";
  return $.get(url);
};

const addToCart = function(data) {
  let url = "/api/cart";
  return $.post(url, data);
};
// <<<<<<< HEAD
// =======

const addOrder = function(order) {
  let url = "/api/orders";
  return $.post(url, order);
};

const addOrderDetails = function(details) {
  let url = `/api/orders/${details.order_id}`;
  return $.post(url, details);
};
//>>>>>>> main

const removeFromCart = function(data) {
  let url = "/api/cart/delete";
  return $.post(url, data);
};
//<<<<<<< HEAD

const getOrder = function() {
  let url = "/api/orders";
  return $.get(url);
};
//=======
// >>>>>>> main
