/* eslint-disable no-undef */
$(() => {
  const $navBar = $(
    `<header>
      <img style="width:50px" src="../../images/fieri.png" />
      <button id="navOrdersButton">Orders</button>
      <button id="navCheckoutButton">Cart</button>
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
