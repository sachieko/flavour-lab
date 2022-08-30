/* eslint-disable no-undef */
$(() => {
  const $navBar = $(
    `
      <nav>
      <div>
      <img style="width:50px" src="../../images/fieri.png" />
      <span class="logo">Flavour Labs</span>
      </div>
      <div>
      <button id="navOrdersButton">Orders</button>
      <button type="button" id="cart-btn"><i class="fa fa-shopping-cart"> Cart</i></button>
      </div>
      </nav>
      <header class="menu-links">
      <div>
        <a href="/" class="menu-link">Appetizers</a>
        <a href="/" class="menu-link">Salads</a>
        <a href="/" class="menu-link">Potato</a>
        <a href="/" class="menu-link">Mains</a>
        <a href="/" class="menu-link">Desserts</a>
        <a href="/" class="menu-link">Drinks</a>
        <a href="/" class="menu-link">Sauces</a>
      </div>
    </header>`
  );
  window.$navBar = $navBar;
  $navBar.prependTo('body');
  $('body').on('click', 'header img', function() {
    viewsManager.show('app');
  });
  $('body').on('click', 'header #navOrdersButton', function() {
    viewsManager.show('orders');
  });
  $('body').on('click', 'header #navCheckoutButton', function() {
    viewsManager.show('checkout');
  });
});
/*
<!-- Top nav bar (fixed) -->
  <nav>
    <span class="logo">Flavour Labs</span>
    <div class="cart">

    </div>
  </nav>

  <!-- Header menu links (fixed) -->
  <header class="menu-links">
    <div>
      <a href="/" class="menu-link">Appetizers</a>
      <a href="/" class="menu-link">Salads</a>
      <a href="/" class="menu-link">Potato</a>
      <a href="/" class="menu-link">Mains</a>
      <a href="/" class="menu-link">Desserts</a>
      <a href="/" class="menu-link">Drinks</a>
      <a href="/" class="menu-link">Sauces</a>
    </div>
  </header>
  */
