class PlazoFijos {
    constructor(importe, dias){
        this.importe = importe
        this.dias = dias
    }

    calcularRendimiento () {
        return ((this.importe * (this.tasaInteres/ 100)) / 365) * this.dias
    } 

    mostrarPlazoFijoCargado(objeto) {
        alert(`Su Plazo Fijo se ha generado EXITOSAMENTE:\nFecha de Creacion: ${objeto.fechaCreacion.getDate()}-${(objeto.fechaCreacion.getMonth() + 1)}-${objeto.fechaCreacion.getFullYear()} ${objeto.fechaCreacion.getHours()}:${objeto.fechaCreacion.getMinutes()}:${objeto.fechaCreacion.getSeconds()}\nMonto Invertido: $${objeto.importe}\nTasa de Interes: ${objeto.tasaInteres}%\nRendimiento al finalizar los ${objeto.dias} dias: $${objeto.calcularRendimiento().toFixed(2)}`)
    }
}

export class Tradicional extends PlazoFijos {

    constructor(importe, dias){
        super(importe, dias)
        this.tasaInteres = 46
        this.fechaCreacion = new Date() 
    }
}

export class Cancelable extends PlazoFijos {

    constructor(importe, dias){
        super(importe, dias)
        this.tasaInteres = 40
        this.activo= true
        this.fechaCreacion = new Date()
        this.arrayPlazosFijosCancelable = []
    }
}