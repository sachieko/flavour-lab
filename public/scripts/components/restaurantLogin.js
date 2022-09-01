/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $restaurantLogin = $(
    `<form id="restaurantLoginForm"">
        email: <input type="text" autocomplete="username" name="email"></input></br>
        password: <input type="password" autocomplete="current-password" name="password"></input></br>
        <button class="primary-btn">Login</button>
    </form>`
  );

  window.$restaurantLogin = $restaurantLogin;

  $('body').on('submit', '#restaurantLoginForm', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminLogin(data)
      .then(res => {
        viewsManager.show('adminOrders');
      })
      .catch(err => {
        console.log('you tryna hack admin?', err);
      });
  });
});
