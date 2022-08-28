$(() => {

  const $body = $('body');

  window.viewsManager = {};

  window.viewsManager.show = function(item) {
    $app.detach();
    $users.detach();

    if (item === 'app') {
      $app.appendTo($body);
      break;
    }
    if (item === 'users') {
      $users.appendTo($body);
      break;
    }
    if (item === 'error') {
      const $error = $(`<p>${arguments[1]}</p>`);
      $error.appendTo('body');
      setTimeout(() => {
        $error.remove();
        viewsManager.show('app');
      }, 2000);
      break;
    }
  }
});
