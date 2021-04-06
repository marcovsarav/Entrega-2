const { ipcRenderer } = require('electron')

ipcRenderer.on('respuesta', (event, args) => {
 alert(args)
})