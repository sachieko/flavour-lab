/* eslint-disable no-undef */
$(() => {
  const $adminOrderPage = $(
    `<div id="adminOrders"">
        <h1>Customer Orders</h1>
        <div class="customerOrders">
        </div>
    </div>`
  );
  window.$adminOrderPage = $adminOrderPage;

  const letsPlay = function() {
    getAdminOrders()
      .then(orders => {
        $navBar.detach();
        $adminNav.prependTo('body');
        $adminOrderPage.append(`<div class="customerOrders"></div>`);
        let j = 0;
        const $orderTable = $adminOrderPage.find('.customerOrders').last();
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
        $adminOrderPage.append($orderTable);
        $adminOrderPage.find('.customerOrders').first().remove();
      })
      .catch(res => {
        //youre a fake admin, poser
      });
  };

  $('body').on('play', letsPlay);

  $('body').on('replay', letsPlay);

  $('body').on('submit', '#adminOrders .startOrder', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminStartOrder(data).then(() => $('body').trigger('replay'));
  });

  $('body').on('submit', '#adminOrders .estimateOrder', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminEstimateOrder(data).then(() => $('body').trigger('replay'));
  });

  $('body').on('submit', '#adminOrders .completeOrder', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminCompleteOrder(data).then(() => $('body').trigger('replay'));
  });

  $('body').on('click', '.toggleItems', function() {
    $(this).parent().find(".customerItems").toggle();
  });
});
