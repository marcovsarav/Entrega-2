const {app, BrowserWindow} = require('electron')
const { ipcMain } = require('electron')

let ventana
function ventanaPrincipal(){
  ventana = new BrowserWindow({
    width: 400,
    height: 215,
    webPreferences: ({
      nodeIntegration: true
    })
  })

  ventana.loadFile('./formulario/formulario.html')
}

let ventana2
function ventanaSecundaria(){
  ventana2 = new BrowserWindow({
    width: 950,
    height: 300,
    webPreferences: ({
      nodeIntegration: true
    })
  })

  ventana2.loadFile('./Producto/segundo.html')
}

app.whenReady().then(ventanaPrincipal)

ipcMain.on('error-formulario', function(event, args){
  var lineas = parseInt(args)
  var alto = 215 + (lineas * 20)
   ventana.setSize(400, alto)   
})

ipcMain.on('formulario-valido', (event, args) =>{
  ventana.setSize(400, 215)
  console.log(args)
  ventanaSecundaria()
  ventana2.webContents.send('mensaje', args)
        
})