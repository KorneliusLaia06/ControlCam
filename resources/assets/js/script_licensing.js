let targetHID = localStorage.getItem('hid');
let license_key = localStorage.getItem('license_key');
let email = localStorage.getItem('email');
let package = localStorage.getItem('package');
$('#email_info').text(email);
$('#license_key_info').text(license_key);
$('#hardware_id_info').text(targetHID);
$('#package_info').text(package);
 

const apiUrl_getuserlist = 'http://db.vstream.asia/backend/subscriptions/all';
const apiUrl_invalidate = 'http://db.vstream.asia/backend/subscriptions';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNDE0MGNlLThlZjMtNGU2NS1hY2I0LTU1ZGE2ZmM0N2ZkOCIsImVtYWlsIjoiYWRtaW5AdnN0cmVhbS5hc2lhIiwiaWF0IjoxNjkzODQ1MjYxLCJleHAiOjE2OTY0MzcyNjF9.923aYBX8AV4lBMJ97EuIR_Qtf05nkoRU11xPTFNYBak'; // Replace with your Bearer token

function processUserData(apiUrl_getuserlist, apiUrl_invalidate, bearerToken, targetHID) {
  fetch(apiUrl_getuserlist, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      function isHIDExist(targetHID, data) {
        for (const item of data) {
          if (item.user && item.user.hid === targetHID) {
            return item.user.id;
          }
        }
        return null;
      }

      const hidExists = isHIDExist(targetHID, data);

      if (hidExists) {
        console.log(`HID ${hidExists} ditemukan dalam array data.`);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${bearerToken}`);

        var raw = JSON.stringify({
          "id": hidExists
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(apiUrl_invalidate, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      } else {
        console.log(`HID ${targetHID} tidak ditemukan dalam array data.`);
      }

    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}


var changes_license_form = document.getElementById("changes_license_form");


// Attach event listener to the form's submit event
changes_license_form.addEventListener("submit", async function(event) {
event.preventDefault(); // Prevent form submission

// Get the entered username and password
var emailInput = document.getElementById("email");
var licenseInput = document.getElementById("licensekey");
var submitButton = document.getElementById("submit");
var enteredEmail = emailInput.value;
var enteredLicense = licenseInput.value;

const myBody = {
    email: enteredEmail,
    key: enteredLicense,
    hid: localStorage.getItem("hid")
}
submitButton.disabled = true;

function failureAlert() {
    submitButton.disabled = false;
    // alert("Unable to connect with the server");
};

const response = await Promise.race([
    fetch('http://db.vstream.asia/backend/enterlk', {
        method: 'POST',
        body: JSON.stringify(myBody),
        headers: {
        'Content-Type': 'application/json'
        }
    }),
    new Promise((_, reject) =>
        setTimeout(() => reject(failureAlert()), 5000)
    )
]);
const res = await response.json();
if (res) {
    if (res.success) {
        // If valid, display success message
        processUserData(apiUrl_getuserlist, apiUrl_invalidate, bearerToken, targetHID);
        
        const mydata = {
          hid: localStorage.getItem("hid")
      }

        const response = await fetch('http://db.vstream.asia/backend/validateHid', {
            method: 'POST',
            body: JSON.stringify(mydata),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        const res = await response.json();
        if (res.success) {
            // If valid, display success message
            localStorage.setItem("package", res.response.pricingPackage.packageName);
            localStorage.setItem("license_key", myBody.key);
            localStorage.setItem("email", myBody.email);
            console.log(res.response.pricingPackage.packageName);

            // Usage
        setItemInLocalStorage('package', res.response.pricingPackage.packageName, function(error) {
          if (error) {
            console.error('Failed to set item in local storage:', error);
          } else {
            $('#submit').html('<i class="fas fa-spinner fa-spin">&nbsp;</i> Submit');
            setTimeout(function(){
              window.location.reload();
           }, 5000);
            // You can perform your desired action here
          }
        });

        }
    } else {
        $('#respons_error').text(res.response.message);
        // Clear the input fields
        emailInput.value = "";
        licenseInput.value = "";
    }
} else {
    failureAlert();
}
submitButton.disabled = false;
});


function setItemInLocalStorage(key, value, callback) {
  try {
    localStorage.setItem(key, value);
    callback(null); // Call the callback function with no error to indicate success
  } catch (error) {
    callback(error); // Call the callback function with an error if something goes wrong
  }
}

