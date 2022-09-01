/* eslint-disable no-undef */
$(() => {
  const $adminOrderPage = $(
    `<div id="adminOrders"">
        <h5>Customer Orders:</h5>
        <table id="customerOrders">
        </table>
    </div>`
  );
  window.$adminOrderPage = $adminOrderPage;
});
