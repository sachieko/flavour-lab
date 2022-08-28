/* eslint-disable no-undef */
$(() => {

  const $main = $('#main-content');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();

    switch (item) {
    case item = 'app':
      $app.appendTo($main);
      break;
    }
  };

});
