/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {

  const $main = $('.main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();
    if (item === 'restaurantLogin' || item === 'adminOrders') {
      $checkoutPage.detach();
    }
    $myOrders.detach();
    $restaurantLogin.detach();
    $adminOrderPage.detach();
    switch (item) {
    case item = 'app':
      $app.appendTo($main);
      $checkoutPage.appendTo($main);
      break;
    // case item = 'checkout':
    //   $app.appendTo($main);
    //   $checkoutPage.find('#checkoutItems').empty();
    //   $checkoutPage.appendTo($main);
      // break;
    case item = 'orders':
      $myOrders.find('#orderPageCheckoutItems').empty();
      $myOrders.find('#orderDetails').empty();
      $myOrders.appendTo($main);
      break;
    case item = 'restaurantLogin':
      $restaurantLogin.appendTo($main);
      break;
    case item = 'adminOrders':
      getAdminOrders()
        .then(orders => {
          $navBar.detach();
          $adminNav.prependTo('body');
          const $orderTable = $adminOrderPage.find('#customerOrders');
          $orderTable.append(`<tr><th>Name</th><th>Submitted</th></tr>`);
          for (const order of orders) {
            $orderTable.append(
              `<tr>
                <td>${order.name}</td>
                <td>${order.submit_time}</td>
              </tr>`
            );
          }
          $adminOrderPage.appendTo($main);
        })
        .catch(res => {
          //youre a fake admin, poser
          $app.appendTo($main);
        });
      break;
    }
  };

});
