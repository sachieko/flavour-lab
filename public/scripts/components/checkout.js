/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $checkoutPage = $(
    `<div id="checkoutPage">
    <table id="checkoutItems">
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </table>
    <form id="checkoutForm">
      Name: <input type="text" name="name"></input></br>
      Phone: <input type="text" name="phone"></input></br>
      Special Instructions: <textarea name="note"></textarea></br>
      Tax: <input type="text" name="tax"></input></br>
      Tip: <input type="number" name="tip"></input></br>
      Discount Code: <input type="text" name="discount"></input></br>
      <button>Checkout</button>
    </form>
  </div>`
  );

  window.$checkoutPage = $checkoutPage;

  $('body').on('submit', '.removeItem', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    removeFromCart(data).then(res => {
      $('body').find('nav #cart-btn').trigger('click');
    });
  });

  const makeFormObject = function(array) {
    const returnObj = {};
    for (const keyValuePair of array) {
      returnObj[keyValuePair.name] = keyValuePair.value;
    }
    return returnObj;
  };

  $('body').on('submit', '#checkoutForm', function(event) {
    event.preventDefault();
    const order = makeFormObject($(this).serializeArray()); // serialize Array output: [{ name:formname, value: formvalue }...]
    getCart().then(orderDetails => {
      addOrder(order)
        .then(response => {
          window.viewsManager.show('orders');
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  });
});
