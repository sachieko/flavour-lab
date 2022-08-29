// Client facing scripts here
/* eslint-disable no-undef */
$(() => {
  const $app = $(`<div><ul></ul><button id="cart">Cart</button></div>`);
  getItems().then((items) => {
    for (let i in items) {
      $app.append(`<li>${items[i].name}: $${items[i].price}</li>`);
    }
    viewsManager.show('app');
  });
  window.$app = $app;


  $('body').on('click', '#cart', () => {
    console.log('Inside click event listener')

    viewsManager.show('cart');
  })

});
