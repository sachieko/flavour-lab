/* eslint-disable no-undef */
$(() => {

  const $main = $('.main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();
    $checkoutPage.detach();
    $myOrders.detach();
    $restaurantLogin.detach();
    $restaurantLogin.detach();
    $adminOrderPage.detach();
    switch (item) {
    case item = 'app':
      $app.appendTo($main);
      break;
    case item = 'checkout':
      $checkoutPage.find('#checkoutItems').empty();
      $checkoutPage.appendTo($main);
      break;
    case item = 'orders':
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
