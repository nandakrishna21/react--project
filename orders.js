$(document).ready(function () {
  const getOrders = (data) => {
    var tabRow = $("<tr>");
    tabRow.addClass("tab-row");

    var id = $("<td>");
    id.addClass("tab-data-row");
    id.text(data.id);

    var custName = $("<td>");
    custName.addClass("tab-data-row");
    custName.text(data.customerName);

    var ordDate = $("<td>");
    ordDate.addClass("tab-data-row");
    ordDate.text(data.orderDate);

    var amount = $("<td>");
    amount.addClass("tab-data-row");
    amount.text(data.amount);

    var ordStatus = $("<td>");
    ordStatus.addClass("tab-data-row");
    ordStatus.text(data.orderStatus);

    tabRow.append(id, custName, ordDate, amount, ordStatus);

    return tabRow;
  };

  let ordersData, newOrders, packedOrders, intransitOrders, deliveredOrders;

  let newChkBox = $("#new");
  let packChkBox = $("#pack");
  let inTransChkBox = $("#trans");
  let delChkBox = $("#del");

  let selectedBox = [];

  $("input:checkbox").change((e) => {
    let table = $(".ordprod-tab");
    let ordersCount = $("#ord-count");

    let outputTab = [];

    if (e.target.checked) {
      selectedBox.push(e.target.value);
      selectedBox.map((item, index) => {
        outputTab.push(...eval(`${item}Orders`));
      });
    } else {
      let index = selectedBox.indexOf(e.target.value);
      selectedBox.splice(index, 1);
      selectedBox.map((item, index) => {
        let value = e.target.labels[0].outerText.toLowerCase();
        outputTab.push(...eval(`${value}Orders`));
      });
    }

    ordersCount.empty();
    ordersCount.append("Count: ", outputTab.length);
    table.empty();

    table.append(
      '<tr id="row-head">' +
        '<th class="th-head">ID</th>' +
        '<th class="th-head">CUSTOMER</th>' +
        '<th class="th-head">DATE</th>' +
        '<th class="th-head">AMOUNT</th>' +
        '<th class="th-head">STATUS</th>' +
        "</tr>"
    );
    outputTab.map((item) => table.append(getOrders(item)));
  });

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
    (response) => {
      ordersData = response;
      newOrders = ordersData.filter((item) => item.orderStatus == "New");

      packedOrders = ordersData.filter((item) => item.orderStatus == "Packed");

      intransitOrders = ordersData.filter(
        (item) => item.orderStatus == "InTransit"
      );

      deliveredOrders = ordersData.filter(
        (item) => item.orderStatus == "Delivered"
      );

      newChkBox.click();
      packChkBox.click();
      inTransChkBox.click();
      delChkBox.click();
    }
  );
});
