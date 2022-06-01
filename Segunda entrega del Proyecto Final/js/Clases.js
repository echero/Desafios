class PlazoFijos {
    constructor(importe, dias){
        this.importe = importe
        this.dias = dias
    }

    // METODO PARA CALCULAR EL IMPORTE QUE REDITUA EL PLAZO FIJO

    calcularTasa () {

        return (((this.importe * (this.tasaInteres/ 100)) / 365) * this.dias).toFixed(2)

    } 

    //METODO QUE SUMA LOS DIAS INGRESADOS PARA GENERAR LA FECHA DE FINALIZACION

    fechaLimite(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days)
        return res
    }

    agregarPlazosFijosDerecha(indice){
        return `
        <li class="list-group-item d-flex justify-content-between lh-sm"  ${this.getClassName() === 'Precancelable' ? `id="card-Derecha-Precancelable${indice}">` : `id="card-Derecha-Tradicional${indice}">`}
        <div>
          <h6 class="my-0">Monto depositado:</h6>
          <small class="text-muted">Rendimiento: $${this.calcularTasa()}</small>
          <small class="text-muted" style="display: block;">Cantidad de días: ${this.dias}</small>
        </div>
        <span class="text-muted">$${this.importe}</span>
      </li>
        `
    }

    mostrarPlazosFijosNuevos(indice){
        return `
        <div id=card-${this.getClassName()}-${indice} class="card" style="width: 18rem; margin: 1%">
        <div class="card-body">
          <h5 class="card-title" style="${this.getClassName() === 'Tradicional' ? "background-color: #0d6efd;" : "background-color: #dc3545;"} color: #fff;">${this.getClassName()}</h5>
          <p class="card-text">Monto depositado: $${this.importe}</p>
          <p class="card-text">Cantidad de días: ${this.dias}</p>
          <p class="card-text">Porcentaje de interes: ${this.tasaInteres}%</p>
          <p class="card-text">Interes generado: $${this.calcularTasa()}</p>         
          <p class="card-text">Fecha de vencimiento: ${this.fechaFinalizacion.getDate()}-${this.fechaFinalizacion.getMonth()+1}-${this.fechaFinalizacion.getFullYear()}</p>
          ${this.getClassName() === 'Precancelable' ? `<button class="btn btn-danger" id="boton${indice}">Cancelar</button>` : ''}
        </div>
      </div>
        `
    }

    mostrarHistorial() {
        return `
        <div class="card" style="width: 18rem; margin: 1%">
        <div class="card-body">
          <h5 class="card-title" style="${this.getClassName() === 'Tradicional' ? "background-color: #0d6efd;" : "background-color: #dc3545;"} color: #fff;">${this.getClassName()}</h5>
          <p class="card-text">Monto depositado: $${this.importe}</p>
          <p class="card-text">Cantidad de días: ${this.dias}</p>
          <p class="card-text">Porcentaje de interes: ${this.tasaInteres}%</p>
          <p class="card-text">Interes generado: $${this.calcularTasa()}</p>
          <p class="card-text">Fecha de creación: ${this.fechaCreacion.getDate()}/${this.fechaCreacion.getMonth()+1}/${this.fechaCreacion.getFullYear()}</p>          
          <p class="card-text">Fecha de vencimiento: ${this.fechaFinalizacion.getDate()}/${this.fechaFinalizacion.getMonth()+1}/${this.fechaFinalizacion.getFullYear()}</p>
          <p class="card-text"><span style="font-weight: 700;">Total cobrado:</span> $${(this.importe + parseFloat(this.calcularTasa())).toFixed(2)}</p>
        </div>
      </div>
        `
    }

    getClassName() {
        return this.constructor.name;
    }

}

export class Tradicional extends PlazoFijos {

    constructor(importe, dias, fechaCreacion=new Date()){
        super(importe, dias)
        this.tasaInteres = 46
        this.fechaCreacion = fechaCreacion
        this.fechaFinalizacion = this.fechaLimite(this.fechaCreacion, this.dias)
    }

}

export class Precancelable extends PlazoFijos {

    constructor(importe, dias, activo= true, fechaCreacion=new Date()){
        super(importe, dias)
        this.tasaInteres = 40
        this.activo= activo
        this.fechaCreacion = fechaCreacion
        this.fechaFinalizacion = this.fechaLimite(this.fechaCreacion, this.dias)
    }
}

// CLASE QUE ARMA EL MODAL QUE MUESTRA EL DETALLE DEL PLAZO FIJO A CARGAR
export class Showmodal {

    constructor(title, objeto, yesBtnLabel = 'Yes', noBtnLabel = 'Cancel', callback){
        this.title = title
        this.objeto = objeto
        this.yesBtnLabel= yesBtnLabel
        this.noBtnLabel = noBtnLabel
        this.callback = callback
    }

    crearShowModal(objeto){

       var modalWrap = null

        if (modalWrap !== null) {
            modalWrap.remove();
        }

        modalWrap = document.createElement('div');
        modalWrap.innerHTML = `
            <div class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-light">
                            <h5 class="modal-title">${objeto.title}: ${(objeto.objeto.getClassName() == "Tradicional") ? 'Tradicional' : 'Precancelable'}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            <div class="modal-body">
                                <p class="card-text">Monto Invertido: $${objeto.objeto.importe}</p>
                                <p class="card-text">Cantidad de Días: ${objeto.objeto.dias}</p>
                                <p class="card-text">Tasa de Interes: ${objeto.objeto.tasaInteres}%</p>
                                <p class="card-text">Interes a Generar: $${objeto.objeto.calcularTasa()}</p>
                                <p class="card-text">Fecha de Vencimiento: ${objeto.objeto.fechaFinalizacion.getDate()}-${objeto.objeto.fechaFinalizacion.getMonth()+1}-${objeto.objeto.fechaFinalizacion.getFullYear()}</p>
                            </div>
                                <div class="modal-footer bg-light">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${objeto.noBtnLabel}</button>
                                    <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">${objeto.yesBtnLabel}</button>
                                </div>
                    </div>
                </div>
            </div>
        `;
  
        modalWrap.querySelector('.modal-success-btn').onclick = objeto.callback;
  
        document.body.append(modalWrap);
  
        var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
        modal.show();
    }

}

// OBJETOS QUE SIMULAN BASE DE DATOS
const plazoFijoT1 = new Tradicional(100000, 30, new Date("05/01/2021"))
const plazoFijoT2 = new Tradicional(150000, 40, new Date("06/01/2021"))
const plazoFijoT3 = new Tradicional(250000, 20, new Date("07/01/2021"))
const plazoFijoT4 = new Tradicional(350000, 15, new Date("08/01/2021"))

const plazoFijoC1 = new Precancelable(100000, 30, false, new Date("09/01/2021"))
const plazoFijoC2 = new Precancelable(150000, 40, false, new Date("10/01/2021"))
const plazoFijoC3 = new Precancelable(250000, 20, false, new Date("11/01/2021"))
const plazoFijoC4 = new Precancelable(350000, 15, false, new Date("12/01/2021"))

export const historialPlazosFijosT = [plazoFijoT1, plazoFijoT2, plazoFijoT3, plazoFijoT4]

export const historialPlazosFijosC = [plazoFijoC1, plazoFijoC2, plazoFijoC3, plazoFijoC4]