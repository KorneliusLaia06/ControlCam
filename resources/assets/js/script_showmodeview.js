 // seleksi elemen video
let x = 0;
let y = 0;
let z = 0;
let default_value_focus_near = 0;
let default_value_focus_far = 0;
let default_value_zoom_in = 0;
let default_value_zoom_out = 0;

// const json_location = "src/data";
const json_location = "resources/data";

let isFeaturePrevTallyActive = false;
let interval_getCameraStatus;

const moveleftup_button = document.getElementById('moveleftup_button');
let isButtonPressed_moveleftup = false;

const moveup_button = document.getElementById('moveup_button');
let isButtonPressed_moveup = false;

const moverightup_button = document.getElementById('moverightup_button');
let isButtonPressed_moverightup = false;

const moveleftdown_button = document.getElementById('moveleftdown_button');
let isButtonPressed_moveleftdown = false;

const moverightdown_button = document.getElementById('moverightdown_button');
let isButtonPressed_moverightdown = false;

const movedown_button = document.getElementById('movedown_button');
let isButtonPressed_movedown = false;


const moveleft_button = document.getElementById('moveleft_button');
let isButtonPressed_moveleft = false;

const moveright_button = document.getElementById('moveright_button');
let isButtonPressed_moveright = false;

const zoomin_button = document.getElementById('zoomin_button');
let isButtonPressed_movezoomin = false;

const zoomout_button = document.getElementById('zoomout_button');
let isButtonPressed_movezoomout = false;

const gainup_button = document.getElementById('gainup_button');
let isButtonPressed_gainup = false;

const gaindown_button = document.getElementById('gaindown_button');
let isButtonPressed_gaindown = false;

const irisup_button = document.getElementById('irisup_button');
let isButtonPressed_irisup = false;

const irisdown_button = document.getElementById('irisdown_button');
let isButtonPressed_irisdown = false;

const focus_button = document.getElementById('btn_one_shot_af');

const home_button = document.getElementById('home_button');

const near_button = document.getElementById('near_button');
let isButtonPressed_near = false;

const far_button = document.getElementById('far_button');
let isButtonPressed_far = false;

const awb_button = document.getElementById('btn_awb');

const wbCalibration_button = document.getElementById('wbCalibration_button');


//detect mobile or desktop browser
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // alert("mobile");

    moveup_button.addEventListener('touchstart', () => {
        isButtonPressed_moveup = true;
        trigger_moveup();
    });
    moveup_button.addEventListener('touchend', () => {
        isButtonPressed_moveup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
    });

    
    movedown_button.addEventListener('touchstart', () => {
        isButtonPressed_movedown = true;
        trigger_movedown();
    });
    movedown_button.addEventListener('touchend', () => {
        isButtonPressed_movedown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
    });


    moveleft_button.addEventListener('touchstart', () => {
        isButtonPressed_moveleft = true;
        trigger_moveleft();
    });
    moveleft_button.addEventListener('touchend', () => {
        isButtonPressed_moveleft = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
    });


    moveright_button.addEventListener('touchstart', () => {
        isButtonPressed_moveright = true;
        trigger_moveright();
    });
    moveright_button.addEventListener('touchend', () => {
    isButtonPressed_moveright = false;
    let target_ip = $('#target').val();
    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
    });


    zoomin_button.addEventListener('touchstart', () => {
        isButtonPressed_movezoomin = true;
        trigger_zoomin();
    });
    zoomin_button.addEventListener('touchend', () => {
        isButtonPressed_movezoomin = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?zoom=stop");
    });


    zoomout_button.addEventListener('touchstart', () => {
        isButtonPressed_movezoomout = true;
        trigger_zoomout();
    });
    zoomout_button.addEventListener('touchend', () => {
        isButtonPressed_movezoomout = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?zoom=stop");
    });

    near_button.addEventListener('touchstart', () => {
        isButtonPressed_near = true;
        trigger_near();
    });
    near_button.addEventListener('touchend', () => {
        isButtonPressed_near = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=stop");
    });

    far_button.addEventListener('touchstart', () => {
        isButtonPressed_near = true;
        trigger_far();
    });
    far_button.addEventListener('touchend', () => {
        isButtonPressed_far = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=stop");
    });

    focus_button.addEventListener('touchstart', () => {
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus=auto");
    });

    home_button.addEventListener('touchstart', () => {
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=0&tilt=0");
    });

    awb_button.addEventListener('touchstart', () => {
        let target_ip = $('#target').val();
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb=auto");
    });

    wbCalibration_button.addEventListener('touchstart', () => {
        let target_ip = $('#target').val();
        let value = $('#changeWhiteBalanceMode').val();
        if(value == "wb_a"){
            $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb.action=one_shot_a");
        } else if (value == "wb_b"){
            $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb.action=one_shot_b");
        }
    });

} else {
//    alert("desktop");

    moveleftup_button.addEventListener('mousedown', () => {
        isButtonPressed_moveleftup = true;
        trigger_moveleftup();
    });
    moveleftup_button.addEventListener('mouseup', () => {
        isButtonPressed_moveleftup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });
    moveleftup_button.addEventListener('mouseleave', () => {
        isButtonPressed_moveleftup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });

    moveup_button.addEventListener('mousedown', () => {
        isButtonPressed_moveup = true;
        trigger_moveup();
    });
    moveup_button.addEventListener('mouseup', () => {
        isButtonPressed_moveup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
    });
    moveup_button.addEventListener('mouseleave', () => {
        isButtonPressed_moveup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
    });

    moverightup_button.addEventListener('mousedown', () => {
        isButtonPressed_moverightup = true;
        trigger_moverightup();
    });
    moverightup_button.addEventListener('mouseup', () => {
        isButtonPressed_moverightup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });
    moverightup_button.addEventListener('mouseleave', () => {
        isButtonPressed_moverightup = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });


    moveleftdown_button.addEventListener('mousedown', () => {
        isButtonPressed_moveleftdown = true;
        trigger_moveleftdown();
    });
    moveleftdown_button.addEventListener('mouseup', () => {
        isButtonPressed_moveleftdown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });
    moveleftdown_button.addEventListener('mouseleave', () => {
        isButtonPressed_moveleftdown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });


    moveleftdown_button.addEventListener('mousedown', () => {
        isButtonPressed_moveleftdown = true;
        trigger_moveleftdown();
    });
    moveleftdown_button.addEventListener('mouseup', () => {
        isButtonPressed_moveleftdown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });
    moveleftdown_button.addEventListener('mouseleave', () => {
        isButtonPressed_moveleftdown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });


    movedown_button.addEventListener('mousedown', () => {
        isButtonPressed_movedown = true;
        trigger_movedown();
    });
    movedown_button.addEventListener('mouseup', () => {
        isButtonPressed_movedown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
    });
    movedown_button.addEventListener('mouseleave', () => {
        isButtonPressed_movedown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
    });

    moverightdown_button.addEventListener('mousedown', () => {
        isButtonPressed_moverightdown = true;
        trigger_moverightdown();
    });
    moverightdown_button.addEventListener('mouseup', () => {
        isButtonPressed_moverightdown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });
    moverightdown_button.addEventListener('mouseleave', () => {
        isButtonPressed_moverightdown = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=stop");
    });


    moveleft_button.addEventListener('mousedown', () => {
        isButtonPressed_moveleft = true;
        trigger_moveleft();
    });
    moveleft_button.addEventListener('mouseup', () => {
        isButtonPressed_moveleft = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
    });
    moveleft_button.addEventListener('mouseleave', () => {
        isButtonPressed_moveleft = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
    });


    moveright_button.addEventListener('mousedown', () => {
        isButtonPressed_moveright = true;
        trigger_moveright();
    });
    moveright_button.addEventListener('mouseup', () => {
        isButtonPressed_moveright = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
    });
    moveright_button.addEventListener('mouseleave', () => {
        isButtonPressed_moveright = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
    });


    zoomin_button.addEventListener('mousedown', () => {
        isButtonPressed_movezoomin = true;
        trigger_zoomin();
    });
    zoomin_button.addEventListener('mouseup', () => {
        isButtonPressed_movezoomin = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&zoom=stop");
    });
    zoomin_button.addEventListener('mouseleave', () => {
        isButtonPressed_movezoomin = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&zoom=stop");
    });


    zoomout_button.addEventListener('mousedown', () => {
        isButtonPressed_movezoomout = true;
        trigger_zoomout();
    });
    zoomout_button.addEventListener('mouseup', () => {
        isButtonPressed_movezoomout = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&zoom=stop");
    });
    zoomout_button.addEventListener('mouseleave', () => {
        isButtonPressed_movezoomout = false;
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&zoom=stop");
    });

    gainup_button.addEventListener('mousedown', () => {
        isButtonPressed_gainup = true;
        trigger_gainup();
    });
    gainup_button.addEventListener('mouseup', () => {
        isButtonPressed_gainup = false;
    });

    gaindown_button.addEventListener('mousedown', () => {
        isButtonPressed_gaindown = true;
        trigger_gaindown();
    });
    gaindown_button.addEventListener('mouseup', () => {
        isButtonPressed_gaindown = false;
    });

    irisup_button.addEventListener('mousedown', () => {
        isButtonPressed_irisup = true;
        trigger_irisup();
    });
    irisup_button.addEventListener('mouseup', () => {
        isButtonPressed_irisup = false;
    });

    irisdown_button.addEventListener('mousedown', () => {
        isButtonPressed_irisdown = true;
        trigger_irisdown();
    });
    irisdown_button.addEventListener('mouseup', () => {
        isButtonPressed_irisdown = false;
    });

    near_button.addEventListener('mousedown', () => {
        isButtonPressed_near = true;
        trigger_near();
    });
    near_button.addEventListener('mouseup', () => {
        let target_ip = $('#target').val();
        isButtonPressed_near = false;
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=stop");
    });

    far_button.addEventListener('mousedown', () => {
        isButtonPressed_far = true;
        trigger_far();
    });
    far_button.addEventListener('mouseup', () => {
        let target_ip = $('#target').val();
        isButtonPressed_far = false;
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=stop");
    });



    focus_button.addEventListener('mousedown', () => {
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus=auto");

        //delay caling function getStatusWhiteBalanceMode() to get data more acurate
        setTimeout(() => {
            getStatusAutoFocus(target_ip);
        }, 500);
    });

    awb_button.addEventListener('mousedown', () => {
        let target_ip = $('#target').val();
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb=auto");

        //delay caling function getStatusWhiteBalanceMode() to get data more acurate
        setTimeout(() => {
            getStatusWhiteBalanceMode(target_ip);
        }, 500);
    });

    wbCalibration_button.addEventListener('mousedown', () => {
        let target_ip = $('#target').val();
        let value = $('#changeWhiteBalanceMode').val();
        if(value == "wb_a"){
            $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb.action=one_shot_a");
        } else if (value == "wb_b"){
            $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb.action=one_shot_b");
        }
    });

    home_button.addEventListener('mousedown', () => {
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=0&tilt=0");
    });
}
//detect mobile or desktop browser

