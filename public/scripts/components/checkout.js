/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $checkoutPage = $(
    `<div id="checkoutPage" class="slide-out">
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
      <button class="primary-btn">Checkout</button>
      </form>
      </div>
  `);

  window.$checkoutPage = $checkoutPage;
  $('body').on('submit', '.removeItem', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    removeFromCart(data).then(res => {
      getCart().then(cart => {
        const $checkoutItem = $('#checkoutItems').empty();
        for (const product of cart) {
          $checkoutItem.append(
            `<tr>
              <td>${product.item.name}</td>
              <td>$${product.item.price} x ${product.count} = $${product.item.price * product.count}</td>
              <td>
              <form class="removeItem">
                <input type="hidden" name="id" value="${product.item.id}"></input>
                <button class="primary-btn">Remove</button>
              </form>
            </td>
            </tr>`);
        }
        $('#checkoutItems').append($checkoutItem);
      });
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
});
