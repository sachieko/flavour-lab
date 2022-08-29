/* eslint-disable no-undef */
$(() => {

  const $main = $('#main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();
    $cart.detach();

    switch (item) {
    case item = 'app':
      $app.appendTo($main);
      break;

    case item = 'cart':
      $cart.appendTo($main);
      break;
    }
  };

});
