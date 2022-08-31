/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(() => {
  const $myOrders = $(
    `<div id="myOrders">
      <table id="checkoutItems">
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </table>
    </div>`
  );
  window.$myOrders = $myOrders;
});
