

// const json_location = "src/data";
            const json_location = "resources/data";

           function getCameraList(groupIndex){
                const showModalAddCamera = $('#showModalAddCamera');

                var fs = require('fs');      

                // // Baca file JSON
                var data = fs.readFileSync(json_location + "/camera_list.json");

                // // Parse JSON menjadi objek JavaScript
                var myObject = JSON.parse(data);
                
                var containerVertTabsTab = document.getElementById("vert-tabs-tab");
                containerVertTabsTab.innerHTML ="";

                var containerTab = document.getElementById("vert-tabs-tabContent");
                containerTab.innerHTML ="";

                // const package = "Camera Connect Ultra (CCU)";
                const package = localStorage.getItem('package');
                console.log(package);
                let total_camera_license;
                switch (package){
                    case "Camera Connect Lite (CCL)":
                        // only access group 1 and 1 cam only
                        total_camera_license = 1;
                        showModalAddCamera.text("Add camera (0/1)");
                        $('#changeCameraGroup').addClass('d-none');
                        break;
                    case "Camera Connect Pro (CCP)":
                        // only access group 1 and 2 cam only
                        total_camera_license = 2;
                        showModalAddCamera.text("Add camera (0/2)");
                        $('#changeCameraGroup').addClass('d-none');
                        break;
                    case "Camera Connect Ultra (CCU)":
                        // able access all group and all cam
                        showModalAddCamera.text("Add camera (0/10)");
                        total_camera_license = 10;
                        break;
                }

                
                $('.showModalAddCamera').attr('disabled',false);

                for (let i = 0; i < myObject[groupIndex].length ; i++) {
                    var camera = myObject[groupIndex][i];
                    var total_camera_from_json = myObject[groupIndex].length;

                    switch (package){
                        case "Camera Connect Lite (CCL)":
                                if(total_camera_from_json >= total_camera_license){
                                    $('.showModalAddCamera').attr('disabled','disabled');
                                    showModalAddCamera.text("Add camera (1/1)");
                                } else {
                                    showModalAddCamera.text("Add camera (" + total_camera_from_json + "/1)");
                                }
                            break;
                        case "Camera Connect Pro (CCP)":
                            if(total_camera_from_json >= total_camera_license){
                                $('.showModalAddCamera').attr('disabled','disabled');
                                showModalAddCamera.text("Add camera (2/2)");
                            } else {
                                showModalAddCamera.text("Add camera (" + total_camera_from_json + "/2)");
                            }
                            break;
                        case "Camera Connect Ultra (CCU)":
                            if(total_camera_from_json >= total_camera_license){
                                $('.showModalAddCamera').attr('disabled','disabled');
                                showModalAddCamera.text("Add camera (10/10)");
                            } else {
                                showModalAddCamera.text("Add camera (" + total_camera_from_json + "/10)");
                            }
                            break;
                    }

                    // Buat elemen <a> baru
                    var link = document.createElement("a");
                    link.href = "#vert-tabs-" + camera.id;
                    link.setAttribute("data-link", camera.ip_address);
                    link.setAttribute("data-id", camera.id);
                    link.setAttribute("data-toggle", "pill");
                    if(i > total_camera_license-1){
                        link.className = "btn col-2 mb-1 mr-2 check-connection text-nowrap d-none";
                    } else {
                        link.className = "btn col-2 mb-1 mr-2 check-connection text-nowrap";
                    }
                    link.setAttribute("role", "tab");
                    link.setAttribute("aria-controls", "vert-tabs-1");
                    link.setAttribute("aria-selected", "false");
                    link.textContent = camera.camera_name;
                    
                    // Tambahkan elemen <a> ke dalam kontainer
                    containerVertTabsTab.appendChild(link);


                    var tabPane = document.createElement("div");
                    tabPane.className = "tab-pane text-left fade";
                    tabPane.id = "vert-tabs-" + camera.id;
                    tabPane.setAttribute("role", "tabpanel");
                    tabPane.setAttribute("aria-labelledby", "vert-tabs-" + camera.id + "-tab");
                    
                    var formGroup1 = document.createElement("div");
                    formGroup1.className = "form-group row";

                    var label1 = document.createElement("label");
                    label1.setAttribute("for", "camera_name");
                    label1.className = "col-sm-4 col-form-label";
                    label1.textContent = "Camera Name";

                    var div1 = document.createElement("div");
                    div1.className = "col-sm-8";

                    var hiddenInput = document.createElement("input");
                    hiddenInput.type = "hidden";
                    hiddenInput.id = "value_id_" + camera.id;
                    hiddenInput.className = "form-control bg-white";
                    hiddenInput.value = camera.id;

                    var cameraNameInput = document.createElement("input");
                    cameraNameInput.type = "text";
                    cameraNameInput.id = "value_camera_name_" + camera.id;
                    cameraNameInput.className = "form-control bg-white";
                    cameraNameInput.value =  camera.camera_name;
                    cameraNameInput.disabled = true;

                    div1.appendChild(hiddenInput);
                    div1.appendChild(cameraNameInput);
                    formGroup1.appendChild(label1);
                    formGroup1.appendChild(div1);
                    tabPane.appendChild(formGroup1);

                    var formGroup2 = document.createElement("div");
                    formGroup2.className = "form-group row";

                    var label2 = document.createElement("label");
                    label2.setAttribute("for", "ip_address");
                    label2.className = "col-sm-4 col-form-label";
                    label2.textContent = "IP Address";

                    var div2 = document.createElement("div");
                    div2.className = "col-sm-8";

                    var ipAddressInput = document.createElement("input");
                    ipAddressInput.type = "text";
                    ipAddressInput.id = "value_ip_address_" + camera.id;
                    ipAddressInput.className = "form-control bg-white";
                    ipAddressInput.value = camera.ip_address;
                    ipAddressInput.disabled = true;

                    div2.appendChild(ipAddressInput);
                    formGroup2.appendChild(label2);
                    formGroup2.appendChild(div2);
                    tabPane.appendChild(formGroup2);

                    var formGroup4 = document.createElement("div");
                    formGroup4.className = "form-group row";

                    var label4 = document.createElement("label");
                    label4.setAttribute("for", "connection");
                    label4.className = "col-sm-4 col-form-label";
                    label4.textContent = "Connection";

                    var div4 = document.createElement("div");
                    div4.className = " col-sm-8";
                    div4.id = "camera_status_" + camera.id;
                    div4.disabled = true;

                    var cameraStatus = document.createElement("input");
                    cameraStatus.type = "text";
                    cameraStatus.className = "form-control is-invalid bg-white";
                    cameraStatus.value = "Disconnected";
                    cameraStatus.readOnly = true,
                    div4.appendChild(cameraStatus);

                    formGroup4.appendChild(label4);
                    formGroup4.appendChild(div4);
                    tabPane.appendChild(formGroup4);

                    var formGroup5 = document.createElement("div");
                    formGroup5.className = "form-group row";

                    var label5 = document.createElement("label");
                    label5.setAttribute("for", "keyboard_mapping");
                    label5.className = "col-sm-4 col-form-label";
                    label5.textContent = "Keyboard Mapping";

                    var div5 = document.createElement("div");
                    div5.className = "col-sm-8";

                    var inputGroup = document.createElement("div");
                    inputGroup.className = "input-group";
                    inputGroup.id = "camera_status_" + camera.id;

                    var keyboardMappingInput = document.createElement("input");
                    keyboardMappingInput.type = "text";
                    keyboardMappingInput.id = "value_keyboard_mapping_" + camera.id;
                    keyboardMappingInput.className = "form-control bg-white d-none";
                    keyboardMappingInput.value = camera.keyboard_mapping;
                    keyboardMappingInput.disabled = true;

                    var keyboardCodeInput = document.createElement("input");
                    keyboardCodeInput.type = "text";
                    keyboardCodeInput.id = "value_keyboard_code_" + camera.id;
                    keyboardCodeInput.className = "form-control bg-white d-none";
                    keyboardCodeInput.value = camera.keyboard_code;
                    keyboardCodeInput.disabled = true;

                    var combine_keyboardMappingInput_keyboardCodeInput = document.createElement("input");
                    combine_keyboardMappingInput_keyboardCodeInput.type = "text";
                    combine_keyboardMappingInput_keyboardCodeInput.className = "form-control bg-white";
                    combine_keyboardMappingInput_keyboardCodeInput.value = camera.keyboard_mapping + " (" + camera.keyboard_code +")";
                    combine_keyboardMappingInput_keyboardCodeInput.disabled = true;

                    var div6 = document.createElement("div");
                    div6.className = "col-sm-8";


                    inputGroup.appendChild(keyboardMappingInput);
                    inputGroup.appendChild(keyboardCodeInput);
                    inputGroup.appendChild(combine_keyboardMappingInput_keyboardCodeInput);

                    div5.appendChild(inputGroup);
                    formGroup5.appendChild(label5);
                    formGroup5.appendChild(div5);
                    tabPane.appendChild(formGroup5);

                    var borderDiv = document.createElement("div");
                    borderDiv.className = "mt-5 mb-3";
                    

                    tabPane.appendChild(borderDiv);

                    var editLink = document.createElement("a");
                    editLink.className = "btn btn-edit float-right";
                    editLink.setAttribute("data-href", "#");
                    editLink.setAttribute("data-toggle", "modal");
                    editLink.setAttribute("data-target", "#modal-editCamera");
                    editLink.setAttribute("data-id", camera.id);
                    editLink.textContent = "EDIT";

                    var deleteLink = document.createElement("a");
                    deleteLink.className = "btn btn-delete float-right mr-1";
                    deleteLink.setAttribute("data-href", "#");
                    deleteLink.setAttribute("data-toggle", "modal");
                    deleteLink.setAttribute("data-target", "#modal-deleteCamera");
                    deleteLink.setAttribute("data-text", "Are you sure you want to delete?&nbsp;&nbsp; <span class='badge badge-danger'>" + camera.camera_name + "</span><p class='text-danger font-italic'>*This camera will be permanently deleted</p>");
                    deleteLink.setAttribute("data-id", camera.id);
                    deleteLink.textContent = "DELETE";

                    tabPane.appendChild(editLink);
                    tabPane.appendChild(deleteLink);


                    // insert tabPane into ContainerTab
                    var containerTab = document.getElementById("vert-tabs-tabContent");
                    containerTab.appendChild(tabPane);

                    if (i === 4) {
                        // Create a new row for every 5th button
                        const breakColumn = document.createElement('div');
                        breakColumn.className = 'w-100';
                        containerVertTabsTab.appendChild(breakColumn);
                    }

                }
                

                // Create the tab content element
                var tabContent = document.createElement("div");
                tabContent.classList.add("tab-pane", "text-left", "active", "text-center", "py-4");
                tabContent.id = "vert-tabs-default";
                tabContent.role = "tabpanel";
                tabContent.setAttribute("aria-labelledby", "vert-tabs-default-tab");

                // Create the span element
                var spanElement = document.createElement("span");
                spanElement.textContent = "please select the button on the top to view the camera details";

                // Append the span element to the tab content
                tabContent.appendChild(spanElement);

                // Get the container tab element
                var containerTab = document.getElementById("vert-tabs-tabContent");

                // Append the tab content to the container tab
                containerTab.appendChild(tabContent);
           }

            jQuery(document).ready(function() {
                
                getCameraList(0);

                $('#changeCameraGroup').change(function() {
                    //Use $option (with the "$") to see that the variable is a jQuery object
                    var $option = $(this).find('option:selected');
                    //Added with the EDIT
                    var value = $option.val();//to get content of "value" attrib

                    getCameraList(value);
                });

                

                //checking camera on or off
                $(document).on('click', '.check-connection', function() {
                    $('[href^="#vert-tabs-"]').removeClass('active'); // Remove the class from all buttons
                    $(this).addClass('active'); // Add the class to the clicked button
                    var link = "http://" + $(this).data('link');
                    var id = $(this).data('id');
                    const xhr = new XMLHttpRequest();
                    xhr.open(
                        "GET",
                        link + "/-wvhttp-01-/info.cgi?item=f.tally"
                    );
                    xhr.send();
                    xhr.onload = () => {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            const responseResult = xhr.responseText;

                            const startIndex = responseResult.indexOf('f.tally:=');
                            const endIndex = responseResult.indexOf('\n', startIndex);
                            const fTallyModeValue = responseResult.slice(startIndex + 9, endIndex);

                            
                            if (fTallyModeValue != "") {
                                $('#camera_status_'+id).html('<input type="text" class="form-control is-valid bg-white" id="inputSuccess" value="Connected" readonly>')
                            } else {
                                $('#camera_status_'+id).html('<input type="text" class="form-control is-invalid bg-white" id="inputError" value="Disconnected" readonly>')
                            }
                           
                        } else {
                            $('#camera_status_'+id).html('<input type="text" class="form-control is-invalid bg-white" id="inputError" value="Disconnected" readonly>')
                        }
                    };
                });
                //checking camera on or off

                //submit data to add camera    
                $('#addCameraBtn').click(function() {

                    var groupIndex = $('#changeCameraGroup').val();
                    var camera_name = $('#add_cameraName').val();
                    var ip_address = $('#add_ipAddress').val();
                    var keyboard_mapping = $('#add_keyboardMapping').val();
                    var keyboard_code = $('#add_keyboardCode').val();

                    var timestampId = new Date().getTime();
                   
                    var fs = require('fs');        

                    // // Baca file JSON
                    var data = fs.readFileSync(json_location + "/camera_list.json");

                    // // Parse JSON menjadi objek JavaScript
                    var camera_list = JSON.parse(data);


                    // Tambahkan data baru ke array
                    var newData = {
                      "id": timestampId,
                      "camera_name": camera_name,
                      "ip_address": ip_address,
                      "keyboard_mapping": keyboard_mapping,
                      "keyboard_code": keyboard_code,
                    };

                    camera_list[groupIndex].push(newData);
                    
                    // re-input new array to file json
                    fs.writeFile(json_location + "/camera_list.json", JSON.stringify(camera_list, null, 2), function(err) {
                        if (err) {
                            notification('info','Failed to Add Camera');
                            return;
                            // console.error(err);
                        }
                        getCameraList(groupIndex);
                        generatepreset(groupIndex,timestampId);
                        notification('success','Camera Successfully Added');
                        // console.log("Data berhasil disimpan ke file JSON.");
                    });
                    // re-input new array to file json

                });
                //submit data to add camera    

                function generatepreset(groupIndex,timestampId){
                    var fs = require('fs');        

                    // Baca file JSON
                    var data = fs.readFileSync(json_location + "/group" + groupIndex + "_presets.json");

                    // Parse JSON menjadi objek JavaScript
                    var generate_preset = JSON.parse(data);

                    var newData = [];

                    for (let i = 1; i <= 100; i++) {
                        if (i === 100) {
                            newData.push({
                              "id_camera": timestampId,
                              "id_preset": i,
                              "name_button": "HOME", // Set name_button to "home"
                              "name_preset": "P" + i,
                              "disabled": true
                            });
                          } else {
                            newData.push({
                              "id_camera": timestampId,
                              "id_preset": i,
                              "name_button": "P" + i,
                              "name_preset": "P" + i,
                              "disabled": true
                            });
                          }
                    }

                    generate_preset.push(newData);

                    // re-input new array to file json
                    fs.writeFile(json_location + "/group" + groupIndex + "_presets.json", JSON.stringify(generate_preset, null, 2), function(err) {
                        if (err) {
                            notification('info','Failed to Add Camera');
                            return;
                            console.error(err);
                        }
                        // console.log("Data berhasil disimpan ke file JSON.");
                    });
                    // re-input new array to file json
                }


                //funtion will active when detect #modal-deleteCamera opened    
                $('#modal-deleteCamera').on('show.bs.modal', function(e) {
                    var text = $(e.relatedTarget).data('text');
                    var id = $(e.relatedTarget).data('id');

                    $('#text-confirmation').html(text);
                    $("#deleteCameraBtn").attr("data-id", id);
                    $("#idDelete").val(id);
                });
                //funtion will active when detect #modal-deleteCamera opened    


                //funtion will active when detect #modal-editCamera opened
                $('#modal-editCamera').on('show.bs.modal', function(e) {
                    
                    var id = $(e.relatedTarget).data('id');
                    
                    var camera_name = $('#value_camera_name_'+id).val();
                    var ip_address = $('#value_ip_address_'+id).val();
                    var keyboard_mapping = $('#value_keyboard_mapping_'+id).val();
                    var keyboard_code = $('#value_keyboard_code_'+id).val();

                    $('#edit_camera_id').val(id);
                    $('#edit_camera_name').val(camera_name);
                    $('#edit_ip_address').val(ip_address);
                    $('#edit_keyboard_mapping').val(keyboard_mapping);
                    $('#edit_keyboard_code').val(keyboard_code);
                });
                //funtion will active when detect #modal-editCamera opened

                
                //for mapping keyboard - modal add
                $(document).on('keydown', function(event) {
                    if ($('.inputKeyCode').is(':checked')) {
                        var keyCode = event.keyCode || event.which;
                        var key = event.key;
                        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90)) {
                            $('#add_keyboardMapping').val(key.toUpperCase());
                            $('#add_keyboardCode').val(keyCode);
                        }
                    }
                });
                //for mapping keyboard - modal add


                //for mapping keyboard - modal edit
                $(document).on('keydown', function(event) {
                    if ($('.inputKeyCodeEditModal').is(':checked')) {
                        var keyCode = event.keyCode || event.which;
                        var key = event.key;
                        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90)) {
                            $('#edit_keyboard_mapping').val(key.toUpperCase());
                            $('#edit_keyboard_code').val(keyCode);
                        }
                    }
                });
                //for mapping keyboard - modal edit

                //submit data to delete camera  
                $('#deleteCameraBtn').click(function() {
                    var groupIndex = $("#changeCameraGroup").val();
                    var id = $("#idDelete").val();
                    var fs = require('fs');        

                    // read file JSON
                    var data = fs.readFileSync(json_location + "/camera_list.json");

                    /// Parse JSON to objek JavaScript
                    var camera_list = JSON.parse(data);

                    // find data based on id from #valueDelete
                    var index = camera_list[groupIndex].findIndex(obj => obj.id == id);

                    if (index !== -1) {
                        // delete data based on index value that already filtered
                        camera_list[groupIndex].splice(index, 1);

                        // re-input new array to file json
                        fs.writeFile(json_location + "/camera_list.json", JSON.stringify(camera_list, null, 2), function(err) {
                            if (err) {
                                notification('info','Failed to Delete Camera');
                                return;
                                // console.error(err);
                            }
                            deletepreset(groupIndex,id);
                            getCameraList(groupIndex);
                            notification('info','Camera Successfully Deleted');
                            // console.log("Data berhasil disimpan ke file JSON.");
                        });
                        // re-input new array to file json
                        
                    } else {
                        notification('info','No Matching Data Found for the ID');
                    }
                });
                //submit data to delete camera  

                function deletepreset(groupIndex,id){
                    const fs = require('fs');

                    // Read the JSON file
                    fs.readFile(json_location + "/group" + groupIndex + "_presets.json", 'utf8', (err, data) => {
                    if (err) {
                        console.error('Error reading file:', err);
                        return;
                    }

                    try {
                        // Parse the JSON data
                        const jsonData = JSON.parse(data);

                        // Remove the array with id_camera 1687529168499
                        const filteredData = jsonData.map(arr => {
                        return arr.filter(obj => obj.id_camera != id);
                        });

                        // Remove empty arrays from the filtered data
                        const nonEmptyData = filteredData.filter(arr => arr.length > 0);

                        // Convert the non-empty data back to JSON
                        const updatedJsonData = JSON.stringify(nonEmptyData, null, 2);

                        // Write the updated JSON back to the file
                        fs.writeFile(json_location + "/group" + groupIndex + "_presets.json", updatedJsonData, 'utf8', err => {
                        if (err) {
                            console.error('Error writing file:', err);
                            return;
                        }
                        console.log('JSON file updated successfully.' + id);
                        });
                    } catch (err) {
                        console.error('Error parsing JSON:', err);
                    }
                });

                }

            });
           
                          


             //submit data to edit camera  
             jQuery(document).on('click', '#editCameraBtn', function() {
                var id = $("#edit_camera_id").val();
                var groupIndex = $("#changeCameraGroup").val();
                var camera_name = $('#edit_camera_name').val();
                var ip_address = $('#edit_ip_address').val();
                var keyboard_mapping = $('#edit_keyboard_mapping').val();
                var keyboard_code = $('#edit_keyboard_code').val();

                var fs = require('fs');        

                // read file JSON
                var data = fs.readFileSync(json_location + "/camera_list.json");

                /// Parse JSON to objek JavaScript
                var camera_list = JSON.parse(data);

                // find data based on id from #valueDelete
                var index = camera_list[groupIndex].findIndex(obj => obj.id == id);

                if (index !== -1) {

                    camera_list[groupIndex][index].camera_name = camera_name;
                    camera_list[groupIndex][index].ip_address = ip_address;
                    camera_list[groupIndex][index].keyboard_mapping = keyboard_mapping;
                    camera_list[groupIndex][index].keyboard_code = keyboard_code;

                    // update array to file json
                    fs.writeFile(json_location + "/camera_list.json", JSON.stringify(camera_list, null, 2), function(err) {
                        if (err) {
                            notification('info','Failed to Update Camera');
                            return;
                            // console.error(err);
                        }
                        getCameraList(groupIndex);
                        notification('info','Camera Successfully Updated');
                        // console.log("Data berhasil disimpan ke file JSON.");
                    });
                    // update array to file json
                    
                } else {
                    notification('info','No Matching Data Found for the ID');
                }
            });
            //submit data to edit camera 

            // sidebar toggle
            var sidebarToggle = $('#sidebarToggle');
            
            sidebarToggle.click(function() {
                var icon = sidebarToggle.find('i');
                
                if (icon.hasClass('fa-arrow-left')) {
                    icon.removeClass('fa-arrow-left').addClass('fa-arrow-right');
                } else {
                    icon.removeClass('fa-arrow-right').addClass('fa-arrow-left');
                }
            });
            // sidebar toggle

            // sweetalert notification
            var Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000
            });

            function notification(icon,title){
                Toast.fire({
                    position: 'top-end',
                    icon: icon,
                    title: title,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            // sweetalert notification