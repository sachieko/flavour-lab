/* eslint-disable no-undef */
$(() => {
  const $adminOrderPage = $(
    `<div id="adminOrders"">
        <h1>Customer Orders</h1>
        <div id="customerOrders">
        </div>
    </div>`
  );
  window.$adminOrderPage = $adminOrderPage;

  $('body').on('submit', '#adminOrders .startOrder', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminStartOrder(data).then(() => viewsManager.show('adminOrders'));
  });

  $('body').on('submit', '#adminOrders .estimateOrder', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminEstimateOrder(data).then(() => viewsManager.show('adminOrders'));
  });

  $('body').on('submit', '#adminOrders .completeOrder', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminCompleteOrder(data).then(() => viewsManager.show('adminOrders'));
  });

  $('body').on('click', '.toggleItems', function() {
    $(this).parent().find(".customerItems").toggle();
  });
});
