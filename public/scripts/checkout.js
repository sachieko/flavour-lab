$(() => {
  const $checkoutForm = $(`
  <form id="checkoutForm">
    Name: <input type=text name="name"></input>
    Phone: <input type=text name="phone"></input>
    <button>Submit</button>
  </form>`);

  window.$checkoutForm = $checkoutForm;

  $checkoutForm.on('submit', function(event) {
    event.preventDefault();
    let $thing = $(this);
    const data = $(this).serialize();
    sendText(data).then((response)=>{
      console.log(response);
      viewsManager.show('app');
    });
  });
});
