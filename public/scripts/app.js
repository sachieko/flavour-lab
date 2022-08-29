// Client facing scripts here
/* eslint-disable no-undef */
$(() => {
  const $app = $(
  `<div id="home">
    <button id="homeCheckoutButton">Checkout</button>
    <ul id="homeItems"></ul>
  </div>`
  );
  getItems().then((items) => {
    for (let i in items) {
      $app.find('#homeItems').append(`<li>${items[i].name}: $${items[i].price}</li>`);
    }
    viewsManager.show('app');
  });
  $("body").on('click', '#homeCheckoutButton', function(event) {
    viewsManager.show('checkout');
  });
  window.$app = $app;
});
