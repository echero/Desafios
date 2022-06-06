import { Tradicional, Precancelable, Showmodal, historialPlazosFijosT, historialPlazosFijosC } from "./Clases.js"

let formulario, plazosFijosDerecha, botonVer, botonOcultar, botonNuevos, botonHistorial, botonRendimiento, listaDerechaT, tarjetas, cantT, cantC, listaDerechaC, arrayPlazoFijoT = [], arrayPlazoFijoC = []

//FUNCION QUE GENERA EL ALERTA DE TOASTIFY 
//SE REUTILIZA EN VARIOS EVENTOS
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

//FUNCION QUE CANCELA LOS PLAZOS FIJOS PRECANCELABLES 
//Y MODIFICA SU ESTADO E IMPORTE Y INTERES A COBRAR
//TAMBIEN LO GUARDA EN EL ARRAY DEL HISTORIAL DE PLAZOS FIJOS
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

//FUNCION ASINCRONICA QUE HACE LA CONEXION CONTRA LA API DE CRIPTOYA 
//SE GENERO PARA REUTILIZARLA EN DISTINTOS LUGARES
async function comp() {
    
    const items = await fetch("https://criptoya.com/api/dolar")
    const dataItems = await items.json()

    return dataItems
}

//FUNCION ASINCRONICA DEVUELVE EL DOLAR SOLIDARIO DE LA API CRIPTOYA
//PARA PODER UTILIZARLA EN EL CALCULO DEL RENDIMIENTO EN DOLARES
const getDatos = () => {
    return new Promise((resolve, reject) => {
         resolve(comp().then((datos) => datos.solidario));
    });

}

//FUNCION QUE MUESTRE EN EL BODY LAS DIFERENTES COTIZACIONES DEL DOLAR
function mostrarCotizacionTop(arrayCoti){
    
    arrayCoti.forEach((cotizaciones, indice) =>{

        divCotizacionDolar.innerHTML += `
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">${indice==0 ? 'Oficial' : indice==1 ? 'Solidario*' : indice==2 ? 'Cont. Liqui' : indice==3 ? 'Cont. Bit.' : indice==4 ? 'Bolsa' : 'Blue'}</h5>
                    <p class="card-text" id="dolar${indice}">$${cotizaciones}</p>
                </div>
            </div>
        </div>
    `

    })

    
}

//FUNCION QUE RETORNA UN ARRAY CON LA SUMA DE LOS RENDIMIENTOS DE LOS PLAZOZ FIJOS EN EL AÑO 2021 POR MES PESOS
function rendimientoPorMesPesos(array, tipoPlazoFijo){
    let rendimientoPorMes= []
    let cantMes = 12
    let result

    for (let i = 1; i <= cantMes; i++) {

        result = array.filter(rendimiento => rendimiento.fechaFinalizacion.getMonth() +1 == i && rendimiento.fechaFinalizacion.getFullYear() == 2021 && rendimiento.getClassName() == tipoPlazoFijo)
        
        if(result.length == 0){
            rendimientoPorMes.push(0)
        }else{
            const initialValue = 0
            const sumWithInitial = result.map(item => item.calcularTasa()).reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
            rendimientoPorMes.push(sumWithInitial)
        }
        
    }
    return rendimientoPorMes
}

//FUNCION QUE RETORNA UN ARRAY CON LA SUMA DE LOS RENDIMIENTOS DE LOS PLAZOZ FIJOS EN EL AÑO 2021 POR MES DOLAR
function rendimientoPorMesDolar(array, tipoPlazoFijo, cotiDolar){
    let rendimientoPorMes= []
    let cantMes = 12
    let result

    for (let i = 1; i <= cantMes; i++) {

        result = array.filter(rendimiento => rendimiento.fechaFinalizacion.getMonth() +1 == i && rendimiento.fechaFinalizacion.getFullYear() == 2021 && rendimiento.getClassName() == tipoPlazoFijo)
        if(result.length == 0){
            rendimientoPorMes.push(0)
        }else{
            const initialValue = 0
            const sumWithInitial = result.map(item => item.calcularTasaDolar(cotiDolar)).reduce((previousValue, currentValue) => previousValue + currentValue, initialValue)
            rendimientoPorMes.push(sumWithInitial)
        }
        
    }
    return rendimientoPorMes
}

