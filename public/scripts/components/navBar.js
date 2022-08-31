/* eslint-disable no-undef */
$(() => {
  const $navBar = $(
    `
      <nav>
      <img style="width:4.5em" src="../../images/fieri.png" />
      <div>
      <span class="logo">Flavour </span><span class="logo">Labs</span>
      </div>
      <div>
      <button id="navOrdersButton">Orders</button>
      <button type="button" id="cart-btn"><i class="fa fa-shopping-cart"> Cart</i></button>
      </div>
      </nav>
      <header class="menu-links">
      <div>
        <a href="#AppetizersSpot" class="menu-link">Appetizers</a>
        <a href="#SaladsSpot" class="menu-link">Salads</a>
        <a href="#PotatoSpot" class="menu-link">Potato</a>
        <a href="#MainsSpot" class="menu-link">Mains</a>
        <a href="#DessertsSpot" class="menu-link">Desserts</a>
        <a href="#DrinksSpot" class="menu-link">Drinks</a>
        <a href="#SaucesSpot" class="menu-link">Sauces</a>
      </div>
    </header>`
  );
  window.$navBar = $navBar;
  $navBar.prependTo('body');
  $('body').on('click', 'nav', function() {
    viewsManager.show('app');
  });

  $('body').on('click', 'nav #navOrdersButton', function() {
    viewsManager.show('orders');
  });

  $('body').on('click', 'nav #cart-btn', function() {
    getCart().then(cart => {
      viewsManager.show('checkout');
      const $checkoutItem = $checkoutPage.find('#checkoutItems');
      for (const product of cart) {
        $checkoutItem.append(
          `<tr>
            <td>${product.item.name}</td>
            <td>$${product.item.price} x ${product.count} = $${product.item.price * product.count}</td>
            <td>
              <form class="removeItem">
                <input type="hidden" name="id" value="${product.item.id}"></input>
                <button>Remove</button>
              </form>
            </td>
          </tr>`);
      }
      $checkoutItem.append($checkoutItem);
    });
  });
});
