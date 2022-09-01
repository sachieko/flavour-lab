/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {

  const $main = $('.main-content');

  window.viewsManager = {};
  window.viewsManager.show = function(item) {
    $app.detach();
    if (item === 'restaurantLogin' || item === 'adminOrders') {
      $('#checkoutPage').toggleClass('slide-out').toggleClass('slide-in');
    }
    if (!$('#checkoutPage').length) {
      $checkoutPage.appendTo($main);
    }
    $myOrders.detach();
    $restaurantLogin.detach();
    $adminOrderPage.detach();
    $checkoutPage.appendTo($main);
    switch (item) {
    case item = 'app':
      $app.appendTo($main);
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
