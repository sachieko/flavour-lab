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
    </header>`
  );
  window.$navBar = $navBar;

  $('body').on('click', '.user-nav img, .user-nav span, .menu-links', function() {
    viewsManager.show('app');
  });

  $('body').on('click', 'nav #restaurantLogin', function() {
    viewsManager.show('restaurantLogin');
  });

  $('body').on('click', 'nav #navOrdersButton', function() {
    getOrder().then((order) => {
      viewsManager.show('orders');
      $myOrders.find('#orderDetails').append(`
        <div id="order-status">
          <p>Order #${order.info.id} was placed!</p></br>
          <p>Pick-up time: ${order.info.estimated_time}</p></br>
          <p>Completion time: ${order.info.completed_time}</p></br>
          <p>Please check your phone for SMS updates from the restaurant, or stay on this page for status updates.</p>
        </div>
        <div id="pick-up-details">
          <h5>Pick-up Details</h5>
          <p>Order Contact Name: ${order.info.name}</p>
          <p>Order Contact Number: ${order.info.phone}</p>
        </div>
        <div id="restaurant-details">
          <div>
            <p>Restaurant Address:<p>
            <p>1 Taco Grease street</p>
            <p>Flavourtown BC GU1 F13R1</p>
          </div>
          <div>
            <p>Restaurant Contact Number:</p>
            <p>000 000 0000</p>
          </div>
        </div>
      `);

      // $myOrders.find('#orderPageCheckoutItems').append(`
      //   <tr>
      //     <th>Name</th>
      //     <th>Qty</th>
      //     <th>Price</th>
      //   </tr>
      // `);
      for (const item of order.items) {
        $myOrders.find('#orderPageCheckoutItems').append(`
          <div class="orderItem">
              <p>${item.name}</p>
              <p>${item.quantity}</p>
              <p>$${item.price}</p>
          </div>
        `);
      }
      $myOrders.find('#orderPageCheckoutItems').append(`
        <div id="separator"></div>
        <div id="ordertotals">
          <div id="subtotal">
            <p>Subtotal</p>
            <p>$00.00</p>
          </div>
          <div id="taxes">
            <p>Taxes</p>
            <p>$00.00</p>
          </div>
          <div id="tip">
            <p>Tip</p>
            <p>$00.00</p>
          </div>
          <div id="total">
            <p>TOTAL</p>
            <p>$00.00</p>
          </div>
        </div>
        <div id="order-note">
          <p>Order Note:</p>
          <p>${order.info.note}</p>
        </div>
      `);


    }).catch(err => {
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
