/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const getItems = function() {
  let url = "/api/items";
  return $.get(url);
};
const sendText = function(data) {
  let url = "/api/sms";
  return $.post(url, data);
};
