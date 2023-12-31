//get data from local storage
let targetHID = localStorage.getItem('hid');
let license_key = localStorage.getItem('license_key');
let email = localStorage.getItem('email');
let package = localStorage.getItem('package');
let version = localStorage.getItem('version');
$('#email_info').text(email);
$('#license_key_info').text(license_key);
$('#hardware_id_info').text(targetHID);
$('#package_info').text(package);
//get data from local storage

//get version app
const { ipcRenderer } = require('electron');
document.addEventListener('DOMContentLoaded', () => {
  // Kirim permintaan ke main process untuk mendapatkan versi aplikasi
  const appVersion = ipcRenderer.sendSync('get-app-version');
  $('#version_info').text(appVersion);
});
//get version app

 
var emailInput = document.getElementById("email");
var licenseInput = document.getElementById("licensekey");
var submitButton = document.getElementById("submit");

const apiUrl_getuserlist = 'http://db.vstream.asia/backend/subscriptions/all';
const apiUrl_invalidate = 'http://db.vstream.asia/backend/subscriptions';
const apiUrl_enterlk = 'http://db.vstream.asia/backend/enterlk';
const apiUrl_validatehid = 'http://db.vstream.asia/backend/validateHid';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNDE0MGNlLThlZjMtNGU2NS1hY2I0LTU1ZGE2ZmM0N2ZkOCIsImVtYWlsIjoiYWRtaW5AdnN0cmVhbS5hc2lhIiwiaWF0IjoxNjk0MzUyNjQ3LCJleHAiOjE2OTY5NDQ2NDd9.-iWUnSUf3yZRvcobK3cBdTUWdanqsC2RKA6o82yNWAg'; // Replace with your Bearer token

function show_loading(){
  $('#submit').html('<i class="fas fa-spinner fa-spin">&nbsp;</i> Submit');
}

function hide_loading(){
  $('#submit').html('Submit');
}

// Attach event listener to the form's submit event
var changes_license_form = document.getElementById("changes_license_form");
changes_license_form.addEventListener("submit", function(event) {
event.preventDefault(); // Prevent form submission

//check new license
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

  //check if user exists
  function isUserExists(emailInput, licenseInput, data) {
    for (const item of data) {
      if (
        item.user &&
        item.user.email === emailInput.value &&
        item.key === licenseInput.value
      ) {
        return item.user.email;
      }
    }
    return null;
  }
  const userExists = isUserExists(emailInput, licenseInput, data);
  //check if user exists

  //check if license alreay used
  function isLicenseIsUsed(emailInput, targetHID, data) {
    for (const item of data) {
      if (
        item.user &&
        item.user.email === emailInput.value &&
        item.user.hid === targetHID
      ) {
        return item.user.hid;
      }
    }
    return null;
  }
  const licenseUsed = isLicenseIsUsed(emailInput, targetHID, data); 
  //check if license alreay used

  //check HID exist
  function isHIDExist(targetHID, data) {
    for (const item of data) {
      if (item.user && item.user.hid === targetHID) {
        return item.user.id;
      }
    }
    return null;
  }
  const hidExists = isHIDExist(targetHID, data);
  //check HID exist


  show_loading();
  if (userExists === null) {
    $('#response_error').text("Invalid email address or license key");
    hide_loading();
    // console.log("The variable is null.");
  } else {
    if(licenseUsed === null){
      if(hidExists === null){
        
      } else {
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
        .then(response => {
          if (response.ok) {
            next_step();
          } else {
            console.log("Gagal: " + response.status); // Ubah pesan ini sesuai kebutuhan
          }
          return response.text();
        })
        .catch(error => console.log('error', error));
      }
    } else {
      $('#response_error').text("License has already been used");
    }
    // console.log("The variable is not null.");
  }
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
//check new license
});

function failureAlert() {
  submitButton.disabled = false;
  // alert("Unable to connect with the server");
};

async function next_step()
{
// Get the entered username and password

var enteredEmail = emailInput.value;
var enteredLicense = licenseInput.value;

const myBody = {
    email: enteredEmail,
    key: enteredLicense,
    hid: localStorage.getItem("hid")
}
submitButton.disabled = true;


const response_lk = await Promise.race([
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
const res_lk = await response_lk.json();
if (res_lk) {
    if (res_lk.success) {
      const mydata = {
          hid: localStorage.getItem("hid")
      }

        const response_validate = await fetch('http://db.vstream.asia/backend/validateHid', {
            method: 'POST',
            body: JSON.stringify(mydata),
            headers: {
            'Content-Type': 'application/json'
            }
        });

        const res_validate = await response_validate.json();
        if (res_validate.success) {
            // If valid, display success message
            localStorage.setItem("email", res_lk.response.user.email);
            localStorage.setItem("license_key", res_validate.response.key);
            localStorage.setItem("package", res_validate.response.pricingPackage.packageName);
            notification('info','Package has been successfully changed');
            setTimeout(function(){
              window.location.reload();
           }, 2000);
        } else {
          $('#respons_error').text("Validation failed, please try again");
        }
    } else {
        $('#respons_error').text(res_validate.response.message);
        // Clear the input fields
        emailInput.value = "";
        licenseInput.value = "";
    }
} else {
    failureAlert();
}
submitButton.disabled = false;
}

