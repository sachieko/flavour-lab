/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {

  const $main = $('.main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    if (window.pollOrders) {
      clearInterval(window.pollOrders);
    }
    $app.detach();
    if (!$('#checkoutPage').length) {
      $checkoutPage.appendTo($main);
    }
    $myOrders.detach();
    $restaurantLogin.detach();
    $adminOrderPage.detach();
    switch (item) {
    case item = 'app':

      $app.appendTo($main);
      break;
    case item = 'orders':
      window.pollOrders = setInterval(()=>{
        $('body nav #navOrdersButton').trigger('click');
      }, 5000);
      $myOrders.find('#orderPageCheckoutItems').empty();
      $myOrders.find('#orderDetails').empty();
      $myOrders.appendTo($main);
      break;
    case item = 'restaurantLogin':
      $restaurantLogin.appendTo($main);
      break;
    case item = 'adminOrders':
      $adminOrderPage.find('#customerOrders').empty();
      $('body').trigger('play');
      $adminOrderPage.appendTo($main);
      break;
    }
  };
});
