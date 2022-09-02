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

  $('body').on('click', '.user-nav img, .user-nav span', function() {
    slideCartMax(767);
    viewsManager.show('app');
  });

  $('body').on('click', 'nav #restaurantLogin', function() {
    slideCartMax(767);
    viewsManager.show('restaurantLogin');
  });

  $('body').on('click', 'nav #cart-btn', function() {
    getCart().then(cart => {
      buildCartElement(cart);
      $('#checkoutPage').css('display', 'flex');
      slideCart();
      $('#checkoutPage').animate({
        scrollTop: 0
      }, "slow");
    });
  });

  $('body').on('click', '.menu-link', function(event) { // Scroll to specific menu section on header click
    event.preventDefault();
    slideCartMax(767);
    viewsManager.show('app');
    $(`#${$(this)[0].innerHTML}Spot`)[0].scrollIntoView({
      behavior: "smooth"
    });
  });
});
