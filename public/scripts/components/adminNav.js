/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  $adminNav = $(
    `<nav class="admin-nav">
    <img style="width:4.5em" src="../../images/fieri.png" />
    <div>
    <span class="logo">Flavour </span><span class="logo">Labs</span>
    </div>
    <div>
    <button id="adminLogout">Logout</button>
    </div>
    </nav>`
  );
  window.$adminNav = $adminNav;

  $('body').on('click', '.admin-nav #adminLogout', function() {
    adminLogout()
      .then(res => {
        $adminNav.detach();
        $navBar.prependTo('body');
        location.reload();
      })
      .catch(err => {
      //cant loggout if you're not logged in chief
        console.log(err);
      });
  });
});
