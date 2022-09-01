/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(`
    <section id="myOrders"">
      <div id="orderDetails"></div>
      <h5>Your Order</h5>
      <div id="orderPageCheckoutItems"></div>
    </section>
  `);
  window.$myOrders = $myOrders;
});
