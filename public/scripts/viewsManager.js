/* eslint-disable no-undef */
$(() => {

  const $main = $('.main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();
    $checkoutForm.detach();
    $myOrders.detach();

    switch (item) {
    case item = 'app':
      $app.appendTo($main);
      break;
    case item = 'checkout':
      $checkoutForm.appendTo($main);
      break;
    case item = 'orders':
      $myOrders.appendTo($main);
      break;
    }
  };

});
