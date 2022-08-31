/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getItems = function() {
  let url = "/api/items";
  return $.get(url);
};

const sendText = function(data) {
  let url = "/api/sms/customer";
  return $.post(url, data);
};

const getCart = function() {
  let url = "/api/cart";
  return $.get(url);
};

const addToCart = function(data) {
  let url = "/api/cart";
  return $.post(url, data);
};

const removeFromCart = function(data) {
  let url = "/api/cart/delete";
  return $.post(url, data);
};

const getOrder = function() {
  let url = "/api/orders";
  return $.get(url);
};