function trigger_moveleftup() {
    if (isButtonPressed_moveleftup) {
        let pt_speed = $('#direction_speed').val();
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=left&pan.speed.dir=" + pt_speed +"&tilt=up&tilt.speed.dir=" + pt_speed);
        setTimeout(trigger_moveleftup, 500);
    }
}

function trigger_moveup() {
    if (isButtonPressed_moveup) {
        let pt_speed = $('#direction_speed').val();
        let target_ipa = $('#target').val();
        $.ajax(target_ipa+"/-wvhttp-01-/control.cgi?tilt=up&tilt.speed.dir=" + pt_speed);
        setTimeout(trigger_moveup, 500);
    }
}

function trigger_moverightup() {
    if (isButtonPressed_moverightup) {
        let pt_speed = $('#direction_speed').val();
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=right&pan.speed.dir=" + pt_speed +"&tilt=up&tilt.speed.dir=" + pt_speed);
        setTimeout(trigger_moverightup, 500);
    }
}


function trigger_moveleftdown() {
    if (isButtonPressed_moveleftdown) {
        let pt_speed = $('#direction_speed').val();
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=left&pan.speed.dir=" + pt_speed +"&tilt=down&tilt.speed.dir=" + pt_speed);
        setTimeout(trigger_moveleftdown, 500);
    }
}

function trigger_movedown() {
    if (isButtonPressed_movedown) {
        let pt_speed = $('#direction_speed').val();
        let target_ipb = $('#target').val();
        $.ajax(target_ipb+"/-wvhttp-01-/control.cgi?tilt=down&tilt.speed.dir=" + pt_speed);
        setTimeout(trigger_movedown, 500);
    }
}

function trigger_moverightdown() {
    if (isButtonPressed_moverightdown) {
        let pt_speed = $('#direction_speed').val();
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=right&pan.speed.dir=" + pt_speed +"&tilt=down&tilt.speed.dir=" + pt_speed);
        setTimeout(trigger_moverightdown, 500);
    }
}

function trigger_moveleft() {
    if (isButtonPressed_moveleft) {
        let pt_speed = $('#direction_speed').val();
        let target_ipc = $('#target').val();
        $.ajax(target_ipc+"/-wvhttp-01-/control.cgi?pan=left&pan.speed.dir=" + pt_speed);
        setTimeout(trigger_moveleft, 500);
    }
}

function trigger_moveright() {
    if (isButtonPressed_moveright) {
        let pt_speed = $('#direction_speed').val();
        let target_ipd = $('#target').val();
        $.ajax(target_ipd+"/-wvhttp-01-/control.cgi?pan=right&pan.speed.dir=" + pt_speed);
        setTimeout(trigger_moveright, 500);
    }
}

function trigger_zoomin() {
    if (isButtonPressed_movezoomin) {
        let z_speed = $('#zoom_speed_range').val();
        let target_ipe = $('#target').val();
        $.ajax(target_ipe+"/-wvhttp-01-/control.cgi?zoom=tele&zoom.speed.dir=" + z_speed);
        setTimeout(trigger_zoomin, 500);
    }
}

function trigger_zoomout() {
    if (isButtonPressed_movezoomout) {
        let z_speed = $('#zoom_speed_range').val();
        let target_ipf = $('#target').val();
        $.ajax(target_ipf+"/-wvhttp-01-/control.cgi?zoom=wide&zoom.speed.dir=" + z_speed);
        setTimeout(trigger_zoomout, 500);
    }
}


function trigger_gainup() {
    if (isButtonPressed_gainup) {
        let target_ip = $('#target').val();
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?exp=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?c.1.me.gain.mode=manual");
        getGainValue(target_ip, function(gainValue) {
            // let newvalue = parseInt(gainValue);
            // if (newvalue > 800) {
            //     newvalue = 800;
            // };
            $.ajax(target_ip + "/-wvhttp-01-/control.cgi?me.gain=" + (gainValue+5));
            $('#gain_value').text(((gainValue+5)/10));
        // Gunakan nilai gainValue di sini

        // Lanjutkan dengan operasi lain jika diperlukan

        setTimeout(trigger_gainup, 500);
        });
    }
}

function trigger_gaindown() {
    if (isButtonPressed_gaindown) {
        let target_ip = $('#target').val();
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?exp=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?c.1.me.gain.mode=manual");
        getGainValue(target_ip, function(gainValue) {
            // let newvalue = parseInt(gainValue);
            // if (newvalue > 800) {
            //     newvalue = 800;
            // };
            $.ajax(target_ip + "/-wvhttp-01-/control.cgi?me.gain=" + (gainValue-5));
            $('#gain_value').text(((gainValue-5)/10));
        // Gunakan nilai gainValue di sini

        // Lanjutkan dengan operasi lain jika diperlukan

        setTimeout(trigger_gaindown, 500);
        });
    }   
}

function trigger_irisup() {
    if (isButtonPressed_irisup) {
        let target_ip = $('#target').val();
        let dataIris = [180, 200, 220, 240, 260, 280, 310, 340, 370, 400, 440, 480, 520, 560, 620, 670, 730, 800];
        let currentIndex = 0;
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?exp=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?nd.mode=fixed");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?c.1.me.diaphragm.mode=manual");

        getIrisValue(target_ip, function(irisValue) {
            let newvalue = irisValue;
            for (let i = 0; i < dataIris.length; i++) {
                if (irisValue < dataIris[i]) {
                    newvalue = dataIris[i];
                    break;
                }
            }

        $.ajax({
            url: target_ip + "/-wvhttp-01-/control.cgi?me.diaphragm=" + newvalue,
            method: "GET",
            success: function(response) {
                $('#iris_value').text((newvalue/100));
            // Tindakan setelah request berhasil
            // console.log("New value sent:", newvalue);
            },
            error: function(xhr, status, error) {
            // Tindakan jika terjadi error
            console.log("Error:", error);
            }
        });

        setTimeout(trigger_irisup, 500);
        });
    }
}

function trigger_irisdown() {
    if (isButtonPressed_irisdown) {
        let target_ip = $('#target').val();
        let dataIris = [180, 200, 220, 240, 260, 280, 310, 340, 370, 400, 440, 480, 520, 560, 620, 670, 730, 800];
        let currentIndex = 0;
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?exp=manual");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?nd.mode=fixed");
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?c.1.me.diaphragm.mode=manual");

        getIrisValue(target_ip, function(irisValue) {
        let newvalue = irisValue;
        for (let i = dataIris.length - 1; i >= 0; i--) {
            if (irisValue > dataIris[i]) {
            newvalue = dataIris[i];
            break;
            }
        }

        $.ajax({
            url: target_ip + "/-wvhttp-01-/control.cgi?me.diaphragm=" + newvalue,
            method: "GET",
            success: function(response) {
                $('#iris_value').text((newvalue/100));
            // Tindakan setelah request berhasil
            // console.log("New value sent:", newvalue);
            },
            error: function(xhr, status, error) {
            // Tindakan jika terjadi error
            console.log("Error:", error);
            }
        });

        setTimeout(trigger_irisdown, 500);
        });
    }
}

function trigger_near() {
    if (isButtonPressed_near) {
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus=manual");
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=near");
        setTimeout(trigger_near, 500);
    }
}

function trigger_far() {
    if (isButtonPressed_far) {
        let target_ip = $('#target').val();
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus=manual");
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=far");
        setTimeout(trigger_far, 500);
    }
}


function getGainValue(target_ip, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        target_ip + "/-wvhttp-01-/info.cgi"
        // target_ip + "/-wvhttp-01-/info.cgi?item=c.1.me.gain"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
        const responseResult = xhr.responseText;

        const startIndex = responseResult.indexOf("c.1.me.gain");
        const endIndex = responseResult.indexOf("\n", startIndex);
        const gainValue = responseResult.slice(startIndex + 13, endIndex);

        // Panggil callback function dan berikan nilai gainValue sebagai argumen
        callback(parseInt(gainValue));
        } else {
        console.log(`Error: ${xhr.status}`);
        }
    };
}


function getIrisValue(target_ip, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        target_ip + "/-wvhttp-01-/info.cgi"
        // target_ip + "/-wvhttp-01-/info.cgi?item=c.1.me.diaphragm"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
        const responseResult = xhr.responseText;

        const startIndex = responseResult.indexOf("c.1.me.diaphragm");
        const endIndex = responseResult.indexOf("\n", startIndex);
        const irisValue = responseResult.slice(startIndex + 18, endIndex);

        // Panggil callback function dan berikan nilai irisValue sebagai argumen
        callback(parseInt(irisValue));
        } else {
        console.log(`Error: ${xhr.status}`);
        }
    };
}
            


