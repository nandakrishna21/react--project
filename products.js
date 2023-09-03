$(document).ready(function () {
  const getProducts = (data) => {
    var tabRow = $("<tr>");
    tabRow.addClass("tab-row");

    var id = $("<td>");
    id.addClass("tab-data-row");
    id.text(data.id);

    var prodName = $("<td>");
    prodName.addClass("tab-data-row");
    prodName.text(data.medicineName);

    var prodBrand = $("<td>");
    prodBrand.addClass("tab-data-row");
    prodBrand.text(data.medicineBrand);

    var expDate = $("<td>");
    expDate.addClass("tab-data-row");
    expDate.text(data.expiryDate);

    var unitPrice = $("<td>");
    unitPrice.addClass("tab-data-row");
    unitPrice.text("$" + data.unitPrice);

    var stock = $("<td>");
    stock.addClass("tab-data-row");
    stock.text(data.stock);

    tabRow.append(id, prodName, prodBrand, expDate, unitPrice, stock);

    return tabRow;
  };

  let prodData;
  let expChkBox = $("#exp");
  let lowChkBox = $("#low-stock");
  let table = $(".products");
  let prodCount = $("#ord-count");

  let expData = [];
  let stockData = [];

  expChkBox.click((e) => {
    if (e.target.checked) {
      let exprTable = prodData.filter((item) => {
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        let date = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();

        let expYear = item.expiryDate.split("-")[2];
        let expMonth = item.expiryDate.split("-")[1];
        let exprDate = parseInt(item.expiryDate.split("-")[0]);

        months.find((month, index) => {
          if (month === expMonth) {
            expMonth = index + 1;
          }
        });

        if (expYear <= year) {
          if (expMonth <= month) {
            if (exprDate <= date) {
              return item;
            }
          }
        }
      });

      expData = exprTable;

      if (lowChkBox.is(":checked")) {
        let expiryTable = [...stockData, ...expData];

        prodCount.empty();
        prodCount.append("Count: ", expiryTable.length);
        table.empty();

        table.append(
          '<tr id="row-head">' +
            '<th class="th-head prd-head">ID</th>' +
            '<th class="th-head prd-head">Product Name</th>' +
            '<th class="th-head prd-head">Product Brand</th>' +
            '<th class="th-head prd-head">Expiry Date</th>' +
            '<th class="th-head prd-head">Unit Price</th>' +
            '<th class="th-head prd-head">Stock</th>' +
            "</tr>"
        );

        expiryTable.map((product) => {
          table.append(getProducts(product));
        });
      } else {
        prodCount.empty();
        prodCount.append("Count: ", expData.length);

        table.empty();

        table.append(
          '<tr id="row-head">' +
            '<th class="th-head prd-head">ID</th>' +
            '<th class="th-head prd-head">Product Name</th>' +
            '<th class="th-head prd-head">Product Brand</th>' +
            '<th class="th-head prd-head">Expiry Date</th>' +
            '<th class="th-head prd-head">Unit Price</th>' +
            '<th class="th-head prd-head">Stock</th>' +
            "</tr>"
        );
        exprTable.map((product) => {
          table.append(getProducts(product));
        });
      }
    } else if (lowChkBox.is(":checked")) {
      prodCount.empty();
      prodCount.append("Count: ", stockData.length);
      table.empty();

      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">Product Name</th>' +
          '<th class="th-head prd-head">Product Brand</th>' +
          '<th class="th-head prd-head">Expiry Date</th>' +
          '<th class="th-head prd-head">Unit Price</th>' +
          '<th class="th-head prd-head">Stock</th>' +
          "</tr>"
      );
      stockData.map((product) => {
        table.append(getProducts(product));
      });
    } else {
      prodCount.empty();
      prodCount.append("Count: ", prodData.length);
      table.empty();
      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">Product Name</th>' +
          '<th class="th-head prd-head">Product Brand</th>' +
          '<th class="th-head prd-head">Expiry Date</th>' +
          '<th class="th-head prd-head">Unit Price</th>' +
          '<th class="th-head prd-head">Stock</th>' +
          "</tr>"
      );
      prodData.map((item) => {
        table.append(getProducts(item));
      });
    }
  });
  lowChkBox.click((e) => {
    if (e.target.checked) {
      stockData = prodData.filter((item) => {
        if (item.stock <= 100) {
          return item;
        }
      });
      if (expChkBox.is(":checked")) {
        let stockTable = [...stockData, ...expData];

        prodCount.empty();
        prodCount.append("Count: ", stockTable.length);

        table.empty();

        table.append(
          '<tr id="row-head">' +
            '<th class="th-head prd-head">ID</th>' +
            '<th class="th-head prd-head">Product Name</th>' +
            '<th class="th-head prd-head">Product Brand</th>' +
            '<th class="th-head prd-head">Expiry Date</th>' +
            '<th class="th-head prd-head">Unit Price</th>' +
            '<th class="th-head prd-head">Stock</th>' +
            "</tr>"
        );

        stockTable.map((product) => {
          table.append(getProducts(product));
        });
      } else {
        prodCount.empty();
        prodCount.append("Count: ", stockData.length);
        table.empty();

        table.append(
          '<tr id="row-head">' +
            '<th class="th-head prd-head">ID</th>' +
            '<th class="th-head prd-head">Product Name</th>' +
            '<th class="th-head prd-head">Product Brand</th>' +
            '<th class="th-head prd-head">Expiry Date</th>' +
            '<th class="th-head prd-head">Unit Price</th>' +
            '<th class="th-head prd-head">Stock</th>' +
            "</tr>"
        );

        stockData.map((product) => {
          table.append(getProducts(product));
        });
      }
    } else if (expChkBox.is(":checked")) {
      prodCount.empty();
      prodCount.append("Count: ", expData.length);

      table.empty();

      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">Product Name</th>' +
          '<th class="th-head prd-head">Product Brand</th>' +
          '<th class="th-head prd-head">Expiry Date</th>' +
          '<th class="th-head prd-head">Unit Price</th>' +
          '<th class="th-head prd-head">Stock</th>' +
          "</tr>"
      );

      expData.map((product) => {
        table.append(getProducts(product));
      });
    } else {
      prodCount.empty();
      prodCount.append("Count: ", prodData.length);

      table.empty();

      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">Product Name</th>' +
          '<th class="th-head prd-head">Product Brand</th>' +
          '<th class="th-head prd-head">Expiry Date</th>' +
          '<th class="th-head prd-head">Unit Price</th>' +
          '<th class="th-head prd-head">Stock</th>' +
          "</tr>"
      );

      prodData.map((item) => table.append(getProducts(item)));
    }
  });

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
    (response) => {
      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">Product Name</th>' +
          '<th class="th-head prd-head">Product Brand</th>' +
          '<th class="th-head prd-head">Expiry Date</th>' +
          '<th class="th-head prd-head">Unit Price</th>' +
          '<th class="th-head prd-head">Stock</th>' +
          "</tr>"
      );

      prodData = response;
      prodCount.empty();
      prodCount.append("Count: ", prodData.length);

      response.map((item) => table.append(getProducts(item)));
    }
  );
});
