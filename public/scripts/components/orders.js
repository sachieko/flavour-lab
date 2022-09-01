/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(`
    <section id="myOrders"">
      <div id="orderDetails"></div>
      <div id="pick-up-items">
        <div id="pick-up-details"></div>
        <div id="orderPageCheckoutItems"></div>
      </div>
    </section>
  `);
  window.$myOrders = $myOrders;
});
