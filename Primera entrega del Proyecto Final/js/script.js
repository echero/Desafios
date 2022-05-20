import {Tradicional, Cancelable} from './Clases.js'

let tipoPlazoFijo, montoDeposito, dias, resultadoTasaInteres, confirmar, plazoFijoTr, plazoFijoCa, otroPlazoFijo = true, arrayPlazoFijoT = [], arrayPlazoFijoC = []

    //METODO PARA SEGUIR GENERANDO PLAZOS FIJOS LUEGO DE CARGAR UNO
    function generarOtroPlazoFijo() {
        let otroPlazoFijo
    
        otroPlazoFijo = prompt("Quiere generar otro plazo Fijo. (SI / No)" ).toUpperCase()
    
        if(otroPlazoFijo === "SI"){
             otroPlazoFijo = true
        }else{
            otroPlazoFijo = false
        }

        return otroPlazoFijo
    }

    //METODO QUE AGREGA UN PLAZO FIJO TRAIDICIONAL Y MUESTRA LOS DATOS
    function agregarPazoFijoT(plazoFijo){
        arrayPlazoFijoT.push(plazoFijo)
        plazoFijo.mostrarPlazoFijoCargado(plazoFijo)
    }

    //METODO QUE AGREGA UN PLAZO FIJO PRECANCEABLE Y MUESTRA LOS DATOS
    function agregarPazoFijoC(plazoFijo){
        arrayPlazoFijoC.push(plazoFijo)
        plazoFijo.mostrarPlazoFijoCargado(plazoFijo)
    }

    //METODO QUE AL TERMINAR LA CARGA DE LOS PLAZOS FIJOS MUESTRE TODOS LOS PLAZOS FIJOS CARGADOS
    function mostrarTodosLosPlazosFijos(){
        if(arrayPlazoFijoT.length > 0){
            plazoFijoTr.mostrarTodosLosPlazosFijosTradicionales(arrayPlazoFijoT)
        }else{
            alert("Usted no dispone de Plazos Fijos Tradicionales")
        }
        if(arrayPlazoFijoC.length > 0){
            plazoFijoCa.mostrarTodosLosPlazosFijosCancelables(arrayPlazoFijoC)
        }else{
            alert("Usted no dispone de Plazos Fijos Precancelables")
        }
    }
    

    do{
    
        tipoPlazoFijo = prompt("Que tipo de plazo fijo quiere realizar? (T => TRADICIONAL / P => PRECANCELABLE)").toUpperCase()
        montoDeposito = parseInt(prompt("Ingrese el monto a depositar"))
        dias = parseInt(prompt("Ingrese la cantidad de dias que quiere generar su deposito"))
    
        if( tipoPlazoFijo != "T" && tipoPlazoFijo != "P" ){
    
            alert("Por favor ingrese un tipo de plazo fijo existente (T / P)")
    
        }else if((isNaN(montoDeposito) || isNaN(dias)) || (montoDeposito < 1 || dias < 1) ){
            alert("Por favor ingrese un numero valido, y que sea mayor a 0")
        }else if((tipoPlazoFijo === "T" || tipoPlazoFijo === "P") && ((!isNaN(montoDeposito) || !isNaN(dias)) || (montoDeposito >= 1 || dias >= 1))){
            
            if(tipoPlazoFijo === "T"){
                plazoFijoTr = new Tradicional(montoDeposito, dias) 
                resultadoTasaInteres = plazoFijoTr.calcularTasa() 
            }else if(tipoPlazoFijo === "P"){
                plazoFijoCa = new Cancelable(montoDeposito, dias)
                resultadoTasaInteres = plazoFijoCa.calcularTasa() 
            }
            
            confirmar = prompt(`El interes ha generar por ${dias} dias es de: $${resultadoTasaInteres}. confirmar plazo fijo (Si/No)`).toUpperCase()
            
            if(confirmar ==="SI" && tipoPlazoFijo === "T"){
                agregarPazoFijoT(plazoFijoTr)
            }else if(confirmar ==="SI" && tipoPlazoFijo === "P"){
                agregarPazoFijoC(plazoFijoCa)
            }else{
                alert("No se ha genreado el plazo fijo")
            }

            otroPlazoFijo = generarOtroPlazoFijo()

        }
        
    
    }while((tipoPlazoFijo != "T" && tipoPlazoFijo != "P") || (isNaN(montoDeposito) || isNaN(dias)) || (montoDeposito < 1 || dias < 1) || otroPlazoFijo)

    mostrarTodosLosPlazosFijos()