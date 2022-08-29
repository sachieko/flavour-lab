$(() => {

  const $cart = $('<div></div>');

  getCart()
    .then((cart) => {
      for (let item of cart) {
        $cart.append(`<li>${item.name}: $${item.price}</li>`);
      }

   })

  window.$cart = $cart;


});
