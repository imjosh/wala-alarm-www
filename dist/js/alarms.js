alert("foo");
/*global WildRydes _config*/
var WildRydes = window.WildRydes || {};

(function scopeWrapper($) {
  var addAlarmUrl = "/alarms/add";

  var authToken;
  WildRydes.authToken
    .then(function setAuthToken(token) {
      if (token) {
        authToken = token;
      } else {
        window.location.href = "/login.html";
      }
    })
    .catch(function handleTokenError(error) {
      alert(error);
      window.location.href = "/login.html";
    });

  function addAlarm(data) {
    $.ajax({
      method: "POST",
      url: _config.api.invokeUrl + addAlarmUrl,
      headers: {
        Authorization: authToken
      },
      data: JSON.stringify(data),
      contentType: "application/json",
      success: completeRequest,
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
        console.error(
          "Error requesting ride: ",
          textStatus,
          ", Details: ",
          errorThrown
        );
        console.error("Response: ", jqXHR.responseText);
        alert("An error occured adding new alarm:\n" + jqXHR.responseText);
      }
    });
  }

  function handleAddAlarm(event) {
    var data = {};
    data.alarmTime = $("#alarmTime").val();
    data.alarmName = $("#alarmName").val();
    event.preventDefault();
    addAlarm(data);
  }

  function completeRequest(result) {
    console.log("Response received from API: ", result);
    displayUpdate(result.alarmTime, result.alarmName);
  }

  function displayUpdate(alarmTime, alarmName) {
    $("#alarms").append($("<div>" + alarmTime + " - " + alarmName + "</div>"));
  }

  /*
     *  Event Handlers
     */

  $(function onDocReady() {
    $("#addAlarmForm").submit(handleAddAlarm);
  });

  // // Register click handler for #request button
  // $(function onDocReady() {
  //   $("#request").click(handleRequestClick);
  //   $(WildRydes.map).on("pickupChange", handlePickupChanged);

  //   WildRydes.authToken.then(function updateAuthMessage(token) {
  //     if (token) {
  //       displayUpdate(
  //         'You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.'
  //       );
  //       $(".authToken").text(token);
  //     }
  //   });

  //   if (!_config.api.invokeUrl) {
  //     $("#noApiMessage").show();
  //   }
  // });
})(jQuery);
