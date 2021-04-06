const { ipcRenderer } = require('electron')
document.getElementById('formulario').addEventListener('submit', function(event){
  event.preventDefault()

  var error_pass = document.getElementById('error_pass')
  var nombre = document.getElementById('nombre')
  var pass = document.getElementById('pass')
  var errores = 0

  pass.classList.remove('invalid')
  error_pass.innerHTML = ""

  if(pass.value.length < 8){
    error_pass.innerHTML += "Tiene que tener 8 caracteres<br>"
    pass.classList.add('invalid')
    errores++
  }
  
  var exprMin = RegExp("[a-z]")
  var exprMay = RegExp("[A-Z]")
  var exprNum = RegExp("[0-9]")
  var exprSim = RegExp("[\-\\\_]")

  if(!pass.value.match(exprMin)){
    error_pass.innerHTML+="Tiene que tener una minuscula<br>"
    pass.classList.add('invalid')
    errores++
  }
  if(!pass.value.match(exprMay)){
    error_pass.innerHTML+="Tiene que tener una mayuscula<br>"
    pass.classList.add('invalid')
    errores++
  }
  if(!pass.value.match(exprNum)){
    error_pass.innerHTML+="Tiene que tener un número<br>"
    pass.classList.add('invalid')
    errores++
  }
  if(!pass.value.match(exprSim)){
    error_pass.innerHTML+="Tiene que tener un simbolo (- \ _)<br>"
    pass.classList.add('invalid')
    errores++
  }

  if(!pass.classList.contains('invalid')){
    ipcRenderer.send('formulario-valido', [nombre.value, pass.value])
    
  }else{
    ipcRenderer.send('error-formualrio', errores)
  }
 
})

ipcRenderer.on('respuesta', (event, args) => {
  alert(args)
})