function getCameraList(groupIndex){

    $('#target').val("");
    $("[name='prev-tally']").addClass('d-none');
    $(".bootstrap-switch").addClass('d-none');
    $('#desc_active_target').html("Activate Target: ");

    var fs = require('fs');        

    // // Baca file JSON
    var data = fs.readFileSync(json_location + "/camera_list.json");

    // // Parse JSON menjadi objek JavaScript
    var myObject = JSON.parse(data);
    var containerBtnCamera = document.getElementById("containerBtnCamera");
    containerBtnCamera.innerHTML = "";

    const package = localStorage.getItem('package');
    let total_camera_license;
    switch (package){
        case "Camera Connect Lite (CCL)":
            // only access group 1 and 1 cam only
            total_camera_license = 1;
            $('#changeCameraGroup').addClass('d-none');
            break;
        case "Camera Connect Pro (CCP)":
            // only access group 1 and 2 cam only
            total_camera_license = 2;
            $('#changeCameraGroup').addClass('d-none');
            break;
        case "Camera Connect Ultra (CCU)":
            // able access all group and all cam
            total_camera_license = 10;
            break;
    }   


    for (var i = 0; i < myObject[groupIndex].length; i++) {
        var camera = myObject[groupIndex][i];
        
        // Create the anchor element
        var anchorElement = document.createElement("a");

        // Set the class attribute
        if(i > total_camera_license-1){
        anchorElement.className = "btn btn-app btn-camera col-2 mb-1 mr-2 d-none";
        } else{
            anchorElement.className = "btn btn-app btn-camera col-2 mb-1 mr-2";
        }

        // Set the data attributes
        anchorElement.setAttribute("data-keydown", camera.keyboard_mapping);
        anchorElement.setAttribute("data-ip", camera.ip_address);
        anchorElement.setAttribute("data-indexcamera", i);

        // Create the span element for the badge
        var badgeSpan = document.createElement("span");
        badgeSpan.className = "badge badge-shorcut bg-primary";
        badgeSpan.textContent = camera.keyboard_mapping;

        // Set the text for the anchor
        anchorElement.textContent = camera.camera_name;

        // Append the elements to the anchor
        anchorElement.appendChild(badgeSpan);

        // insert tabPane into ContainerTab
        var containerBtnCamera = document.getElementById("containerBtnCamera");
        containerBtnCamera.appendChild(anchorElement);

        if (i === 4) {
            // Create a new row for every 5th button
            const breakColumn = document.createElement('div');
            breakColumn.className = 'w-100';
            containerBtnCamera.appendChild(breakColumn);
        }
    }

    // const parentElement = document.getElementById('container_editpreset');
    // let buttonsCounter = 0;
    
    // for (let i = 1; i <= 100; i++) {
    //   const colDiv = document.createElement('div');
    //   colDiv.className = 'col mb-2 coba-aja'+i;
    
    //   const btnGroupDiv = document.createElement('div');
    //   btnGroupDiv.className = 'btn-group d-flex';
    //   btnGroupDiv.role = 'group';
    
    //   const button1 = document.createElement('button');
    //   button1.type = 'button';
    //   button1.className = 'btn btn-sm setpreset_' + i;
    //   button1.textContent = 'P ' + i;
    
    //     const dropdownToggle = document.createElement('button');
    //     dropdownToggle.type = 'button';
    //     dropdownToggle.className = 'btn btn-sm dropdown-toggle dropdown-icon';
    //     dropdownToggle.setAttribute('data-toggle', 'dropdown');
    //     dropdownToggle.innerHTML = '<span class="sr-only">Toggle Dropdown</span>';

    //     const dropdownMenu = document.createElement('div');
    //     dropdownMenu.className = 'dropdown-menu';
    //     dropdownMenu.role = 'menu';

    //     // Membuat elemen <a> dengan class "dropdown-item" dan atribut href, data-toggle, data-target, dan data-idpreset
    //     var setPresetLink = document.createElement("a");
    //     setPresetLink.className = "dropdown-item";
    //     setPresetLink.href = "#";
    //     setPresetLink.setAttribute("data-toggle", "modal");
    //     setPresetLink.setAttribute("data-target", "#modal-setPreset");
    //     setPresetLink.setAttribute("data-idpreset", i);
    //     setPresetLink.textContent = "Set";

    //     // Membuat elemen <div> dengan class "dropdown-divider"
    //     var dropdownDivider = document.createElement("div");
    //     dropdownDivider.className = "dropdown-divider";

    //     // Membuat elemen <a> dengan class "dropdown-item" dan atribut data-toggle serta data-target
    //     var renamePresetLink = document.createElement("a");
    //     renamePresetLink.className = "dropdown-item";
    //     renamePresetLink.setAttribute("data-toggle", "collapse");
    //     renamePresetLink.setAttribute("data-target", "#container_renamepreset_"+i);
    //     renamePresetLink.textContent = "Rename";

    //     // Menambahkan elemen-elemen yang telah dibuat ke dalam elemen <div> dengan class "dropdown-menu"
    //     dropdownMenu.appendChild(setPresetLink);
    //     dropdownMenu.appendChild(dropdownDivider);
    //     dropdownMenu.appendChild(renamePresetLink);

    //   // ... (same as before)
    
    //   btnGroupDiv.appendChild(button1);
    //   btnGroupDiv.appendChild(dropdownToggle);
    //   btnGroupDiv.appendChild(dropdownMenu);
    
    //   colDiv.appendChild(btnGroupDiv);
    
    //   const inputGroup = document.createElement('div');
    //   inputGroup.className = 'input-group input-group-sm mt-1 collapse';
    //   inputGroup.id = 'container_renamepreset_' + i;

    //   const input = document.createElement('input'); // Define the 'input' variable
    //   input.type = 'text';
    //   input.className = 'form-control';
    //   input.id = 'input_renamepreset_' + i;
    //   input.maxLength = 4;

    //   const inputAppend = document.createElement('span');
    //   inputAppend.className = 'input-group-append';
    
    //   // ... (same as before)
    
    //   inputGroup.appendChild(input);
    //   inputGroup.appendChild(inputAppend);
    
    //   colDiv.appendChild(inputGroup);
    
    //   parentElement.appendChild(colDiv);
    
    //   buttonsCounter++;
    
    //   if (buttonsCounter === 5) {
    //     const w100Div = document.createElement('div');
    //     w100Div.className = 'w-100';
    
    //     parentElement.appendChild(w100Div);
    //     buttonsCounter = 0; // Reset the counter
    //   }
    // }
  
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const buttons = document.querySelectorAll('.coba-aja');
    
//     const totalButtons = buttons.length;
//     console.log(totalButtons);
// const buttonsPerPage = 20;
// let currentPage = 1;

// function updateButtons() {
//   const startIndex = (currentPage - 1) * buttonsPerPage;
//   const endIndex = Math.min(startIndex + buttonsPerPage, totalButtons);

//   buttons.forEach((button, index) => {
//     if (index >= startIndex && index < endIndex) {
//       button.style.display = 'inline-block';
//     } else {
//       button.style.display = 'none';
//     }
//   });

//   prevBtn.disabled = currentPage === 1;
//   nextBtn.disabled = endIndex >= totalButtons;
// }

// prevBtn.addEventListener('click', () => {
//   if (currentPage > 1) {
//     currentPage--;
//     updateButtons();
//   }
// });

// nextBtn.addEventListener('click', () => {
//   if (currentPage * buttonsPerPage < totalButtons) {
//     currentPage++;
//     updateButtons();
//   }
// });

// updateButtons();

}

function getGeneralSettings(){
    var fs = require('fs');        

    // read file JSON
    var data = fs.readFileSync(json_location + "/general_settings.json");

    //Parse JSON to JavaScript Object
    var myObject = JSON.parse(data);

    var z_speed = myObject[0].z_speed;
    var pt_speed = myObject[0].pt_speed;

    $('#zoom_speed_range').val(z_speed);
    $('#desc_zoom_speed').text("Z-Speed: " + z_speed);
    
    $('#direction_speed').val(pt_speed);
    $('#desc_dir_speed').text("PT-Speed: " + pt_speed);

    // get data from general_settings.json and set data to slider
    ptspeed_slider = $("#ptspeed_slider").data("ionRangeSlider");
    ptspeed_slider.update({
        from: pt_speed
    });
    
    zoomspeed_slider = $("#zoomspeed_slider").data("ionRangeSlider");
    zoomspeed_slider.update({
        from: pt_speed
    });
    // get data from general_settings.json and set data to slider
}

// get camera status prev or program 
function getCameraStatus(dataIp){
    
    interval_getCameraStatus = setInterval(() => {
        const xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            dataIp + "/-wvhttp-01-/info.cgi"
            // dataIp + "/-wvhttp-01-/info.cgi?item=f.tally"
        );
        xhr.send();
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const responseResult = xhr.responseText;

                const startIndexOnOff = responseResult.indexOf('f.tally');
                const endIndexOnOff = responseResult.indexOf('\n', startIndexOnOff);
                const fTallyOnOff = responseResult.slice(startIndexOnOff + 9, endIndexOnOff);

                const startIndexTallyMode = responseResult.indexOf('f.tally.mode');
                const endIndexTallyMode = responseResult.indexOf('\n', startIndexTallyMode);
                const fTallyTallyMode = responseResult.slice(startIndexTallyMode + 14, endIndexTallyMode);

                
                if (fTallyOnOff == "off") {
                    $('#selected_camera_panel').removeClass('border-preview');
                    $('#selected_camera_panel').removeClass('border-program');
                } else if (fTallyOnOff == "on") {
                    if (fTallyTallyMode == "preview"){
                        $('#selected_camera_panel').removeClass('border-program').addClass('border-preview');
                    } else if (fTallyTallyMode == "program") {
                        $('#selected_camera_panel').removeClass('border-preview').addClass('border-program');
                    }
                }
                $("#selected_camera_panel").attr("src",dataIp + "/-wvhttp-01-/video.cgi?v=jpg");
            } else {
                console.log(`Error: ${xhr.status}`);
                $("#selected_camera_panel").attr("src", "../assets/img/video-output.svg");
                
            }
        };
    }, 500);
}

function stopgetCameraStatus() {
    clearInterval(interval_getCameraStatus);
}
// get camera status prev or program 

