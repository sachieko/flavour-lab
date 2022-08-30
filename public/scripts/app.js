// Client facing scripts here
/* eslint-disable no-undef */
$(() => {
  const $app = $(
  `<div id="home">
    <ul id="homeItems"></ul>
  </div>`
  );

  window.$app = $app;

  const renderItems = function() {
    getItems().then((items) => {
      for (let i in items) {
        $app.find('#homeItems').append(
          `<li>
            <span>${items[i].name}: $${items[i].price}</span>
            <form class="addToCart" style="display: inline">
              <input type="hidden" name="itemId" value="${items[i].id}">
              <button>Add To Cart</button>
            </form>
          </li>`
          );
      }
      viewsManager.show('app');
    });
  };

  renderItems();

  $('body').on('submit', '.addToCart', function(event){
    event.preventDefault();
    const data = $(this).serialize();
    addToCart(data).fail((xhr, status, err)=>{
      console.log(err);
    });
  });
});
