const { app, BrowserWindow } = require('electron')
const path = require('path')
 

function createWindow () {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 800,
    
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
  win.loadFile(path.join(__dirname, 'resources/views/index.html'));
}

 
app.whenReady().then(() => {
  createWindow()
  //Untuk Mac os perlu melakukan create Window saat active
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
     createWindow()
    }
  });
});
 
app.on('window-all-closed', () =>{
  //Selain macc os perlu memanggil method quit untuk benar benar close aplikasi
  if (process.platform !== 'darwin') {
    app.quit()
  }
})