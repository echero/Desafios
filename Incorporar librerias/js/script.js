import {Auto} from "./Clases.js";

const auto1 = new Auto("Volkswagen", "Gol", 2000, 3, 500000, "https://http2.mlstatic.com/D_NQ_NP_877361-MLA29314336696_022019-O.jpg")
const auto2 = new Auto("Volkswagen", "Fox", 2005, 5, 650000, "http://www.carsmagazine.com.ar/wp-content/uploads/2010/04/nuevo-vw-fox-test-2.jpg")
const auto3 = new Auto("Renault", "Clio", 2010, 5, 700000, "http://lh5.ggpht.com/_R2-gkK1x6pY/SfcAM7l2AZI/AAAAAAAAADc/wkG_3HOtZwc/image%5B5%5D.png?imgmax=800")
const auto4 = new Auto("Renault", "Megane", 2011, 3, 750000, "https://www.km77.com/media/fotos/renault_megane_2006_2063_1.jpg")
const auto5 = new Auto("Fiat", "Cronos", 2020, 5, 850000, "https://upload.wikimedia.org/wikipedia/commons/1/16/Fiat_Cronos_1.8_16V_E.Torq_Precision.jpg")
const auto6 = new Auto("Fiat", "Argo", 2021, 3, 950000, "https://www.blogdecoches.net/wp-content/uploads/2021/09/5-700x367.jpg")

const autos = [auto1, auto2, auto3, auto4, auto5, auto6]

// FUNCION QUE CALCULA MEDIANTE UN SPREAD, MAP Y REDUCE EL TOTAL DEL CAPITAL INVERTIDO
function mostrarCapitalInvertido(){
    const sumaTotal = [...autos].map(autos => autos.precio).reduce((prev, act) => prev + act, 0)
    total.innerHTML = `<p><span style="font-weight:700">Monto total invertido: </span>$${sumaTotal}</p>`
}

//LOCAL STORAGE PARA OCUALTAR LOS PRECIOS DE LAS CARD DE LOS AUTOS
let precios

localStorage.getItem('precios') ? precios = localStorage.getItem('precios') : localStorage.setItem('precios', 'ver')

let formulario = document.getElementById('formAuto')
let divAutos = document.getElementById('divAutos')
let botonOcultar = document.getElementById('botonOcultar')
let botonVer = document.getElementById('botonVer')
let total = document.getElementById("total")

autos.forEach((auto, indice) => {
    divAutos.innerHTML += `
        <div class="card" id="auto${indice}" style="width: 18rem; margin: 2%">
            <img src="${auto.imagen}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${auto.marca} ${auto.modelo} ${auto.año} ${auto.cantPuertas}P.</h5>
                    <p id="precio${indice}" class="card-text">Precio: $${auto.precio}</p>
                    <button class="btn btn-danger" id="boton${indice}">Eliminar</button>
                </div>
        </div> 
    `
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    let dataForm = new FormData(e.target)

    const auto = new Auto(dataForm.get('marca'), dataForm.get('modelo'), dataForm.get('año'), dataForm.get('puertas'), parseInt(dataForm.get('precio')), dataForm.get('imagen'))

    autos.push(auto)

    formulario.reset()
    
    divAutos.innerHTML += `
    <div class="card" id="auto${autos.length-1}" style="width: 18rem; margin: 2%">
        <img src="${dataForm.get('imagen')}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${dataForm.get('marca')} ${dataForm.get('modelo')} ${dataForm.get('año')} ${dataForm.get('puertas')}P.</h5>
            <p id="precio${autos.length-1}" class="card-text">Precio: $${dataForm.get('precio')}</p>
            <button class="btn btn-danger" id="boton${autos.length-1}">Eliminar</button>
        </div>
    </div> ` 

    //IMPLEMENTACION DE LIBRERIA TOASTIFY
    Toastify({
        text: "Se ha creado exitosamente!",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom right, #3EAA22, #027301)",
        },
        onClick: function(){
        } // Callback after click
      }).showToast();

    mostrarCapitalInvertido()

})

if(precios === 'ocultar') {
    for(let i=0; i<autos.length; i++){
        document.getElementById(`precio${i}`).classList.add("ocultar")
    }
    
}

botonOcultar.addEventListener('click', () => {
    for(let i=0; i<autos.length; i++){
        document.getElementById(`precio${i}`).classList.add("ocultar")
    }
     localStorage.setItem('precios', 'ocultar')
     
     //IMPLEMENTACION DE LIBRERIA TOASTIFY
     Toastify({
        text: "Se han ocultado los precios!",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom right, #340138, #C32057)",
        },
        onClick: function(){
        } // Callback after click
      }).showToast();
 })
 
 botonVer.addEventListener('click', () => {
     for(let i=0; i<autos.length; i++){
        document.getElementById(`precio${i}`).classList.remove("ocultar")
     }
     
     localStorage.setItem('precios', 'ver')
     
     //IMPLEMENTACION DE LIBRERIA TOASTIFY
     Toastify({
        text: "Se han activado los precios!",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom right, #3EAA22, #027301)",
        },
        onClick: function(){
        } // Callback after click
      }).showToast();
 })

 mostrarCapitalInvertido()