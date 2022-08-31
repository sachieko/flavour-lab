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

  $('body').on('submit', '#checkoutForm', function(event) { // click for testing purposes, submit for actual
    event.preventDefault();
    const order = makeFormObject($(this).serializeArray()); // serialize Array output: [{ name:formname, value: formvalue }...]
    console.log('data from form:', order);
    getCart().then(orderDetails => {
      console.log('cart: ', orderDetails);
      addOrder(order)
        .then(orderId => {
          for (const orderDetail of orderDetails) {
            const detailObj = {};
            detailObj.order_id = Number(orderId);
            detailObj.item_id = orderDetail.item.id;
            detailObj.quantity = orderDetail.count;
            detailObj.price = orderDetail.item.price;
            detailObj.note = orderDetail.item.note;
            addOrderDetails(detailObj);
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  });
});