jQuery(document).ready(function() {


    
    $('.checkbox_setpreset').on('change', function() {
        // Get the count of checked checkboxes with class "checkbox_setpreset"
        var checkedCount = $('.checkbox_setpreset:checked').length;
    
        // Disable or enable checkboxes based on the count
        if (checkedCount < 1) {
          $(this).prop('checked', true);
        }
    });

    //refresh webcam-list
    $('#refresh_list_webcam').click(function() {
        navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            var webcams = devices.filter(function(device) {
            return device.kind === 'videoinput';
            });
            
            var select = document.getElementById('list_webcam');
            select.innerHTML = '';
            
            var defaultOption = document.createElement('option');
            defaultOption.value = 'null';
            defaultOption.text = 'Select output';
            select.appendChild(defaultOption);
            webcams.forEach(function(webcam) {
            var option = document.createElement('option');
            option.value = webcam.deviceId;
            option.text = webcam.label || 'Camera ' + (select.length + 1);
            select.appendChild(option);
            });
            
            if (localStorage.getItem('webcam_selected') == 'null') {
                $("#list_webcam").val('null').change();
            } else{
                $("#list_webcam").val(localStorage.getItem('webcam_selected')).change();
            }
        })
        .catch(function(err) {
            console.error('Error occurred while accessing media devices: ', err);
        });
    });
    //refresh webcam-list

    // PT Speed Slider
    var ptspeed_slider = $("#ptspeed_slider").ionRangeSlider({
        min: 500,
        max: 15000,
        from: 500,
        to: 15000,
        step: 500,
        skin: "round",
        hide_min_max: true,
        force_edges: true,
        onChange: function (data) {
            console.log(data.from);

            var pt_speed = data.from;

            var fs = require('fs');

            // Read the JSON file
            var data = fs.readFileSync(json_location + '/general_settings.json', 'utf8');

            // Parse the JSON to JavaScript object
            var preset_list = JSON.parse(data);

            // Update the pt_speed properties
            preset_list[0].pt_speed = parseInt(pt_speed);

            // Convert the JavaScript object back to JSON string
            var updatedData = JSON.stringify(preset_list, null, 2);

            // Write the updated JSON string back to the file
            fs.writeFile(json_location + '/general_settings.json', updatedData, 'utf8', function(err) {
            if (err) {
                console.error(err);
                return;
            }
            });

            $('#direction_speed').val(pt_speed);
            $('#desc_dir_speed').text("PT-Speed: " + pt_speed);
        }
    });
    // PT Speed Slider

    // Zoom Speed Slider
    var zoomspeed_slider = $("#zoomspeed_slider").ionRangeSlider({
        min: 1,
        max: 15,
        from: 1,
        to: 15,
        step: 1,
        skin: "round",
        hide_min_max: true,
        onChange: function (data) {
        var z_speed = data.from;

        var fs = require('fs');

        // Read the JSON file
        var data = fs.readFileSync(json_location + '/general_settings.json', 'utf8');

        // Parse the JSON to JavaScript object
        var preset_list = JSON.parse(data);

        // Update the z_speed properties
        preset_list[0].z_speed = parseInt(z_speed);

        // Convert the JavaScript object back to JSON string
        var updatedData = JSON.stringify(preset_list, null, 2);

        // Write the updated JSON string back to the file
        fs.writeFile(json_location + '/general_settings.json', updatedData, 'utf8', function(err) {
        if (err) {
            console.error(err);
            return;
        }
        // console.log('Data berhasil disimpan ke file JSON.');
        });
        $('#zoom_speed_range').val(z_speed);
        $('#desc_zoom_speed').text("Z-Speed: " + z_speed);
        }
    });
    // Zoom Speed Slider

    // Speed Level Slider
    var speedlevel_slider = $("#speedlevel_slider").ionRangeSlider({
        min: 1,
        max: 100,
        from: 1,
        to: 100,
        step: 1,
        skin: "round",
        // hide_min_max: true,
        onFinish: function (data) {
            var value = data.from;
            $('#text_shootingmodevalue').val(value);
        },
    });
    // Speed Level Slider

    // Time Mode Slider
    var timemode_slider = $("#timemode_slider").ionRangeSlider({
        min: 2,
        max: 99,
        from: 2,
        to: 99,
        step: 0.5,
        skin: "round",
        postfix: "s",
        min_postfix: "s",
        // hide_min_max: true,
        // max_postfix: "s",
        // fired then range slider is stop
        onFinish: function (data) {
            var value = data.from * 1000;
            $('#text_shootingmodevalue').val(value);
            // console.log(data);
        },
        // fired then range slider is ready
        onStart: function (data) {
            var value = data.from * 1000;
            $('#text_shootingmodevalue').val(value);
        },
    });
    // Time Mode Slider

    // Kelvin Slider
    var kelvin_slider = $("#kelvin_slider").ionRangeSlider({
        min: 2000,
        max: 15000,
        step: 10,
        skin: "round",
        hide_min_max: true,    // show/hide MIN and MAX labels
        hide_from_to: true,    // show/hide FROM and TO labels
        values: [
            2000, 2020, 2040, 2060, 2080, 2110, 2130, 2150, 2170, 2200, 2220, 2250, 2270, 2300, 2330, 2350, 2380, 2410,
            2440, 2470, 2500, 2530, 2560, 2600, 2630, 2670, 2700, 2740, 2780, 2820, 2860, 2900, 2940, 2990, 3030, 3080,
            3130, 3200, 3230, 3280, 3330, 3390, 3450, 3510, 3570, 3640, 3700, 3770, 3850, 3920, 4000, 4080, 4170, 4300,
            4350, 4440, 4550, 4650, 4760, 4880, 5000, 5130, 5260, 5410, 5600, 5710, 5880, 6060, 6300, 6450, 6670, 6900,
            7140, 7410, 7690, 8000, 8330, 8700, 9090, 9520, 10000, 10530, 11110, 11760, 12500, 13330, 14290, 15000
        ],
        onFinish: function (data) {
            var value = data.from_value;
            let target_ip = $('#target').val();
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?wb.kelvin="+value);
        },
        onChange: function (data) {
            var value = data.from_value;
            $('#value_kelvin_slider').text(value);
        }
    });
    // Kelvin Slider

    // Zoom Slider
    var zoom_slider = $("#zoom_slider").ionRangeSlider({
        min: 2000,
        max: 15000,
        step: 10,
        skin: "round",
        hide_min_max: true,
        vertical: true,
        values: [
            2000, 2020, 2040, 2060, 2080, 2110, 2130, 2150, 2170, 2200, 2220, 2250, 2270, 2300, 2330, 2350, 2380, 2410,
            2440, 2470, 2500, 2530, 2560, 2600, 2630, 2670, 2700, 2740, 2780, 2820, 2860, 2900, 2940, 2990, 3030, 3080,
            3130, 3200, 3230, 3280, 3330, 3390, 3450, 3510, 3570, 3640, 3700, 3770, 3850, 3920, 4000, 4080, 4170, 4300,
            4350, 4440, 4550, 4650, 4760, 4880, 5000, 5130, 5260, 5410, 5600, 5710, 5880, 6060, 6300, 6450, 6670, 6900,
            7140, 7410, 7690, 8000, 8330, 8700, 9090, 9520, 10000, 10530, 11110, 11760, 12500, 13330, 14290, 15000
        ],
        onFinish: function (data) {
            var value = data.from_value;
            let target_ip = $('#target').val();
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?wb.kelvin="+value);
        },
    });
    // Zoom Slider

    //get list of cameras with index 0 on page first load
    getCameraList(0);
    //get list of cameras with index 0 on page first load

    //get general settings first load
    getGeneralSettings();
    //get general settings first load

    //detect #changeCameraGroup when its changed it will call getCameraList()
    $('#changeCameraGroup').change(function() {
        //Use $option (with the "$") to see that the variable is a jQuery object
        var $option = $(this).find('option:selected');
        //Added with the EDIT
        var value = $option.val();//to get content of "value" attrib
        
        getCameraList(value);
        $('#container_preset').addClass('d-none');
        $("#main_container").addClass("d-none");
        $("#container_select_camera_first").removeClass("d-none");

    });
    //detect #changeCameraGroup when its changed it will call getCameraList()
    
    //detect #changeShootingMode when changed
    $('#changeShootingMode').change(function() {
        let target_ip = $('#target').val();
        let value = $(this).val();
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?shooting="+value);
        if(value == "fullauto"){
            $('#changeWhiteBalanceMode').attr('disabled', 'disabled');
            $('#wbCalibration_button').addClass('d-none');
            
            $('#gainup_button').attr('disabled', 'disabled');
            $('#gaindown_button').attr('disabled', 'disabled');
            $('#irisup_button').attr('disabled', 'disabled');
            $('#irisdown_button').attr('disabled', 'disabled');

            //disable kelvin slider when shooting mode is fullauto
            kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
            kelvin_slider.update({
                from_fixed: true
            });
            setTimeout(() => {
            getGainValue(target_ip, function(gainValue) {
                $('#gain_value').text((gainValue/10));
            });
            getIrisValue(target_ip, function(irisValue) {
                $('#iris_value').text((irisValue/100));
            });
            }, 2000);


        } else if( value == "manual"){
            $('#changeWhiteBalanceMode').removeAttr('disabled');
            

            $('#gainup_button').removeAttr('disabled');
            $('#gaindown_button').removeAttr('disabled');
            $('#irisup_button').removeAttr('disabled');
            $('#irisdown_button').removeAttr('disabled');

            //enable kelvin slider when shooting mode is manual
            kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
            kelvin_slider.update({
                from_fixed: false
            });

            setTimeout(() => {
                getGainValue(target_ip, function(gainValue) {
                    $('#gain_value').text((gainValue/10));
                });
                getIrisValue(target_ip, function(irisValue) {
                    $('#iris_value').text((irisValue/100));
                });
                }, 2000);
        }
         

        //delay caling function getStatusWhiteBalanceMode() to get data more acurate
        setTimeout(() => {
            getStatusWhiteBalanceMode(target_ip);
        }, 500);
    });
    //detect #changeShootingMode when changed

    var previousValue = 0; 
    $("#telewide_slider").on("input", function() {
        let z_speed = $('#zoom_speed_range').val();
        let target_ip = $('#target').val();

        var value = $(this).val();
        console.log(value);


        // $.ajax(target_ip + "/-wvhttp-01-/control.cgi?c.1.wb="+value);
        // kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
        // kelvin_slider.update({ from: value });
        // kelvin_slider.options.onFinish(kelvin_slider.result);
        
        var currentValue = $(this).val();
        
        if (currentValue > previousValue) {
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?zoom=tele&zoom.speed.dir=" + z_speed);
            console.log("Slider is wide bawah" + currentValue);
        } else if (currentValue < previousValue) {
          console.log("Slider is tele atas" + currentValue);
        } else {
        //   console.log("Slider is not sliding" + currentValue);
        }
      
        previousValue = currentValue;

    });

    //detect #changeWhiteBalanceMode when changed
    $('#changeWhiteBalanceMode').change(function() {
        let target_ip = $('#target').val();
        let value = $(this).val();
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?wb="+value);

        if(value == "kelvin"){
            getKelvinValue();
            $('#container_kelvinslider').removeClass('d-none');
            //enable kelvin slider when shooting mode is fullauto
            kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
            kelvin_slider.update({
                from_fixed: false
            });
            
        } else {
            $('#container_kelvinslider').addClass('d-none');
            $('#wbCalibration_button').addClass('d-none');

            //disable kelvin slider when shooting mode is fullauto
            kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
            kelvin_slider.update({
                from_fixed: true
            });
        }

        if(value == "wb_a"){
            $('#wbCalibration_button').removeClass('d-none');
        } 
        else if(value == "wb_b"){
            $('#wbCalibration_button').removeClass('d-none');
        } 
        else {
            $('#container_kelvinslider').addClass('d-none');
            $('#wbCalibration_button').addClass('d-none');
        }

        setTimeout(() => {
            var listvalues_kelvin = [
                2000, 2020, 2040, 2060, 2080, 2110, 2130, 2150, 2170, 2200, 2220, 2250, 2270, 2300, 2330, 2350, 2380, 2410,
                2440, 2470, 2500, 2530, 2560, 2600, 2630, 2670, 2700, 2740, 2780, 2820, 2860, 2900, 2940, 2990, 3030, 3080,
                3130, 3200, 3230, 3280, 3330, 3390, 3450, 3510, 3570, 3640, 3700, 3770, 3850, 3920, 4000, 4080, 4170, 4300,
                4350, 4440, 4550, 4650, 4760, 4880, 5000, 5130, 5260, 5410, 5600, 5710, 5880, 6060, 6300, 6450, 6670, 6900,
                7140, 7410, 7690, 8000, 8330, 8700, 9090, 9520, 10000, 10530, 11110, 11760, 12500, 13330, 14290, 15000
              ];
    
            const xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            target_ip + "/-wvhttp-01-/info.cgi"
        );
        xhr.send();
        xhr.onload = () => {
    
            if (xhr.readyState == 4 && xhr.status == 200) {
            const responseResult = xhr.responseText;
    
            const startIndex = responseResult.indexOf("c.1.wb.kelvin");
            const endIndex = responseResult.indexOf("\n", startIndex);
            var result = responseResult.slice(startIndex + 15, endIndex);
    
            var index = listvalues_kelvin.indexOf(parseInt(result));
    
            //notes for kelvin slider, update value based on index from listvalues_kelvin
            kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
            kelvin_slider.update({
                from: index
            });
    
            var sliderValue = kelvin_slider.result.from_value;
            $('#value_kelvin_slider').text(sliderValue);
            console.log(sliderValue + value + index);
    
            } else {
            console.log(`Error: ${xhr.status}`);
            }
        };
        }, 500);
        
        
    });
    //detect #changeWhiteBalanceMode when changed
    
    // remove .bg-warning
    const buttons = document.querySelectorAll('.btn-camera');
    function removeBgSuccessClass() {
    buttons.forEach(btn => btn.classList.remove('active'));
    }
    
    $(document).on('click', '.btn-camera', function() {
        $('.btn-camera').removeClass('active'); // Remove the class from all buttons
        $(this).addClass('active'); // Add the class to the clicked button
        $('#selected_camera_panel').removeClass('border-program border-preview');

        const dataIp = "http://" + $(this).data('ip');
        const groupIndex = $("#changeCameraGroup").val();
        const cameraIndex = $(this).data('indexcamera');

        $('#target').val(dataIp);
        $('#desc_active_target').html('Activate Target: ' + dataIp);


        getStatusPrevTally(dataIp);
        getStatusAutoFocus(dataIp);
        getStatusShootingMode(dataIp);
        getStatusWhiteBalanceMode(dataIp);
        getTeleWideValue(dataIp);
        getPreset(groupIndex,cameraIndex);
        stopgetCameraStatus();
        getCameraStatus(dataIp);
        getKelvinValue();
        getGainValue(dataIp, function(gainValue) {
            $('#gain_value').text((gainValue/10));
        });
        getIrisValue(dataIp, function(irisValue) {
            $('#iris_value').text((irisValue/100));
        });
        $("#container_select_camera_first").addClass("d-none");
        $("#main_container").removeClass("d-none");
    });
    // remove .bg-warning

    //change bootstrapSwitch and trigger api to turn on/off auto focus
    $("[name='auto-focus']").on('change.bootstrapSwitch', function(e) {
        let target_ip = $('#target').val();
        if(e.target.checked == false){
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&focus=manual");
        } else{
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&focus=auto");
        }
    });
    //change bootstrapSwitch and trigger api to turn on/off auto focus

    //hide container_showpreset                        
    $('#button_editpreset').click(function() {
        if ($('#container_editpreset').hasClass('show')) {
            return false;
        } else {
            $('#container_editpreset').on('show.bs.collapse', function () {
                $('#container_showpreset').collapse('hide');
            })
        }
        // To disable the event listener
        eventListenerEnabled_keydown = false;
        $('.badge-shorcut').removeClass('bg-primary');
        $('.badge-shorcut').addClass('bg-secondary');

    });
    //hide container_showpreset
    
    //hide container_editpreset
    $('#button_showpreset').click(function() {
        if ($('#container_showpreset').hasClass('show')) {
            return false;
        } else {
            $('#container_showpreset').on('show.bs.collapse', function () {
                $('#container_editpreset').collapse('hide');
            })
        }
        // To ENABLE the event listener
        eventListenerEnabled_keydown = true;
        $('.badge-shorcut').removeClass('bg-secondary');
        $('.badge-shorcut').addClass('bg-primary');
    });
    //hide container_editpreset

    //detected set-presetname clicked and save name preset into json
    $('.set-presetname').click(function() {
        const data_input = $(this).data('input');
        const name_preset = $("#" + data_input).val();
        const id_preset = $(this).data('idpreset');


        if(name_preset == "")
        {
            notification('error', 'Input Required');
        }
        else
        {

            const buttons = document.querySelectorAll('.btn-camera');
            buttons.forEach(function(button) {
                if (button.classList.contains('active')) {
                    const groupIndex = $("#changeCameraGroup").val();
                    const dataIndexCamera = button.dataset.indexcamera;


                    var fs = require('fs');        

                    // read file JSON based on groupIndex
                    var data = fs.readFileSync(json_location + "/group"+groupIndex+"_presets.json");

                    /// Parse JSON to objek JavaScripts
                    var preset_list = JSON.parse(data);

                    // find data based on id from dataIndexCamera
                    var index = preset_list[dataIndexCamera].findIndex(obj => obj.id_preset == id_preset);
                    if (index !== -1) {

                        preset_list[dataIndexCamera][index].name_button = name_preset;

                        // update array to file json
                        fs.writeFile(json_location + "/group"+groupIndex+"_presets.json", JSON.stringify(preset_list, null, 2), function(err) {
                            if (err) {
                                notification('info','Failed to Rename Preset');
                                return;
                                // console.error(err);
                            }
                            $("#" + data_input).val("");
                            getPreset(groupIndex,dataIndexCamera);
                            notification('info','Preset Name Successfully Updated');
                        });
                    } else {
                        notification('info','No Matching Data Found for the ID Preset');
                    }

                }
            });
        }

    });
    //detected set-presetname clicked and save name preset into json

    // when element .set-preset clicked it will trigger api and change disabled to false on file json, false it means the button can recall preset    
    $(document).on('click', '.set-preset', function() {
        let target_ip = $('#target').val();
        var id_preset = $('#text_idpreset').val();
        var text_shootingmode=  $('#text_shootingmode').val();
        var text_shootingmodevalue=  $('#text_shootingmodevalue').val();
        var input_renamepreset =  $('#input_renamepreset').val();



        const buttons = document.querySelectorAll('.btn-camera');
        buttons.forEach(function(button) {
            if (button.classList.contains('active')) {
            const groupIndex = $("#changeCameraGroup").val();
            const dataIndexCamera = button.dataset.indexcamera;

                var fs = require('fs');        

                // read file JSON based on groupIndex
                var data = fs.readFileSync(json_location + "/group"+groupIndex+"_presets.json");

                /// Parse JSON to objek JavaScripts
                var preset_list = JSON.parse(data);
                // console.log(preset_list);

                // find data based on id from dataIndexCamera
                var index = preset_list[dataIndexCamera].findIndex(obj => obj.id_preset == id_preset);
                if (index !== -1) {

                    preset_list[dataIndexCamera][index].disabled = false;
                    preset_list[dataIndexCamera][index].shootingmode = text_shootingmode;
                    preset_list[dataIndexCamera][index].shootingmode_value = text_shootingmodevalue;
                    preset_list[dataIndexCamera][index].name_button = input_renamepreset;

                    

                    // update array to file json
                    fs.writeFile(json_location + "/group"+groupIndex+"_presets.json", JSON.stringify(preset_list, null, 2), function(err) {
                        if (err) {
                            notification('info','Preset Assignment Failed');
                            return;
                            // console.error(err);
                        }
                        getPreset(groupIndex,dataIndexCamera);
                        notification('info','Preset Successfully Assigned');
                    });

                    var checkedIDs = $('.checkbox_setpreset:checked').map(function() {
                        return this.id;
                    }).get();
                    if (checkedIDs.length === 1) {
                        if (checkedIDs[0] === 'checkbox_ptzf') {
                            $.ajax(target_ip+"/-wvhttp-01-/preset/set?p=" + id_preset + "&name=Preset_"+id_preset+"&ptz=enabled&focus=enabled&exp=disabled&wb=disabled&is=disabled&cp=disabled");
                        } else if (checkedIDs[0] === 'checkbox_camerasettings') {
                            $.ajax(target_ip+"/-wvhttp-01-/preset/set?p=" + id_preset + "&name=Preset_"+id_preset+"&ptz=disabled&focus=disabled&exp=enabled&wb=enabled&is=enabled&cp=enabled");
                        }
                    } else if (checkedIDs.length === 2) {
                        $.ajax(target_ip+"/-wvhttp-01-/preset/set?p=" + id_preset + "&name=Preset_"+id_preset+"&all=enabled");
                    }      

                } else {
                    notification('info','No Matching Data Found for the ID Preset');
                }
            }
        });
    });
    // when element .set-preset clicked it will trigger api and change disabled to false on file json, false it means the button can recall preset    

    // when element .recall-preset clicked it will recall preset
    $(document).on('click', '.recall-preset', function() {
        const target_ip = $('#target').val();
        const id_preset = $(this).data('idpreset');
        const shootingmode = $(this).data('shootingmode');
        const shootingmodevalue = $(this).data('shootingmodevalue');
        var element = $(this);

        $(this).addClass('bg-gradient-warning');

        setTimeout(function() {
            element.removeClass('bg-gradient-warning');
        }, 250);

        if(shootingmode=="time"){
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p="+ id_preset + "&p.ptztime=" + shootingmodevalue);
        } else if (shootingmode=="speedlevel"){
            $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p="+ id_preset + "&p.ptzspeed=" + shootingmodevalue);
        }
    });
    // when element .recall-preset clicked it will recall preset
    
    
    
    

    $('#recallpreset_timemode').click(function() {
        $('#containerslider_timemode').removeClass('d-none');
        $('#containerslider_speedlevel').addClass('d-none');
    });

    $('#recallpreset_speedlevel').click(function() {
        $('#containerslider_speedlevel').removeClass('d-none');
        $('#containerslider_timemode').addClass('d-none');
    });
    
});


