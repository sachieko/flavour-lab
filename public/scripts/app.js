/* eslint-disable no-undef */
$(() => {
  const $app = $(`
  <section id="menu">
  </section>
  `);
  window.$app = $app;

  const createMenuElement = function(menuItem) {
    const item = menuItem;
    const $itemHTML = $(`
    <article class="menu-item ${item.category}">
        <div class="item-info">
          <h5 class="item-name">${item.name}</h5>
          <p class="item-desc">${item.description}</p>
          <p class="item-price">$${item.price}</p>
        </div>
        <div class="item-picture">
          <img src="${item.picture_url}">
        </div>
      </article>`);
    item.is_available ? $($itemHTML).children('div.item-info').append(`<form class="view-item-btn" action="/api/items/${item.id}" method="GET">
    <input type="hidden" name="item-id" value="${item.id}">
    <button type="submit" class="add-btn">Add to Order</button>
    </form>`) : $($itemHTML).children('div.item-info').append(`<span class="unavailable">Item is unavailable</span>`);
    $app.append($itemHTML[0]);
  };

  const renderMenu = function() {
    getItems()
      .then(menuItems => {
        for (const menuItem of menuItems) {
          createMenuElement(menuItem);
        }
        $app.appendTo('body');
        viewsManager.show('app');
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  renderMenu();

  $('body').on('submit', '.view-item-btn', function(event) {
    event.preventDefault();
    const itemId = $(this[0])[0].value; // Gets the value of the hidden input which is the item ID.
    console.log(itemId);
  });
});

