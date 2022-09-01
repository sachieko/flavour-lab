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
      getAdminOrders()
        .then(orders => {
          $navBar.detach();
          $adminNav.prependTo('body');
          const $orderTable = $adminOrderPage.find('#customerOrders');
          $orderTable.append(`<tr><th>Name</th><th>Submitted</th><th>ETA</th></tr>`);
          for (const order of orders) {
            $orderTable.append(
              `<tr>
                <td>${order.name}</td>
                <td>${order.submit_time}</td>
                <td>
                  ${order.completed_time ?
    `Completed at ${order.completed_time}` : 'Pending'}
                </td>
                <td>
                  ${order.estimated_time ?
    `Expected completion ${order.estimated_time}` : 'Awaiting ETA'}
                </td>
                <td>
                  ${!order.completed_time ? `
                  <form class="startOrder">
                    <input type="hidden" value="Start" name="cmd"/>
                    <input type="hidden" value=${order.id} name="id"/>
                    <button>Start</button>
                  </form>
                  <form class="estimateOrder">
                    <input type="hidden" value="Estimate" name="cmd"/>
                    <input type="hidden" value=${order.id} name="id"/>
                    <input type="number" name="est"/>
                    <button>Estimate</button>
                  </form>
                  <form class="completeOrder">
                    <input type="hidden" value="Complete" name="cmd"/>
                    <input type="hidden" value=${order.id} name="id"/>
                    <button>Complete</button>
                  </form>` : ''}
                </td>
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
