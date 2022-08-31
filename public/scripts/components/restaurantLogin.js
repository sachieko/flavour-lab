$(() => {
  const $restaurantLogin = $(
    `<form id="restaurantLoginForm"">
        username: <input type="text"></input></br>
        password: <input type="text"></input></br>
        <button>Login</button>
    </form>`
  );

  window.$restaurantLogin = $restaurantLogin;

});
