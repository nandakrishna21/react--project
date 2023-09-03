$(document).ready(() => {
  const getUsers = (data) => {
    var tabRow = $("<tr>");
    tabRow.addClass("tab-row");

    var id = $("<td>");
    id.addClass("tab-data-row");
    id.text(data.id);

    var userAvatar = $("<td>");
    userAvatar.addClass("tab-data-row");

    var profilePic = $("<img>");
    profilePic.addClass("user-avatar");
    profilePic.attr("src", data.profilePic);
    profilePic.attr("alt", data.fullName);

    userAvatar.append(profilePic);

    var fullName = $("<td>");
    fullName.addClass("tab-data-row");
    fullName.text(data.fullName);

    var dob = $("<td>");
    dob.addClass("tab-data-row");
    dob.text(data.dob);

    var sex = $("<td>");
    sex.addClass("tab-data-row");
    sex.text(data.gender);

    let curLoc = $("<td>");
    curLoc.addClass("tab-data-row");
    curLoc.text(data.currentCity + ", " + data.currentCountry);

    tabRow.append(id, userAvatar, fullName, dob, sex, curLoc);

    return tabRow;
  };
  let userData;

  let searchBox = $("#search-box");
  $("#reset-btn").on({
    click: () => {
      let table = $(".ordprod-tab");
      table.empty();

      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">User Avatar</th>' +
          '<th class="th-head prd-head">Full Name</th>' +
          '<th class="th-head prd-head">DOB</th>' +
          '<th class="th-head prd-head">Gender</th>' +
          '<th class="th-head prd-head">Current Location</th>' +
          "</tr>"
      );

      searchBox.val("");
      userData.map((item) => table.append(getUsers(item)));
    },
  });

  $("#search-box").on({
    input: (e) => {
      let table = $(".ordprod-tab");
      let searchArray = [];
      searchValue = e.target.value.toLowerCase();
      searchArray = userData.filter((item) => {
        if (
          item.fullName.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        } else if (searchValue.length < 2) {
          alert("Search Value should be atleast 2 Characters...");
          return item;
        }
      }, e.target.value);
      table.empty();

      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">User Avatar</th>' +
          '<th class="th-head prd-head">Full Name</th>' +
          '<th class="th-head prd-head">DOB</th>' +
          '<th class="th-head prd-head">Gender</th>' +
          '<th class="th-head prd-head">Current Location</th>' +
          "</tr>"
      );

      searchArray.map((item) => table.append(getUsers(item)));
    },
  });

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    (response) => {
      let table = $(".ordprod-tab");

      table.append(
        '<tr id="row-head">' +
          '<th class="th-head prd-head">ID</th>' +
          '<th class="th-head prd-head">User Avatar</th>' +
          '<th class="th-head prd-head">Full Name</th>' +
          '<th class="th-head prd-head">DOB</th>' +
          '<th class="th-head prd-head">Gender</th>' +
          '<th class="th-head prd-head">Current Location</th>' +
          "</tr>"
      );

      userData = response;

      response.map((item) => table.append(getUsers(item)));
    }
  );
});