//detect keyboard shorcuts
var previousButton = null;
var eventListenerEnabled_keydown = true;
$(document).on('keydown', function(event) {

    //remove keydown listener
    if ($('#license_information').hasClass('show')) {
        // Modal is open, prevent the event handler
        return;
    }
    //remove keydown listener


    if (eventListenerEnabled_keydown) {
        // remove .bg-warning
        const buttons = document.querySelectorAll('.btn-camera');
        function removeBgSuccessClass() {
            buttons.forEach(btn => btn.classList.remove('active'));
        }
        // remove .bg-warning
        
        
        // Find the link with matching data-keydown attribute
        var key = event.which;
        var keyChar = String.fromCharCode(key).toUpperCase();
        var link = $('[data-keydown="' + keyChar + '"]');
        
        if (link.length > 0) {
            $('#selected_camera_panel').removeClass('border-program border-preview');
            event.preventDefault();
            
            // call removeBgSuccessClass()
            removeBgSuccessClass();
            
            var dataIp = "http://" + link.data('ip');
            $('#target').val(dataIp);
            $('#desc_active_target').html("Activate Target: " + dataIp);

            const groupIndex = $("#changeCameraGroup").val();
            const cameraIndex = link.data('indexcamera');
            
            link.addClass('active');
            link.focus();
            
            // Update the previous button
            previousButton = link;
            
            getStatusPrevTally(dataIp);
            getStatusAutoFocus(dataIp);
            getStatusShootingMode(dataIp);
            getStatusWhiteBalanceMode(dataIp);
            getTeleWideValue(dataIp);
            getPreset(groupIndex,cameraIndex);
            stopgetCameraStatus();
            getCameraStatus(dataIp);
            getKelvinValue();
            getGainValue(dataIp, function(gainValue) {
                $('#gain_value').text((gainValue/10));
            });
            getIrisValue(dataIp, function(irisValue) {
                $('#iris_value').text((irisValue/100));
            });

            $("#container_select_camera_first").addClass("d-none");
            $("#main_container").removeClass("d-none");

        }
    }
});
//detect keyboard shorcuts q


//check status tally on/off
function getStatusPrevTally(dataIp) {
    $(".bootstrap-switch").addClass('d-none');
    $("#btn_one_shot_af").addClass('d-none');

    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        dataIp + "/-wvhttp-01-/info.cgi"
        // dataIp + "/-wvhttp-01-/info.cgi?item=f.tally"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const responseResult = xhr.responseText;

            const startIndex = responseResult.indexOf('f.tally:=');
            const endIndex = responseResult.indexOf('\n', startIndex);
            const fTallyModeValue = responseResult.slice(startIndex + 9, endIndex);

            
            if (fTallyModeValue == "on") {
                $("[name='prev-tally']").bootstrapSwitch('state', true);
            } else if (fTallyModeValue == "off") {
                $("[name='prev-tally']").bootstrapSwitch('state', false);
            }

            $("[name='prev-tally']").removeClass('d-none');
            $(".bootstrap-switch").removeClass('d-none');
            $("#btn_one_shot_af").removeClass('d-none');

            
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}
//check status tally on/off


