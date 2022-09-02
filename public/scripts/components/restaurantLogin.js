/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $restaurantLogin = $(
    `<form id="restaurantLoginForm"">
        Email <input type="text" autocomplete="username" name="email" placeholder="Enter email"></input></br>
        Password <input type="password" autocomplete="current-password" name="password" placeholder="Enter password"></input></br>
        <button class="primary-btn">Login</button>
    </form>`
  );

  window.$restaurantLogin = $restaurantLogin;

  $('body').on('submit', '#restaurantLoginForm', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminLogin(data)
      .then(() => {
        viewsManager.show('adminOrders');
      })
      .catch(err => {
        console.log('you tryna hack admin?', err);
      });
  });
});
