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

  $('body').on('submit', '.removeItem', function(event){
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    removeFromCart(data).then( (res) => {
      $('body').find('header #navCheckoutButton').trigger('click');
    });
  });

  $checkoutPage.on('submit', '#checkoutForm', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    sendText(data).then((order)=>{
      console.log(order);
      for (const product of order){
        $myOrders.append(
          `<tr>
            <td>${product.name}</td>
            <td>$${product.price}</td>
          </tr>`);
      }
      viewsManager.show('orders');
    });
  });

});