//check status autofocus auto/manual
function getStatusAutoFocus(dataIp) {
    // $(".bootstrap-switch").addClass('d-none');
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        dataIp + "/-wvhttp-01-/info.cgi"
        // dataIp + "/-wvhttp-01-/info.cgi?item=c.1.focus"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const responseResult = xhr.responseText;

            const startIndex = responseResult.indexOf('c.1.focus');
            const endIndex = responseResult.indexOf('\n', startIndex);
            const fTallyModeValue = responseResult.slice(startIndex + 11, endIndex);

            
            if (fTallyModeValue == "auto") {
                $("[name='auto-focus']").bootstrapSwitch('state', true);
            } else if (fTallyModeValue == "manual") {
                $("[name='auto-focus']").bootstrapSwitch('state', false);
            }
            $("[name='auto-focus']").removeClass('d-none');
            // $(".bootstrap-switch").removeClass('d-none');

            
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}
//check status autofocus auto/manual

//check status shooting mode full/manual
function getStatusShootingMode(dataIp){
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        dataIp + "/-wvhttp-01-/info.cgi"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const responseResult = xhr.responseText;

            const startIndex = responseResult.indexOf('c.1.shooting');
            const endIndex = responseResult.indexOf('\n', startIndex);
            const result = responseResult.slice(startIndex + 14, endIndex);

            
            if (result == "fullauto") {
                $("#changeShootingMode").val('fullauto');
                $("#changeWhiteBalanceMode").attr('disabled', 'disabled');

                $('#gainup_button').attr('disabled', 'disabled');
                $('#gaindown_button').attr('disabled', 'disabled');
                $('#irisup_button').attr('disabled', 'disabled');
                $('#irisdown_button').attr('disabled', 'disabled');
                
            } else if (result == "manual") {
                $("#changeShootingMode").val('manual');
                $("#changeWhiteBalanceMode").removeAttr('disabled');
            } else if (result == "scene"){
                $("#changeShootingMode").val('null');
            }
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}
//check status shooting mode full/manual

//check status white balance mode
function getStatusWhiteBalanceMode(dataIp){

    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        dataIp + "/-wvhttp-01-/info.cgi"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const responseResult = xhr.responseText;

            const startIndex = responseResult.indexOf('c.1.wb');
            const endIndex = responseResult.indexOf('\n', startIndex);
            const result = responseResult.slice(startIndex + 8, endIndex);

            //disable kelvin slider when shooting mode is fullauto
            kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
            kelvin_slider.update({
                from_fixed: true
            });

            $('#container_kelvinslider').addClass('d-none');
            if (result == "auto") {
                $('#changeWhiteBalanceMode').val('auto');
            } else if (result == "wb_a") {
                $('#wbCalibration_button').removeClass('d-none')
                $('#changeWhiteBalanceMode').val('wb_a');
            } else if (result == "wb_b") {
                $('#wbCalibration_button').removeClass('d-none')
                $('#changeWhiteBalanceMode').val('wb_b');
            } else if (result == "kelvin") {
                getKelvinValue();
                //enable kelvin slider when shooting mode is fullauto
                kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
                kelvin_slider.update({
                    from_fixed: false
                });
            } else {
                $('#changeWhiteBalanceMode').val('null');
            }

        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}
//check status white balance mode

//Get kelvin value
function getKelvinValue(){
    let dataIp = $('#target').val();
    
    var listvalues_kelvin = [
        2000, 2020, 2040, 2060, 2080, 2110, 2130, 2150, 2170, 2200, 2220, 2250, 2270, 2300, 2330, 2350, 2380, 2410,
        2440, 2470, 2500, 2530, 2560, 2600, 2630, 2670, 2700, 2740, 2780, 2820, 2860, 2900, 2940, 2990, 3030, 3080,
        3130, 3200, 3230, 3280, 3330, 3390, 3450, 3510, 3570, 3640, 3700, 3770, 3850, 3920, 4000, 4080, 4170, 4300,
        4350, 4440, 4550, 4650, 4760, 4880, 5000, 5130, 5260, 5410, 5600, 5710, 5880, 6060, 6300, 6450, 6670, 6900,
        7140, 7410, 7690, 8000, 8330, 8700, 9090, 9520, 10000, 10530, 11110, 11760, 12500, 13330, 14290, 15000
      ];

    $('#changeWhiteBalanceMode').val('kelvin');
    $('#container_kelvinslider').removeClass('d-none');

    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        dataIp + "/-wvhttp-01-/info.cgi"
    );
    xhr.send();
    xhr.onload = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
        const responseResult = xhr.responseText;

        const startIndex = responseResult.indexOf("c.1.wb.kelvin");
        const endIndex = responseResult.indexOf("\n", startIndex);
        var result = responseResult.slice(startIndex + 15, endIndex);

        var index = listvalues_kelvin.indexOf(parseInt(result));

        //notes for kelvin slider, update value based on index from listvalues_kelvin
        kelvin_slider = $("#kelvin_slider").data("ionRangeSlider");
        kelvin_slider.update({
            from: index
        });

        var sliderValue = kelvin_slider.result.from_value;
        $('#value_kelvin_slider').text(sliderValue);
        console.log(sliderValue);

        } else {
        console.log(`Error: ${xhr.status}`);
        }
    };
}
//Get kelvin value

//Get far near value
function getTeleWideValue(dataIp){
    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        dataIp + "/-wvhttp-01-/info.cgi"
    );
    xhr.send();
    xhr.onload = () => {

        if (xhr.readyState == 4 && xhr.status == 200) {
        const responseResult = xhr.responseText;

        const startIndex = responseResult.indexOf("c.1.zoom");
        const endIndex = responseResult.indexOf("\n", startIndex);
        var result = responseResult.slice(startIndex + 10, endIndex);

        $("#telewide_slider").val(result);
        // console.log(result);
        } else {
        console.log(`Error: ${xhr.status}`);
        }
    };
}
//Get far near value

//get preset based on group index and camera index
function getPreset(groupIndex,cameraIndex){
    var fs = require('fs');        

    // Baca file JSON
    var data = fs.readFileSync(json_location + "/group" + groupIndex + "_presets.json");

    // Parse JSON menjadi objek JavaScript
    var presets = JSON.parse(data);

    // console.log(presets[cameraIndex]);


    for (var i = 0; i < presets[cameraIndex].length; i++) {
        var preset_list = presets[cameraIndex][i];
        
        $("#recallpreset_"+(i+1)).text(preset_list.name_button);

        $("#recallpreset_"+(i+1)).attr('data-shootingmode', preset_list.shootingmode);

        $("#recallpreset_"+(i+1)).attr('data-shootingmodevalue', preset_list.shootingmode_value);

        //checking status preset is enabled or disabled, if disabled is true then the button will not clickable
        $("#recallpreset_"+(i+1)).prop("disabled", preset_list.disabled);
        //checking status preset is enabled or disabled, if disabled is true then the button will not clickable
        
        //give name btn based on name class .setpreset_
        $(".setpreset_"+(i+1)).text(preset_list.name_button);
        
    }

    $('#container_preset').removeClass('d-none');
}
//get preset based on group index and camera index

//
function defaultImage_joystick(){
    setTimeout(function () {
        $("#joystick_visualize").attr(
            "src",
            "../assets/img/joystick/default.png"
        );
    }, 300);
}
//
    
