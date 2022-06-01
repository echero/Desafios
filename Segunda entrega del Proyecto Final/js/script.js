import { Tradicional, Precancelable, Showmodal, historialPlazosFijosT, historialPlazosFijosC } from "./Clases.js"

let formulario, botonVer, botonOcultar, botonNuevos, botonHistorial, botonRendimiento, listaDerechaT, tarjetas, cantT, cantC, listaDerechaC, arrayPlazoFijoT = [], arrayPlazoFijoC = []

function alertaToastify(titulo, color) {
    Toastify({
        text: titulo,
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
                  background: `${(color === "Rojo") ? 'linear-gradient(to bottom right, #340138, #C32057)' : 'linear-gradient(to bottom right, #3EAA22, #027301)'}`,
                }
    }).showToast();
}

function eventoCancelarPlazoFijoC(){
    arrayPlazoFijoC.forEach((plazos, indice) => {
        if (plazos.activo){
        document.getElementById(`boton${indice}`).addEventListener('click', () =>{
        document.getElementById(`card-Precancelable-${indice}`).remove()
        document.getElementById(`card-Derecha-Precancelable${indice}`).remove()
        plazos.dias = plazos.fechaFinalizacion.getDate()-plazos.fechaCreacion.getDate()
        plazos.activo = false
        historialPlazosFijosC.push(plazos)
        arrayPlazoFijoC.splice(indice, 1)
        alertaToastify("Se ha cancelado el plazo Fijo!", "Rojo")
        if(arrayPlazoFijoC.length == 0){
            cantC.innerHTML =''
            listaDerechaC.innerHTML = `<p>No dispone de plazos fijos vigentes!</p>`
        }else{
            cantC.innerHTML = arrayPlazoFijoC.length
        }
    })}
})
}

//LOCAL STORAGE PARA OCUALTAR LOS PRECIOS DE LAS CARD DE LOS AUTOS
let plazosFijosDerecha

localStorage.getItem('plazosFijosDerecha') ? plazosFijosDerecha = localStorage.getItem('plazosFijosDerecha') : localStorage.setItem('plazosFijosDerecha', 'ver')

formulario = document.getElementById("formPlazoFijo")
botonNuevos = document.getElementById("botonNuevos")
botonHistorial = document.getElementById("botonHistorial")
botonRendimiento = document.getElementById("botonRendimiento")
botonVer = document.getElementById("botonVer")
botonOcultar = document.getElementById("botonOcultar")

listaDerechaT = document.getElementById("listaDerechaT")
listaDerechaC = document.getElementById("listaDerechaC")
tarjetas = document.getElementById("tarjetas")

cantT = document.getElementById('cantT')
cantC = document.getElementById('cantC')


//EVENTOS BOTON SUBMIT DEL FORMULARIOS
formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    let dataForm = new FormData(e.target)
    let plazoFijo

    if(dataForm.get("tipoPlazoFijo") === "T"){
        plazoFijo = new Tradicional(parseInt(dataForm.get('monto')),parseInt(dataForm.get('cantDias'),""))
    }else{
        plazoFijo = new Precancelable(parseInt(dataForm.get('monto')),parseInt(dataForm.get('cantDias'),"" ,""))
    }

    const modal = new Showmodal('Plazo Fijo a Confirmar', plazoFijo, "Si", "No", () => {
        if(dataForm.get("tipoPlazoFijo") === "T") {
            arrayPlazoFijoT.push(plazoFijo)
            cantT.innerHTML = arrayPlazoFijoT.length
            arrayPlazoFijoT.length == 1 ? listaDerechaT.innerHTML = plazoFijo.agregarPlazosFijosDerecha((arrayPlazoFijoT.length-1)) : listaDerechaT.innerHTML += plazoFijo.agregarPlazosFijosDerecha((arrayPlazoFijoT.length-1))
        }else{
            arrayPlazoFijoC.push(plazoFijo)
            cantC.innerHTML = arrayPlazoFijoC.length
            arrayPlazoFijoC.length == 1 ? listaDerechaC.innerHTML = plazoFijo.agregarPlazosFijosDerecha((arrayPlazoFijoC.length-1)) : listaDerechaC.innerHTML += plazoFijo.agregarPlazosFijosDerecha((arrayPlazoFijoC.length-1))
        }
        
        alertaToastify("Plazo fijo creado exitosamente!", "Verde")
    })

    modal.crearShowModal(modal)

    formulario.reset()

})

//EVENTO BOTONES DE LOS FILTROS HISTORIAL-NUEVOS-RENDIMIENTO

botonNuevos.addEventListener('click', () => {
    
    (arrayPlazoFijoT.length == 0 && arrayPlazoFijoC.length == 0)? tarjetas.innerHTML = "<p>No dispone de plazos fijos Nuevos!</p>" : tarjetas.innerHTML = ""
    
    arrayPlazoFijoT.forEach((todos, indice) => {
        tarjetas.innerHTML += todos.mostrarPlazosFijosNuevos(indice)

    })

    arrayPlazoFijoC.forEach((todos, indice) => {

        todos.activo ? tarjetas.innerHTML += todos.mostrarPlazosFijosNuevos(indice) : ''

    })

    eventoCancelarPlazoFijoC()
   
})

botonHistorial.addEventListener('click', () => {

    const historial = [...historialPlazosFijosT, ...historialPlazosFijosC]
    
    tarjetas.innerHTML = ""

    historial.forEach((historialTodos) => {
        tarjetas.innerHTML += historialTodos.mostrarHistorial()
    })
})

botonRendimiento.addEventListener('click', () => {

    const rendimiento = [...arrayPlazoFijoT, ...arrayPlazoFijoC, ...historialPlazosFijosT, ...historialPlazosFijosC]
    
    tarjetas.innerHTML = ""

    console.log(rendimiento)
})

//EVENTOS BOTON DE VER O OCULTAR LOS PLAZOS FIJOS DE LA DERECHA

if(plazosFijosDerecha === 'ocultar') {
    listaDerechaT.classList.add("ocultar")
    listaDerechaC.classList.add("ocultar")
}

botonOcultar.addEventListener('click', () => {
    listaDerechaT.classList.add("ocultar")
    listaDerechaC.classList.add("ocultar")

    localStorage.setItem("plazosFijosDerecha", "ocultar")

    alertaToastify("Se desactivaron los plazos fijos laterales!", "Rojo")
})


botonVer.addEventListener('click', () => {
    listaDerechaT.classList.remove("ocultar")
    listaDerechaC.classList.remove("ocultar")

    localStorage.setItem("plazosFijosDerecha", "ver")

    alertaToastify("Se activaron los plazos fijos laterales!", "Verde")
})