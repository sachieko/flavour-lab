/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(
    `<div id="myOrders"">
        <h5>Order Detail:</h5>
        <div id="orderDetails">
        </div>
        <h5>Receipt:</h5>
        <table id="orderPageCheckoutItems">
        </table>
    </div>`
  );
  window.$myOrders = $myOrders;
});
