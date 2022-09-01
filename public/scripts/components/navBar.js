/* eslint-disable no-undef */
$(() => {
  const $navBar = $( // Currently categories are hard coded, refactor to build categories from db!
    `
      <nav class="user-nav">
        <div>
          <img src="../../images/fieri.png" />
          <div>
            <span class="logo">Flavour </span><span class="logo">Labs</span>
          </div>
        </div>
        <div class="nav-buttons">
          <button id="restaurantLogin">Restaurant Login</button>
          <button id="navOrdersButton">Orders</button>
          <button type="button" id="cart-btn"><i class="fa fa-shopping-cart"> Cart</i></button>
        </div>
      </nav>
      <header class="menu-links">
        <div>
          <a href="#StartersSpot" class="menu-link">Starters</a>
          <a href="#SaladsSpot" class="menu-link">Salads</a>
          <a href="#MainsSpot" class="menu-link">Mains</a>
          <a href="#DessertsSpot" class="menu-link">Desserts</a>
          <a href="#DrinksSpot" class="menu-link">Drinks</a>
          <a href="#SaucesSpot" class="menu-link">Sauces</a>
        </div>
      </header>
    `
  );

  window.$navBar = $navBar;


  $('body').on('click', '.user-nav img, .user-nav span, .menu-links', function() {
    viewsManager.show('app');
  });

  $('body').on('click', 'nav #restaurantLogin', function() {
    viewsManager.show('restaurantLogin');
  });

  $('body').on('click', 'nav #navOrdersButton', function() {
    getOrder()
      .then((order) => {
        viewsManager.show('orders');

        $myOrders.find('#orderDetails').append(`
          <div id="order-status">
            <p class="bold">Order #${order.info.id} was placed!</p></br>
            <p class="bold">Estimated pick-up time: ${order.info.estimated_time}</p></br>
            <p class="bold">Completion time: ${order.info.completed_time}</p></br>
            <p class="small">Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
          </div>
        `);

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

        $myOrders.find('#orderPageCheckoutItems').append(`<h5 class="m-top1">YOUR ORDER</h5>`)

        for (const item of order.items) {
          $myOrders.find('#orderPageCheckoutItems').append(`
            <div class="order-item flex m-top2">
                <p id="item-name">${item.name}</p>
                <p id="item-qty">x ${item.quantity}</p>
                <p>$${item.price}</p>
            </div>
          `);
        }

        $myOrders.find('#orderPageCheckoutItems').append(`
          <div class="m-top2 "id="separator1"></div>
          <div class="m-top2" id="order-totals">
            <div class="flex small">
              <p class="align1">Subtotal</p>
              <p>$00.00</p>
            </div>
            <div class="flex small">
              <p class="align1">Taxes</p>
              <p>$00.00</p>
            </div>
            <div class="flex small">
              <p class="align1">Tip</p>
              <p>$00.00</p>
            </div>
            <div class="flex" id="total">
              <p class="align2">TOTAL</p>
              <p>$00.00</p>
            </div>
          </div>
          <div class="m-top1" id="order-note">
            <p>Order Note:</p>
            <p>${order.info.note}</p>
          </div>
        `);

      })
      .catch(err => {
        console.log(err.message);
        viewsManager.show('orders');
      });
  });

  $('body').on('click', 'nav #cart-btn', function() {
    getCart().then(cart => {
      viewsManager.show('checkout');
      const $checkoutItem = $checkoutPage.find('#checkoutItems');
      for (const product of cart) {
        $checkoutItem.append(
          `<tr>
            <td>${product.item.name}</td>
            <td>$${product.item.price} x ${product.count} = $${product.item.price * product.count}</td>
            <td>
              <form class="removeItem">
                <input type="hidden" name="id" value="${product.item.id}"></input>
                <button>Remove</button>
              </form>
            </td>
          </tr>`);
      }
      $checkoutItem.append($checkoutItem);
    });
  });
});
