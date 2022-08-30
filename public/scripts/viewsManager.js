/* eslint-disable no-undef */
$(() => {

  const $main = $('#main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();
    $checkoutPage.detach();
    $myOrders.detach();

    switch (item) {
    case item = 'app':
      $app.appendTo($main);
      break;
    case item = 'checkout':
      $checkoutPage.find('#checkoutItems').empty();
      $checkoutPage.appendTo($main);
      break;
    case item = 'orders':
      $myOrders.appendTo($main);
      break;
    }
  };

});
