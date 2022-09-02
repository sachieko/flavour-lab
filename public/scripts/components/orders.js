/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(`
    <section id="myOrders"">
      <div id="orderDetails"></div>
      <div id="pick-up-items">
        <div id="pick-up-details"></div>
        <div id="separator2"></div>
        <div id="orderPageCheckoutItems"></div>
      </div>
    </section>
  `);
  window.$myOrders = $myOrders;

  // Inserts the order status, depending on the updates sent by the restaurant.
  // Takes in a order object, appends content to the DOM.
  const insertETA = function(order) {
    const completedTime = order.info.completed_time;
    const eta = order.info.estimated_time;
    if (completedTime === null) {               // If the order is not completed
      if (eta === null && order.info.started_time === null) {                         // and if there's no estimated time yet
        $myOrders.find('#order-status').append(`
            <p class="bold">Order #${order.info.id} was placed!</p></br>
            <p class="bold">Estimated pick-up time: <span class="red">pending confirmation from Flavour Labs...</span></p></br>
            <p class="small">Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
        `);
      }
      if (eta !== null) {                        // if there's an estimated time
        const formattedETA = eta.slice(11,16);
        $myOrders.find('#order-status').append(`
            <p class="bold">Order #${order.info.id} was <span class="red">confirmed!</span></p></br>
            <p class="bold">Estimated pick-up time: <span class="red">${formattedETA}</span></p></br>
            <p class="small">Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
        `);
      }
      if (eta === null && order.info.started_time) {                        // if started but no estimate
        const formattedETA = eta.slice(11,16);
        const startTime = order.info.started_time.slice(11, 16);
        $myOrders.find('#order-status').append(`
            <p class="bold">Order #${order.info.id} was <span class="red">confirmed at ${startTime}!</span></p></br>
            <p class="bold">Estimated pick-up time: <span class="red">${formattedETA}</span></p></br>
            <p class="small">Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
        `);
      }
    }
    if (completedTime !== null) {           // if the order is completed
      const formattedCompletedTime = completedTime.slice(11,16);
      $myOrders.find('#order-status').append(`
        <p class="bold">Order #${order.info.id} <span class="red">is ready for pick-up!</span></p></br>
        <p class="bold">Your order was completed at: ${formattedCompletedTime}</p></br>
      `);
    }
  };

  // Inserts the pick-up details.
  // Takes in an order object, appends content to the DOM.
  const insertPickUpDetails = function(order) {
    if ($myOrders.find('#address').length !== 0) {   // If there's already content in the div #pick-up-details
      return;                                        // do nothing.
    }
    // Else, add content
    $myOrders.find('#pick-up-details').append(`
      <div class="m-top1">
        <h5>PICK-UP DETAILS</h5>
        <div class="flex m-top2">
          <p class="w-13">Order Contact Name:</p>
          <p>${order.info.name}</p>
        </div>
        <div class="flex m-top3">
          <p class="w-13">Order Contact Number:</p>
          <p>${order.info.phone}</p>
        </div>
      </div>
      <div class="m-top1">
        <div class="flex">
          <p id="address">Flavour Labs Address:<p>
          <div>
            <p class="small">1 Taco Grease street</p>
            <p class="small">Flavourtown BC GU1 F13R1</p>
          </div>
        </div>
        <div class="flex m-top3">
          <p id="phone">Flavour Labs Phone:</p>
          <p class="small">000 000 0000</p>
        </div>
      </div>
    `);
  };

  // Inserts the items that were ordered
  // Takes in an order object, appends content to the DOM.
  const insertOrderItems = function(order) {
    for (const item of order.items) {
      $myOrders.find('#orderPageCheckoutItems').append(`
        <div class="order-item flex m-top2">
            <p id="item-name">${item.name}</p>
            <p id="item-qty">x ${item.quantity}</p>
            <p>$${item.price}</p>
        </div>
      `);
    }
  };

  // Inserts the order's subtotal, taxes, tip and total.
  // Takes in an order object, appends content to the DOM.
  const insertOrderTotals = function(order) {

    $myOrders.find('#orderPageCheckoutItems').append(`
      <div class="m-top2 "id="separator1"></div>
      <div class="m-top2" id="order-totals">
        <div class="flex small">
          <p class="align1">Subtotal</p>
          <p>$${order.info.subtotal}</p>
        </div>
        <div class="flex small">
          <p class="align1">Taxes</p>
          <p>$${order.info.tax}</p>
        </div>
        <div class="flex small">
          <p class="align1">Tip</p>
          <p>$${order.info.tip}</p>
        </div>
        <div class="flex" id="total">
          <p class="align2">TOTAL</p>
          <p>$${order.info.total}</p>
        </div>
      </div>
      <div class="m-top1" id="order-note">
        <p>Order Note:</p>
        <p class="small">${order.info.note}</p>
      </div>
    `);
  };

  // Loads the orders page when clicking on the orders button in the nav bar
  const renderOrder = function(event) {
    getOrder()
      .then((order) => {
        viewsManager.show('orders');
        if (order) {
          $myOrders.find('#orderDetails').append(`<div id="order-status"></div>`);

          insertETA(order);
          insertPickUpDetails(order);

          $myOrders.find('#separator2').removeClass("hidden");
          $myOrders.find('#orderPageCheckoutItems').append(`<h5 class="m-top1">YOUR ORDER</h5>`);

          insertOrderItems(order);
          insertOrderTotals(order);

        } else {
          $myOrders.find('#orderDetails').append(`<p class="bold">What are you waiting for? Go order some potatoes!</p>`);
          $myOrders.find('#separator2').addClass("hidden");
        }
      })
      .catch(err => {
        console.log(err.message);
        viewsManager.show('orders');
      });
  };

  $('body').on('click', 'nav #navOrdersButton', renderOrder);

});
