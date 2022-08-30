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
    getCart().then(cart => {
      viewsManager.show('checkout');
      const $checkoutItem = $checkoutPage.find('#checkoutItems');
      for (const product of cart){
        $checkoutItem.append(
          `<tr>
            <td>${product.item.name}</td>
            <td>$${product.item.price} x ${product.count} = $${product.item.price*product.count}</td>
            <td>
              <form class=removeItem>
                <input type="hidden" name="id" value="${product.item.id}"></input>
                <button>Remove</button>
              </form>
            </td>
          </tr>`);
      }
      $checkoutItem.append($checkoutItem);
    })
  });
});
