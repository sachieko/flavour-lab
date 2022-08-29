/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getItems = function() {
  let url = "/api/items";
  return $.get({url});
};

const getCart = function() {
  console.log('getting cart...');
  let url = "/cart";
  return $.get({url});
 }
