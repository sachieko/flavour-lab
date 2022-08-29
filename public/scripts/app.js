// Client facing scripts here
/* eslint-disable no-undef */
$(() => {
  const $app = $(
    `<div id="home">
    <ul id="homeItems"></ul>
  </div>`
  );
  const renderItems = function() {
    getItems().then((items) => {
      for (let i in items) {
        $app.find('#homeItems').append(`<li>${items[i].name}: $${items[i].price}</li>`);
      }
      viewsManager.show('app');
    });
  };
  renderItems();
  window.$app = $app;
});