//event listener to detect gamepadconnected
window.addEventListener("gamepadconnected", (event) => {
    $('#desc_joystick_status').html("<span class='badge badge-success sm-badge'>Joystick connected</span>");
    $('#desc_joystick_status_ribbon').html("<div class='ribbon bg-success text-xs'>connected</div>");

    // console.log("A gamepad connected:");
    // console.log(event.gamepad);

    const result = document.getElementById('result');
    const gamepad0 = document.getElementById('gamepad0');
    const gamepad1 = document.getElementById('gamepad1');
    
    
    setInterval(()=>{
        let target_ip = $('#target').val();
        let val_zoom_speed_range =  $('#zoom_speed_range').val();
        let val_direction_speed =  $('#direction_speed').val();

        
        if(target_ip != ""){
            var gamepads = navigator.getGamepads();

            //button 1 (real number button) - One-Shot Auto-Focus
            if(gamepads[0].buttons[0].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=one_shot");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/one_shot.png");
                defaultImage_joystick();
            }

            //button 2 (real number button) - Camera Home Position
            if(gamepads[0].buttons[1].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=0&pan=0");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/home_position.png");
                defaultImage_joystick();
            }
            
            //button 3 (real number button) - Manual Focus Far -
            if(gamepads[0].buttons[2].value == 0){
                if(default_value_focus_far == 1){
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=stop");
                    default_value_focus_far = 0;
                }
            } 
            else if(gamepads[0].buttons[2].value == 1){
                default_value_focus_far = 1;
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=far");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/focus_far.png");
                defaultImage_joystick();
            }

            //button 4 (real number button) - Zoom out -
            if(gamepads[0].buttons[3].value == 0){
                if(default_value_zoom_out == 1){
                    default_value_zoom_out = 0;
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&zoom=stop");
                }
            } 
            else if(gamepads[0].buttons[3].value == 1){
                default_value_zoom_out = 1;
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?zoom=wide&zoom.speed.dir="+val_zoom_speed_range);
                $("#joystick_visualize").attr("src", "../assets/img/joystick/zoom_out_-.png");
                defaultImage_joystick();
            }                             
            
            //button 5 (real number button) - Manual Focus Near +
            if(gamepads[0].buttons[4].value == 0){
                if(default_value_focus_near == 1){
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=stop");
                    default_value_focus_near = 0;
                }
            } 
            else if(gamepads[0].buttons[4].value == 1){
                default_value_focus_near = 1;
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.action=near");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/focus_near.png");
                defaultImage_joystick();
            }

            //button 6 (real number button) - Zoom in +
            if(gamepads[0].buttons[5].value == 0){
                if(default_value_zoom_in == 1){
                    default_value_zoom_in = 0;
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?&zoom=stop");

                }
            } 
            else if(gamepads[0].buttons[5].value == 1){
                default_value_zoom_in = 1;
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?zoom=tele&zoom.speed.dir="+val_zoom_speed_range);
                $("#joystick_visualize").attr("src", "../assets/img/joystick/zoom_in_+.png");
                defaultImage_joystick();
            }                     

            //button 7 (real number button) - Preset 1
            if(gamepads[0].buttons[6].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p=1");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/preset_1.png");
                defaultImage_joystick();
            }

            //button 8 (real number button) - Preset 2
            if(gamepads[0].buttons[7].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p=2");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/preset_2.png");
                defaultImage_joystick();
            }

            //button 9 (real number button) - Preset 3
            if(gamepads[0].buttons[8].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p=3");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/preset_3.png");
                defaultImage_joystick();
            }
            
            //button 10 (real number button) - Preset 4
            if(gamepads[0].buttons[9].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p=4");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/preset_4.png");
                defaultImage_joystick();
            }                         

            //button 11 (real number button) - Preset 5
            if(gamepads[0].buttons[10].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p=5");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/preset_5.png");
                defaultImage_joystick();
            }

                //button 12 (real number button) - Preset 6
                if(gamepads[0].buttons[11].value == 1){
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?p=6");
                $("#joystick_visualize").attr("src", "../assets/img/joystick/preset_6.png");
                defaultImage_joystick();
            }                        

            // collect value from gamepad (left and right)
            let axes0 = gamepads[0].axes[0];

            // collect value from gamepad (forward and back)
            let axes1 = gamepads[0].axes[1];

            // collect value from gamepad (for zoom speed, range 1-15)
            let axes6 = gamepads[0].axes[6];

            // collect value from gamepad (mini analog)
            let axes9 = gamepads[0].axes[9];
            

            //controlling camera left/right
            var joystickValue0 = parseFloat(axes0);
            var numberMin = 0;
            var numberMax = 4000;
            if (axes0.toFixed(1) > 0.2) {
                var joystickMin = 0.2;
                var joystickMax = 1.0;    

                var numberValue0 = (joystickValue0 - joystickMin) / (joystickMax - joystickMin) * (numberMax - numberMin) + numberMin;
                console.log( "(Joystick value: " + axes0.toFixed(1) + ") (Speed value: " + numberValue0.toFixed(0) + ")" );
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=right&pan.speed.dir="+numberValue0.toFixed(0));
                if(x==0){
                    gamepad0.innerHTML = axes0.toFixed(1) + " Moving right" + numberValue0.toFixed(0);
                    x = 1;
                    $("#joystick_visualize").attr("src", "../assets/img/joystick/main_analog.png");
                }

            } else if (axes0.toFixed(1) < - 0.1) {
                var joystickMin = 0.1;
                var joystickMax = -1.0; 

                var numberValue0 = (joystickValue0 - joystickMin) / (joystickMax - joystickMin) * (numberMax - numberMin) + numberMin;
                console.log( "(Joystick value: " + axes0.toFixed(1) + ") (Speed value: " + numberValue0.toFixed(0) + ")" );
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=left&pan.speed.dir="+numberValue0.toFixed(0));
                if(x==0){
                    gamepad0.innerHTML = axes0.toFixed(1) + " Moving left" + numberValue0.toFixed(0);
                    x = 1;
                    $("#joystick_visualize").attr("src", "../assets/img/joystick/main_analog.png");
                }
            } else {
                if(x==1){
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop");
                    x = 0;
                    $("#joystick_visualize").attr("src", "../assets/img/joystick/default.png");
                }
                // gamepad1.innerHTML = axes1.toFixed(1) + " Forward/back stop";  
            }
            

            //controlling camera up/down
            var joystickValue1 = parseFloat(axes1);
            if (axes1.toFixed(1) > 0.2) {
                var joystickMin = 0.2;
                var joystickMax = 1.0;    
                var numberValue1 = (joystickValue1 - joystickMin) / (joystickMax - joystickMin) * (numberMax - numberMin) + numberMin;
                console.log( "(Joystick value: " + axes1.toFixed(1) + ") (Speed value: " + numberValue1.toFixed(0) + ")" );
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=down&tilt.speed.dir="+numberValue1.toFixed(0));
                if(y==0){
                gamepad1.innerHTML = axes1.toFixed(1) + " Moving forward" + numberValue1.toFixed(0);
                y = 1;
                $("#joystick_visualize").attr("src", "../assets/img/joystick/main_analog.png");
                }
            } else if (axes1.toFixed(1) < -0.1) {
                var joystickMin = 0.1;
                var joystickMax = -1.0; 
                var numberValue1 = (joystickValue1 - joystickMin) / (joystickMax - joystickMin) * (numberMax - numberMin) + numberMin;
                console.log( "(Joystick value: " + axes1.toFixed(1) + ") (Speed value: " + numberValue1.toFixed(0) + ")" );
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=up&tilt.speed.dir="+numberValue1.toFixed(0));
                if(y==0){
                gamepad1.innerHTML = axes1.toFixed(1) + " Moving back" + numberValue1.toFixed(0);
                y = 1;
                $("#joystick_visualize").attr("src", "../assets/img/joystick/main_analog.png");
                }
            } else {
                if(y==1){
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop");
                    y = 0;
                    $("#joystick_visualize").attr("src", "../assets/img/joystick/default.png");
                }
                // gamepad1.innerHTML = axes1.toFixed(1) + " Forward/back stop";  
            }


            if (axes9.toFixed(1) == -1.0) {
                if(z==0){
                    z = 1;
                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=up&tilt.speed.dir="+val_direction_speed);
                $("#joystick_visualize").attr("src", "../assets/img/joystick/mini_analog.png");
                }
            } else if (axes9.toFixed(1) == 0.1) {
                if(z==0){
                    z = 1;
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=stop&tilt=down&tilt.speed.dir="+val_direction_speed);
                    $("#joystick_visualize").attr("src", "../assets/img/joystick/mini_analog.png");
                }
            } else if (axes9.toFixed(1) == 0.7) {
                if(z==0){
                    z = 1;

                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=left&pan.speed.dir="+val_direction_speed);
                $("#joystick_visualize").attr("src", "../assets/img/joystick/mini_analog.png");
                }
            } else if (axes9.toFixed(1) == -0.4) {
                if(z==0){
                    z = 1;

                $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan=right&pan.speed.dir="+val_direction_speed);
                $("#joystick_visualize").attr("src", "../assets/img/joystick/mini_analog.png");
                }
            } else {
                if(z==1){
                    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?tilt=stop&pan=stop");
                    z = 0;
                    $("#joystick_visualize").attr("src", "../assets/img/joystick/default.png");
                }
            }

            // zoom speed 1 - 15
                // var value_axes6 = axes6.toFixed(1);

                // var maxValue = 15;
                // var minValue = 1;

                // var convertValue = minValue + (1.0 - value_axes6) * (maxValue - minValue) / 2;

                // convertValue = Math.round(convertValue);

                // $('#zoom_speed_range').val(convertValue);
                // $('#desc_zoom_speed').html("Zoom speed: " + convertValue);
            // zoom speed 1 - 15

            
            result.innerHTML = ''; 
            for (let i = 0; i < 10; i++) {
            const axisValue = gamepads[0]?.axes[i]; // use optional chaining to avoid errors if gamepad is not connected
                if (axisValue !== undefined) {
                    // console.log(`Gamepad ${i}: ${axisValue}`);
                    const message = `Gamepad Axes ${i}: ${axisValue.toFixed(1)}<br>`;
                    result.insertAdjacentHTML('beforeend', message);
                }
            }
        }
        
    },100)
});
//event listener to detect gamepadconnected


//event listener to detect gamepaddisconnected
window.addEventListener("gamepaddisconnected", (event) => {
    $('#desc_joystick_status').html("<span class='badge badge-danger sm-badge'>Joystick not connected</span>");
    $('#desc_joystick_status_ribbon').html("<div class='ribbon bg-danger text-xs'>not connected</div>");
    // console.log("A gamepad disconnected:");
    // console.log(event.gamepad);
});
//event listener to detect gamepaddisconnected

// Set placeholder image
var placeholderImage = '../assets/img/video-output.svg';
var video = document.querySelector('#video-webcam');
video.poster = placeholderImage;

$('#list_webcam').change(function() {
    var webcam_selected = $(this).val();
    localStorage.setItem("webcam_selected", webcam_selected);
    if(webcam_selected == 'null'){
        // Stop the current video stream and set the poster image
        var video = document.querySelector('#video-webcam');
        var stream = video.srcObject;

        // Stop the video feed
        if (stream) {
            var tracks = stream.getTracks();
            tracks.forEach(function(track) {
                track.stop();
            });
        }
        // Set the poster image
        video.srcObject = null;
        video.src = placeholderImage;
    } else {
        // Stop the current video stream
        var video = document.querySelector('#video-webcam');
        var stream = video.srcObject;
        // Start the selected webcam
        navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: webcam_selected } } })
            .then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.play();
            })
            .catch(function(err) {
            console.log(err);
        });
    }
});

// get list of webcam
navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
    var webcams = devices.filter(function(device) {
    return device.kind === 'videoinput';
    });
    
    var select = document.getElementById('list_webcam');
    select.innerHTML = '';
    
    var defaultOption = document.createElement('option');
    defaultOption.value = 'null';
    defaultOption.text = 'Select output';
    select.appendChild(defaultOption);
    webcams.forEach(function(webcam) {
    var option = document.createElement('option');
    option.value = webcam.deviceId;
    option.text = webcam.label || 'Camera ' + (select.length + 1);
    select.appendChild(option);
    });
    
    if (localStorage.getItem('webcam_selected') == 'null') {
        $("#list_webcam").val('null').change();
    } else{
        $("#list_webcam").val(localStorage.getItem('webcam_selected')).change();
    }
})
.catch(function(err) {
    console.error('Error occurred while accessing media devices: ', err);
});
// get list of webcam



//sidebar toggle
var sidebarToggle = $('#sidebarToggle');

sidebarToggle.click(function() {
    var icon = sidebarToggle.find('i');
    
    if (icon.hasClass('fa-arrow-left')) {
        icon.removeClass('fa-arrow-left').addClass('fa-arrow-right');
    } else {
        icon.removeClass('fa-arrow-right').addClass('fa-arrow-left');
    }
});
//sidebar toggle

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

$('.btngroupspeedmode .btn').click(function() {
    $('.btngroupspeedmode .btn').removeClass('active');
    $(this).addClass('active');
});

//funtion will active when detect #modal-setPreset opened
$('#modal-setPreset').on('show.bs.modal', function(e) {
    var idpreset = $(e.relatedTarget).data('idpreset');
    var getNamePreset = $('.setpreset_'+idpreset).text();
    $('#text_idpreset').val(idpreset); 
    $('#input_renamepreset').val(getNamePreset); 
});
//funtion will active when detect #modal-setPreset opened


// change value for #text_shootingmode and #text_shootingmode
$('#recallpreset_timemode').click(function(){
    $('#text_shootingmode').val("time");
    var slider_value = $("#timemode_slider").data("ionRangeSlider"); 
    $('#text_shootingmodevalue').val(slider_value.result.from * 1000); //1000 is 1s 
});
$('#recallpreset_speedlevel').click(function(){
    $('#text_shootingmode').val("speedlevel");
    var slider_value = $("#speedlevel_slider").data("ionRangeSlider"); 
    $('#text_shootingmodevalue').val(slider_value.result.from);

});
// change value for #text_shootingmode and #text_shootingmode

