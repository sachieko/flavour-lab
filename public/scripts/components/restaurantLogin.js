$(() => {
  const $restaurantLogin = $(
    `<form id="restaurantLoginForm"">
        email: <input type="text" name="email"></input></br>
        password: <input type="password" name="password"></input></br>
        <button>Login</button>
    </form>`
  );

  window.$restaurantLogin = $restaurantLogin;

  $('body').on('submit', '#restaurantLoginForm', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    adminLogin(data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log('you tryna hack admin?', err);
    });
  });
});
