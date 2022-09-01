$(() => {
  $adminNav = $(
    `<nav>
    <img style="width:4.5em" src="../../images/fieri.png" />
    <div>
    <span class="logo">Flavour </span><span class="logo">Labs</span>
    </div>
    <div>
    <button id="adminLogout">Logout</button>
    </div>
    </nav>`
  )
  window.$adminNav = $adminNav;

  $('body').on('click', 'nav #adminLogout', function() {
    adminLogout()
    .then(res => {
      $adminNav.detach();
      $navBar.prependTo('body');
      viewsManager.show('app');
    })
    .catch(err => {
      //cant loggout if youre not logged in chief
      console.log(err)
    });
  });
});
