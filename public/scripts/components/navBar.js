/* eslint-disable no-undef */
$(() => {
  const $navBar = $( // Currently categories are hard coded, refactor to build categories from db!
    `
      <nav>
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

  $('body').on('click', 'nav, header', function() {
    viewsManager.show('app');
  });

  $('body').on('click', 'nav #restaurantLogin', function() {
    // set timeout because every click of nav or header will cause views manager to show app
    setTimeout(() => {
      viewsManager.show('restaurantLogin');
    }, 10);
  });

  $('body').on('click', 'nav #navOrdersButton', function() {
    getOrder().then((order) => {
      viewsManager.show('orders');
      $myOrders.find('#orderDetails').append(`
        <p>Name on Order: ${order.info.name}</p>
        <p>Phone on Order: ${order.info.phone}</p>
        <p>Date Submitted: ${order.info.submit_time}</p>
        <p>Started Order at: ${order.info.started_time}</p>
        <p>ETA: ${order.info.estimated_time}</p>
        <p>Completed at: ${order.info.completed_time}</p>
      `);
      $myOrders.find('#orderPageCheckoutItems').append(
        `<tr><th>Name</th><th>Price</th></tr>`);
      for (const item of order.items) {
        $myOrders.find('#orderPageCheckoutItems').append(
          `<tr><td>${item.name}</td><td>$${item.price}</td></tr>`);
      }
    }).catch(err => {
      console.log(err);
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
