/* eslint-disable no-undef */
$(() => {
  const $app = $(`
  <section id="menu">
  </section>
  `);
  window.$app = $app;

  /* CREATE CATEGORY TITLE FUNCTION
     Called within the createMenuElement function.
  */
  const createCategoryTitle = function(item) {
    if ($app.find(`#${item.category}`).length !== 0) {              // If a title for this category already exists,
      return;                                                       // do nothing.
    }
    $app.append(`<div id="${item.category}Spot" class="anchor"></div><h2>${item.category}</h2><div id="${item.category}" class="item-container"></div>`); // Else, create a category title.
  };

  const createMenuElement = function(menuItem) {
    const item = menuItem;
    createCategoryTitle(item);
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
      </article>
    `);
    item.is_available ? $($itemHTML).children('div.item-info').append(`
    <form class="view-item-btn">
    <input type="hidden" name="itemId" value="${item.id}">
    <button type="submit" class="add-btn">Add to Order</button>
    </form>`) : $($itemHTML).children('div.item-info').append(`
    <span class="unavailable">Item is unavailable</span>
    `);
    $app.find(`#${item.category}`).append($itemHTML[0]);
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
  isAdmin()
    .then(theyAreAdmin => {
      $adminNav.prependTo('body');
      viewsManager.show('adminOrders');
    })
    .catch(notAdmin => {
      $navBar.prependTo('body');
      renderMenu();
    });

  $('body').on('submit', '.view-item-btn', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    addToCart(data).fail((xhr, status, err)=>{
      console.log(err);
    });
  });
});