//LOCAL STORAGE PARA OCUALTAR LOS PLAZOS FIJOS DEL MARGEN DERECHO
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

    const modal = new Showmodal('Plazo Fijo a Confirmar', plazoFijo, "Si", "No", async () => {
        const cotiDolarS = await getDatos();
        
        if(dataForm.get("tipoPlazoFijo") === "T") {
            arrayPlazoFijoT.push(plazoFijo)
            cantT.innerHTML = arrayPlazoFijoT.length
            arrayPlazoFijoT.length == 1 ? listaDerechaT.innerHTML = plazoFijo.agregarPlazosFijosDerecha(arrayPlazoFijoT.length-1, cotiDolarS) : listaDerechaT.innerHTML += plazoFijo.agregarPlazosFijosDerecha(arrayPlazoFijoT.length-1, cotiDolarS)
        }else{
            arrayPlazoFijoC.push(plazoFijo)
            cantC.innerHTML = arrayPlazoFijoC.length
            arrayPlazoFijoC.length == 1 ? listaDerechaC.innerHTML = plazoFijo.agregarPlazosFijosDerecha(arrayPlazoFijoC.length-1, cotiDolarS) : listaDerechaC.innerHTML += plazoFijo.agregarPlazosFijosDerecha(arrayPlazoFijoC.length-1, cotiDolarS)
        }
        
        alertaToastify("Plazo fijo creado exitosamente!", "Verde")
    })

    modal.crearShowModal(modal)

    formulario.reset()

})

//EVENTO BOTONES DE LOS FILTROS HISTORIAL-NUEVOS-RENDIMIENTO
botonNuevos.addEventListener('click', async () => {
    const cotiDolarS = await getDatos();

    (arrayPlazoFijoT.length == 0 && arrayPlazoFijoC.length == 0)? tarjetas.innerHTML = "<p>No dispone de plazos fijos Nuevos!</p>" : tarjetas.innerHTML = ""
    
    arrayPlazoFijoT.forEach((todos, indice) => {
        tarjetas.innerHTML += todos.mostrarPlazosFijosNuevos(indice, cotiDolarS)

    })

    arrayPlazoFijoC.forEach((todos, indice) => {

        todos.activo ? tarjetas.innerHTML += todos.mostrarPlazosFijosNuevos(indice, cotiDolarS) : ''

    })

    eventoCancelarPlazoFijoC()
   
})

botonHistorial.addEventListener('click', async () => {
    const cotiDolarS = await getDatos();

    const historial = [...historialPlazosFijosT, ...historialPlazosFijosC]
    
    tarjetas.innerHTML = ""

    historial.forEach((historialTodos) => {
        tarjetas.innerHTML += historialTodos.mostrarHistorial(cotiDolarS)
    })
})

botonRendimiento.addEventListener('click', async () => {
    const cotiDolarS = await getDatos();

    const rendimiento = [...arrayPlazoFijoT, ...arrayPlazoFijoC, ...historialPlazosFijosT, ...historialPlazosFijosC]
    
    let arrayRendimientoT = rendimientoPorMesPesos(rendimiento, "Tradicional")
    let arrayRendimientoP = rendimientoPorMesPesos(rendimiento, "Precancelable")
    let arrayRendimientoTD = rendimientoPorMesDolar(rendimiento, "Tradicional", cotiDolarS)
    let arrayRendimientoPD = rendimientoPorMesDolar(rendimiento, "Precancelable", cotiDolarS)

    tarjetas.innerHTML = `  
                            <h4>Rendimiento en Pesos 2021</h4>
                            <canvas id="myChartPesos"></canvas>
                            <h4 class="mt-3">Rendimiento en Dolares 2021</h4>
                            <canvas id="myChartDolares"></canvas>
                                                            `

    const labels = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ];

      const myChartS = new Chart(
        document.getElementById('myChartPesos'), {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Plazos Fijos Tradicionales',
                        backgroundColor: '#0a53be',
                        borderColor: '#0a53be',
                        data: arrayRendimientoT,
                    },
                    {
                        label: 'Plazos Fijos Precancelables',
                        backgroundColor: '#dc3545',
                        borderColor: '#dc3545',
                        data: arrayRendimientoP,
                    }
                ]
            }
        },
      );

      const myChartD = new Chart(
        document.getElementById('myChartDolares'), {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Plazos Fijos Tradicionales',
                        backgroundColor: '#0a53be',
                        borderColor: '#0a53be',
                        data: arrayRendimientoTD,
                    },
                    {
                        label: 'Plazos Fijos Tradicionales',
                        backgroundColor: '#dc3545',
                        borderColor: '#dc3545',
                        data: arrayRendimientoPD,
                    }
                ]
            }
        },
      );

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

//API DOLAR
const interval = setInterval(() => {
    let data = comp()
    data.then(({oficial, solidario, ccl, mep, ccb, blue}) => {

    let arrayCotizacionDolar = [oficial, solidario, ccl, mep, ccb, blue]
    
    divCotizacionDolar.innerHTML = ''
    mostrarCotizacionTop(arrayCotizacionDolar)
    
    
    })
    .catch(error => {
        console.error(error)
        clearInterval(interval)
    })
}, 1000)