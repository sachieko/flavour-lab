/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(`
    <section id="myOrders"">
      <div id="orderDetails"></div>
      <h5>Order Receipt:</h5>
        <table id="orderPageCheckoutItems">
        </table>
    </section>
  `);
  window.$myOrders = $myOrders;
});
