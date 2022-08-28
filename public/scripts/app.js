// Client facing scripts here
/* eslint-disable no-undef */
$(() => {
  const $app = $(`<ul></ul>`);
  getItems().then((items) => {
    for (let i in items) {
      $app.append(`<li>${items[i].name}: $${items[i].price}</li>`);
    }
    viewsManager.show('app');
  });
  window.$app = $app;
});
