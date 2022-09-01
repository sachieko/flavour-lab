/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {

  const $checkoutPage = $(
    `
    <div id="checkoutPage" class="slide-out">
    <i class="fa-solid fa-angles-right"></i>
      <div>
      <h2>Your Order</h2>
      <table id="checkoutItems">
      <tr>
        <th>Grub</th>
        <th>Price</th>
      </tr>
      </table>
    <form id="checkoutForm">
    <table id="checkoutTable">
    <tr>
      <th></th>
    <tr>
      <td>Name: </td><td><input type="text" name="name"></input></td>
    </tr>
    <tr>
      <td>Phone: </td><td><input type="text" name="phone"></input></td>
    </tr>
    <tr>
      <td>Special Instructions: </td><td><textarea name="note"></textarea></td>
    </tr>
    <tr>
      <td>Tax:</td><td> <input type="text" name="tax"></input></td>
    </tr>
    <tr>
      <td>Tip: </td><td><input type="number" name="tip"></input></td>
    </tr>
    <tr>
      <td>Discount Code: </td><td><input type="text" name="discount"></input></td>
    </tr>
      </table>
      <button class="primary-btn">Checkout</button>

      </form>
      </div>
      </div>
  `);

  window.$checkoutPage = $checkoutPage;
  $('body').on('submit', '.removeItem', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    removeFromCart(data).then(res => {
      getCart().then(buildCartElement);
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
    const data = $(this).serialize();
    addOrder(data).then((order)=>{
      $('#checkoutForm input').val(''); // reset checkout form on good order
      $navBar.find('div').find('#navOrdersButton').trigger('click');
      sendText().catch((err) => {
        console.log(err);
      });
    });
  });

  $('body').on('click', 'i.fa-angles-right', function(event) {
    event.preventDefault();
    $('#checkoutPage').toggleClass('slide-out').toggleClass('slide-in');
  });
});
