/* eslint-disable no-undef */
/*
HELPER FUNCTIONS IN HERE, THESE WILL LOAD BEFORE OUR JQUERY FUNCTIONS AND YOU CAN CALL THEM. Makes code DRYer between components.
*/
const buildCartElement = function (cart) { // Passed in as a callback function anywhere you expect a cart back
  const $checkoutItem = $('#checkoutItems').empty();
  for (const product of cart) {
    $checkoutItem.append(`
      <tr>
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
};

/* CREATE CATEGORY TITLE FUNCTION
     Called within the createMenuElement function.
  */
const createCategoryTitle = function (item) {
  if ($app.find(`#${item.category}`).length !== 0) {              // If a title for this category already exists,
    return;                                                       // do nothing.
  }
  $app.append(`<div id="${item.category}Spot" class="anchor"></div><h2>${item.category}</h2><div id="${item.category}" class="item-container"></div>`); // Else, create a category title.
};
