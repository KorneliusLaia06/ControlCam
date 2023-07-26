const si = require('systeminformation');

let hid = null;

si.system().then(data => {
  hid = data.uuid;
  if (hid) {
    localStorage.setItem("hid", hid);
  }
}).catch(error => console.error(error));

window.addEventListener('DOMContentLoaded', () => {
  if (hid) {
    localStorage.setItem("hid", hid);
  }

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text;
  }
  
  for (const type of ['chrome', 'node', 'electron', 'require']) {
    replaceText(`${type}-version`, process.versions[type])
  }

})
  