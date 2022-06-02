let divCotizacion = document.getElementById('divCotizacion')

async function comp() {

    const items = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    const dataItems = await items.json()

    return render(dataItems) 
}
    
function render(dataItems) {

    dataItems.map(i => {
        divCotizacion.innerHTML += `
        <div class="card m-3" style="width: 15rem;">
        <div class="card-body">
          <h5 class="card-title">${i.casa.nombre}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Valor compra: $${i.casa.compra}</li>
          <li class="list-group-item">Valor venta: $${i.casa.venta}</li>
          <li class="list-group-item">Variación: ${i.casa.variacion == undefined ? 'No tiene' : i.casa.variacion}</li>
        </ul>
      </div>
        `
    })
    
}

comp()