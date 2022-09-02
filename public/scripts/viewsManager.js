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
          let j = 0;
          const $orderTable = $adminOrderPage.find('#customerOrders');
          for (let i = 0; i < orders.length; i = j) {
            $orderTable.append(`<div class="customerOrderBox"></div>`);
            let order = orders[i];
            $orderTable.find(".customerOrderBox").last().append(
              `<div class="metaOrderInfo">
                <div class="customerContactInfo">
                  <h5>Contact:</h5>
                  <span>${order.name}</span>
                  <span>${order.phone}</span>
                </div>
                <div class="orderStatus">
                  <h5>Status:</h5>
                  <p>${order.completed_time ? `Completed at ${order.completed_time}` : `Outstanding Order `}</p>
                  <p>${order.estimated_time ? `Expected completion ${order.estimated_time}` : 'Awaiting ETA'}</p>
                  <p>Submitted At ${order.submit_time}</p>
                </div>
              </div>
              ${!order.completed_time ?
    `<div class="timeManagement">
                  <h5>Manage Order</h5>

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
                </div>
              <div>
                <h5 class="toggleItems">Order Items (click me to toggle)</h5>
                <div class="customerItems">
                </div>
              </div>`);
            j = i;
            while (order.id === orders[j].id) {
              $orderTable.find(".customerOrderBox").last().find(".customerItems").append(
                `<div class="customerItem">
                  <span >${orders[j].item_name}</span>
                  <span >${orders[j].items_price}</span>
                </div>`);
              j++;
              if (j >= orders.length - 1) {
                break;
              }
            }
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
