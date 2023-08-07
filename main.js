const { app, BrowserWindow } = require('electron')
const path = require('path')
const si = require('systeminformation');

let hid = '';

si.system().then(data => {
  hid = data.uuid;
}).catch(error => console.error(error));
 
let mainWindow

const delay = ms => new Promise(res => setTimeout(res, ms));

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 800,
    icon: path.join(__dirname, 'resources/assets/img/icon.ico'),
    
    // frame:false,
    //remove menubar electron
    autoHideMenuBar: true,

    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false,
      
      //disable devtools (ctrl+shift+i)
      // devTools: false,

    preload: path.join(__dirname, 'preload.js')
  }})
  // win.webContents.openDevTools();
  mainWindow.loadFile(path.join(__dirname, 'resources/views/index.html'));
}

async function createBackgroundTask () {
  while(true) {
    const myBody = {
        hid
    }
    var rejected = false;
    try {
      const response = await Promise.race([
        fetch('http://db.vstream.asia/backend/validateHid', {
            method: 'POST',
            body: JSON.stringify(myBody),
            headers: {
            'Content-Type': 'application/json'
            }
        }),
        new Promise((_, reject) =>
            setTimeout(() => reject(rejected = true), 5000)
        )
      ]);
      const res = await response.json();
      if (!res.success || rejected) {
        mainWindow.loadFile(path.join(__dirname, 'resources/views/index.html'));
      }
    } catch {
      mainWindow.loadFile(path.join(__dirname, 'resources/views/index.html'));
    }
    // await delay(24*60*60*1000);
    await delay(10000);
  }
}

 
app.whenReady().then(() => {
  createWindow()
  createBackgroundTask()
  //Untuk Mac os perlu melakukan create Window saat active
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
      createBackgroundTask()
    }
  });
});
 
app.on('window-all-closed', () =>{
  //Selain macc os perlu memanggil method quit untuk benar benar close aplikasi
  if (process.platform !== 'darwin') {
    app.quit()
  }
});