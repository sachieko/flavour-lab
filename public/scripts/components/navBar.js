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

  $('body').on('click', '.user-nav img, .user-nav span', function() {
    viewsManager.show('app');
  });

  $('body').on('click', 'nav #restaurantLogin', function() {
    viewsManager.show('restaurantLogin');
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
      console.log(err.message);
      viewsManager.show('orders');
    });
  });

  $('body').on('click', 'nav #cart-btn', function() {
    getCart().then(cart => {
      buildCartElement(cart);
      $('#checkoutPage').css('display', 'flex');
      $('#checkoutPage').toggleClass('slide-out').toggleClass('slide-in');
    });
  });

  $('body').on('click', '.menu-link', function(event) {
    event.preventDefault();
    viewsManager.show('app');
    $(`#${$(this)[0].innerHTML}Spot`)[0].scrollIntoView({
      behavior: "smooth"
    });


  });
});