// export camera and preset data
function export_data(){
    var fs = require('fs');        
    
    var mergedData = {
        camera_data: [],
        preset_data: [],
        general_settings: []
    };
    
    for (var i = 0; i < 10; i++) {
      var jsonPreset = fs.readFileSync(json_location + `/group${i}_presets.json`);
      var jsonPresetItem = JSON.parse(jsonPreset);
      mergedData.preset_data.push(jsonPresetItem);
    }
    
    var jsonCamera = fs.readFileSync(json_location + `/camera_list.json`);
    var jsonCameraItem = JSON.parse(jsonCamera);
    mergedData.camera_data.push(jsonCameraItem);

    var jsonGeneralSettings = fs.readFileSync(json_location + `/general_settings.json`);
    var jsonGeneralSettingsItem = JSON.parse(jsonGeneralSettings);
    mergedData.general_settings.push(jsonGeneralSettingsItem);
    
    
    // download data
    var jsonStr = JSON.stringify(mergedData, null, 2);
    var blob = new Blob([jsonStr], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "data.json";
    downloadLink.click();
}
// export camera and preset data

// import camera and preset data
function importData(event){
    var fs = require('fs'); 
    var file = event.target.files[0];
    var reader = new FileReader();
  
    reader.onload = function() {
      var importedData = JSON.parse(reader.result);
      var cameraData = importedData.camera_data[0];
      var presetData = importedData.preset_data;
      var generalSettingsData = importedData.general_settings;

  
      // Lakukan operasi yang diperlukan dengan cameraData dan presetData
      // ...
  
      if (importedData.camera_data && importedData.camera_data.length > 0) {
        console.log("camera_data exists.");
        // console.log(cameraData);
      } else {
        console.log("camera_data does not exist or is empty.");
      }
      
      if (importedData.preset_data && importedData.preset_data.length > 0) {
        console.log("preset_data exists.");
        // console.log(presetData);
      } else {
        console.log("preset_data does not exist or is empty.");
      }

      if (importedData.general_settings && importedData.general_settings.length > 0) {
        console.log("preset_data exists.");
        // console.log(presetData);
      } else {
        console.log("preset_data does not exist or is empty.");
      }
  
      for (var i = 0; i < 10; i++) {
          fs.writeFile(json_location + `/group${i}_presets.json`, JSON.stringify(presetData[i]), 'utf8', function(err) {
              if (err) {
                  console.error(err);
                  return;
                }
            });
        }

        fs.writeFile(json_location + '/camera_list.json', JSON.stringify(cameraData), 'utf8', function(err) {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    location.reload();
                }
        });

        fs.writeFile(json_location + '/general_settings.json', JSON.stringify(generalSettingsData[0]), 'utf8', function(err) {
            if (err) {
                console.error(err);
                return;
            } else {
                location.reload();
        }
    });
        
    };
    
    
    reader.readAsText(file);
}
// import camera and preset data

// reset camera and preset data
function reset_data(){
    const fs = require('fs');

    const data_camera = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];

    const data_preset =[];
    
    
    
    const jsonDataCamera = JSON.stringify(data_camera, null, 2); // Format data dengan 2 spasi indentasi
    const filePath = json_location + `/camera_list.json`;
    fs.writeFile(filePath, jsonDataCamera, (err) => {
      if (err) {
          console.error('Terjadi kesalahan saat menulis berkas:', err);
        } else {
            $('#import_or_reset').modal('hide');
            getCameraList(0);
            notification('info','Configuration has been successfully reset');
        }
    });
    
    const jsonDataPreset = JSON.stringify(data_preset, null, 2); // Format data dengan 2 spasi indentasi
    for (let i = 0; i <= 9; i++) {
        const filePathPreset = json_location + `/group` + i +`_presets.json`;
        fs.writeFile(filePathPreset, jsonDataPreset, (err) => {
            if (err) {
              console.error('Terjadi kesalahan saat menulis berkas:', err);
            } else {
              $('#import_or_reset').modal('hide');
              getCameraList(0);
              notification('info','Configuration has been successfully reset');
            }
          });
    }

}
// reset camera and preset data



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

const prevButtonedit_editpreset = document.getElementById("prevBtn_editpreset");
const nextButton_editpreset = document.getElementById("nextBtn_editpreset");
const contentPages_editpreset = document.querySelectorAll(".page-editpreset");

let currentPage_editpreset = 0;

function showPage_editpreset(pageIndex) {
  contentPages_editpreset.forEach((page, index) => {
    if (index === pageIndex) {
      page.classList.remove("d-none");
    } else {
      page.classList.add("d-none");
    }
  });

}

function updateButtons_editpreset() {
  prevButtonedit_editpreset.disabled = currentPage_editpreset === 0;
  nextButton_editpreset.disabled = currentPage_editpreset === contentPages_editpreset.length - 1;
}

prevButtonedit_editpreset.addEventListener("click", () => {
  if (currentPage_editpreset > 0) {
    currentPage_editpreset--;
    showPage_editpreset(currentPage_editpreset);
    updateButtons_editpreset();
  }
});

nextButton_editpreset.addEventListener("click", () => {
  if (currentPage_editpreset < contentPages_editpreset.length - 1) {
    currentPage_editpreset++;
    showPage_editpreset(currentPage_editpreset);
    updateButtons_editpreset();
  }
});

// Initial setup
showPage_editpreset(currentPage_editpreset);
updateButtons_editpreset();

const prevButton_recallpreset = document.getElementById("prevBtn_recallpreset");
const nextButton_recallpreset = document.getElementById("nextBtn_recallpreset");
const contentPages_recallpreset = document.querySelectorAll(".page-recallpreset");

let currentPage_recallpreset = 0;

function showPage_recallpreset(pageIndex) {
  contentPages_recallpreset.forEach((page, index) => {
    if (index === pageIndex) {
      page.classList.remove("d-none");
    } else {
      page.classList.add("d-none");
    }
  });

}

function updateButtons_recallpreset() {
  prevButton_recallpreset.disabled = currentPage_recallpreset === 0;
  nextButton_recallpreset.disabled = currentPage_recallpreset === contentPages_recallpreset.length - 1;
}

prevButton_recallpreset.addEventListener("click", () => {
  if (currentPage_recallpreset > 0) {
    currentPage_recallpreset--;
    showPage_recallpreset(currentPage_recallpreset);
    updateButtons_recallpreset();
  }
});

nextButton_recallpreset.addEventListener("click", () => {
  if (currentPage_recallpreset < contentPages_recallpreset.length - 1) {
    currentPage_recallpreset++;
    showPage_recallpreset(currentPage_recallpreset);
    updateButtons_recallpreset();
  }
});

// Initial setup
showPage_recallpreset(currentPage_recallpreset);
updateButtons_recallpreset();


//Set focus behavior

function focus_mouseevent(event) {
    // Your click event handling code here
    var selected_camera_panel = document.getElementById("selected_camera_panel");
    let target_ip = $('#target').val();
    var offsetX = event.clientX - selected_camera_panel.getBoundingClientRect().left;
    var offsetY = event.clientY - selected_camera_panel.getBoundingClientRect().top;
    var koordinatX = Math.floor(offsetX / selected_camera_panel.offsetWidth * 10000) + 1;
    var koordinatY = Math.floor(offsetY / selected_camera_panel.offsetHeight * 10000) + 1;
    $.ajax(target_ip+"/-wvhttp-01-/control.cgi?focus.frame.1.x="+koordinatX+"&focus.frame.1.y="+koordinatY+"&focus.action=one_shot");
}
//Set focus behavior

//moving ptz by mouse event

function ptz_mouseevent(event) {
    var selected_camera_panel = $("#selected_camera_panel");
    let offsetX = event.pageX - selected_camera_panel.offset().left;
    let offsetY = event.pageY - selected_camera_panel.offset().top;
    let centerX = selected_camera_panel.width() / 2;
    let centerY = selected_camera_panel.height() / 2;

    let x = (offsetX - centerX) * 700 / centerX;
    let y = (centerY - offsetY) * 300 / centerY;

    x = Math.min(Math.max(x, -700), 700);
    y = Math.min(Math.max(y, -300), 300);

    x = Math.round(x);
    y = Math.round(y);

    let target_ip = $('#target').val();

    const xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        target_ip + "/-wvhttp-01-/info.cgi"
    );
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
        const responseResult = xhr.responseText;

        const startIndex_pan = responseResult.indexOf("c.1.pan");
        const endIndex_pan = responseResult.indexOf("\n", startIndex_pan);
        let panValue = parseInt(responseResult.slice(startIndex_pan + 9, endIndex_pan));

        const startIndex_tilt = responseResult.indexOf("c.1.tilt");
        const endIndex_tilt = responseResult.indexOf("\n", startIndex_tilt);
        let tiltValue = parseInt(responseResult.slice(startIndex_tilt + 10, endIndex_tilt));

        let move_pan = panValue + x;
        let move_tilt = tiltValue + y;
        $.ajax(target_ip+"/-wvhttp-01-/control.cgi?pan="+move_pan+"&tilt="+move_tilt+"&pan.speed.pos=10000&tilt.speed.pos=10000");
        } else {
        console.log(`Error: ${xhr.status}`);
        }
    };    
};

function updateNilai() {
    let target_ip = $('#target').val();
    $.ajax(target_ip + "/-wvhttp-01-/control.cgi?zoom=stop");
    // Memperbarui tampilan nilai
}

var selected_camera_panel = document.getElementById("selected_camera_panel");

// Mendeteksi scroll mouse
function zoom_mouseevent(event) {
    let z_speed = $('#zoom_speed_range').val();
    let target_ip = $('#target').val();
    if (event.deltaY > 0) {
        // Scroll ke bawah (mengurangi nilai)
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?zoom=wide&zoom.speed.dir=" + z_speed, {
            complete: function () {
                setTimeout(updateNilai, 500); // Menggunakan setTimeout dengan benar
            }
        });
    } else if (event.deltaY < 0) {
        // Scroll ke atas (menambah nilai)
        $.ajax(target_ip + "/-wvhttp-01-/control.cgi?zoom=tele&zoom.speed.dir=" + z_speed, {
            complete: function () {
                setTimeout(updateNilai, 500); // Menggunakan setTimeout dengan benar
            }
        });
    }
};

//moving ptz by mouse event

$('#radio_pt, #radio_focusbehaviour').on('change', function() {
    var selected_camera_panel = document.getElementById("selected_camera_panel");
    if ($('#radio_focusbehaviour').is(':checked')) {
        selected_camera_panel.addEventListener("click", focus_mouseevent);
        selected_camera_panel.removeEventListener("click", ptz_mouseevent);
        selected_camera_panel.removeEventListener("wheel", zoom_mouseevent);
        $('#selected_camera_panel').css('cursor', 'url(../assets/img/asset_icon/oneshotAF.png), auto'); 
    }
    if ($('#radio_pt').is(':checked')) {
        selected_camera_panel.removeEventListener("click", focus_mouseevent);
        selected_camera_panel.addEventListener("click", ptz_mouseevent);
        selected_camera_panel.addEventListener("wheel", zoom_mouseevent);
        $('#selected_camera_panel').css('cursor', 'auto'); 
      }
});

