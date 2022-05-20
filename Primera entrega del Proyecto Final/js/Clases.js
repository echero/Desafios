class PlazoFijos {
    constructor(importe, dias){
        this.importe = importe
        this.dias = dias
    }

    // METODO PARA CALCULAR EL IMPORTE QUE REDITUA EL PLAZO FIJO

    calcularTasa () {

        return (((this.importe * (this.tasaInteres/ 100)) / 365) * this.dias).toFixed(2)

    } 

    // METODO PARA MOSTRAR EL PLAZO FIJO CARGADO

    mostrarPlazoFijoCargado(objeto) {

        alert(`Su Plazo Fijo se ha generado EXITOSAMENTE:\nFecha de Creacion: ${objeto.fechaCreacion.getDate()}-${(objeto.fechaCreacion.getMonth() + 1)}-${objeto.fechaCreacion.getFullYear()} ${objeto.fechaCreacion.getHours()}:${objeto.fechaCreacion.getMinutes()}:${objeto.fechaCreacion.getSeconds()}\nFecha de Finalizacion: ${objeto.fechaFinalizacion.getDate()}-${(objeto.fechaFinalizacion.getMonth() + 1)}-${objeto.fechaFinalizacion.getFullYear()}\nMonto Invertido: $${objeto.importe}\nTasa de Interes: ${objeto.tasaInteres}%\nRendimiento al finalizar los ${objeto.dias} dias: $${objeto.calcularTasa()}`)
    
    }

    //METODO QUE SUMA LOS DIAS INGRESADOS PARA GENERAR LA FECHA DE FINALIZACION

    fechaLimite(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days)
        return res
    }

}

export class Tradicional extends PlazoFijos {

    constructor(importe, dias){
        super(importe, dias)
        this.tasaInteres = 46
        this.fechaCreacion = new Date() 
        this.fechaFinalizacion = this.fechaLimite(this.fechaCreacion, this.dias)
    }

    // METODO PARA MOSTRAR TODOS LOS PLAZOS FIJOS CARGADOS TRADICIONALES

    mostrarTodosLosPlazosFijosTradicionales(array) {

        let cantPlazoFijos = array.length 
        let mensaje = ''

        array.forEach((e) => {
            mensaje += 'Monto depositado: $'+ e.importe.toFixed(2) + '\nCantidad de dias: ' +e.dias + '\nTasa de Interes: ' + e.tasaInteres + '%' + '\nInteres ha generar: $' + this.calcularTasa(e.importe) + '\nFecha de Finalización: ' + e.fechaFinalizacion.getDate()+ '-' + (e.fechaFinalizacion.getMonth() + 1) + '-' + e.fechaFinalizacion.getFullYear() +'\n----------------\n'
        })

        alert(`Usted tiene generado al dia de la fecha ${cantPlazoFijos} PLAZO FIJO TRADICIONAL.\n\n${mensaje}`) 
            
    }
}

export class Cancelable extends PlazoFijos {

    constructor(importe, dias){
        super(importe, dias)
        this.tasaInteres = 40
        this.activo= true
        this.fechaCreacion = new Date()
        this.fechaFinalizacion = this.fechaLimite(this.fechaCreacion, this.dias)
    }

    // METODO PARA MOSTRAR TODOS LOS PLAZOS FIJOS CARGADOS PRECANCELABLES Y QUE ESTEN ACTIVOS

    mostrarTodosLosPlazosFijosCancelables(array) {
        
        let cantPlazoFijos = array.length 
        let mensaje = ''

        array.forEach((e) => {

        if(e.activo){
            mensaje += 'Monto depositado: $'+ e.importe.toFixed(2) + '\nCantidad de dias: ' +e.dias + '\nTasa de Interes: ' + e.tasaInteres + '%' + '\nInteres ha generar: $' + this.calcularTasa(e.importe) + '\nFecha de Finalización: ' + e.fechaFinalizacion.getDate()+ '-' + (e.fechaFinalizacion.getMonth() + 1) + '-' + e.fechaFinalizacion.getFullYear() + '\n----------------\n'
        }})

        if(mensaje !== ''){
            alert(`Usted tiene generado al dia de la fecha ${cantPlazoFijos} PLAZO FIJO PRECANCELABLE\n\n${mensaje}`) 
        }       
    }
}