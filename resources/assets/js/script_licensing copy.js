let targetHID = localStorage.getItem('hid');
let license_key = localStorage.getItem('license_key');
let email = localStorage.getItem('email');
let package = localStorage.getItem('package');
$('#email_info').text(email);
$('#license_key_info').text(license_key);
$('#hardware_id_info').text(targetHID);
$('#package_info').text(package);
 
var emailInput = document.getElementById("email");
var licenseInput = document.getElementById("licensekey");
var submitButton = document.getElementById("submit");

const apiUrl_getuserlist = 'http://db.vstream.asia/backend/subscriptions/all';
const apiUrl_invalidate = 'http://db.vstream.asia/backend/subscriptions';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNDE0MGNlLThlZjMtNGU2NS1hY2I0LTU1ZGE2ZmM0N2ZkOCIsImVtYWlsIjoiYWRtaW5AdnN0cmVhbS5hc2lhIiwiaWF0IjoxNjk0MzUyNjQ3LCJleHAiOjE2OTY5NDQ2NDd9.-iWUnSUf3yZRvcobK3cBdTUWdanqsC2RKA6o82yNWAg'; // Replace with your Bearer token

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

      function isHIDExist(emailInput, licenseInput, data) {
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

      const hidExists = isHIDExist(emailInput, licenseInput, data);
      console.log(hidExists);

      if (hidExists) {
        console.log(`HID ${hidExists} ditemukan dalam array data.`);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${bearerToken}`);

        var raw = JSON.stringify({
          "id": targetHID
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
            console.log("Berhasil"); // Ubah pesan ini sesuai kebutuhan
            next_step();
          } else {
            console.log("Gagal: " + response.status); // Ubah pesan ini sesuai kebutuhan
          }
          return response.text();
        })
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
changes_license_form.addEventListener("submit", function(event) {
event.preventDefault(); // Prevent form submission


processUserData(apiUrl_getuserlist, apiUrl_invalidate, bearerToken, targetHID);

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
$('#submit').html('<i class="fas fa-spinner fa-spin">&nbsp;</i> Submit');
const res_lk = await response_lk.json();
if (res_lk) {
    if (res_lk.success) {
        // If valid, display success message
        
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
            // window.location.href = 'starter_page.html';
        } else {
          console.log("validate failed");
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
