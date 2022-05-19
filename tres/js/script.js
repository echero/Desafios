import {Tradicional, Cancelable} from './Clases.js'

let tipoPlazoFijo, montoDeposito, dias, resultadoTasaInteres, confirmar, plazoFijo, otroPlazoFijo = true, arrayPlazoFijoT = [], arrayPlazoFijoC = []

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

    function agregarPazoFijoT(plazoFijo){
        arrayPlazoFijoT.push(plazoFijo)
        plazoFijo.mostrarPlazoFijoCargado(plazoFijo)
    }

    function agregarPazoFijoC(plazoFijo){
        arrayPlazoFijoC.push(plazoFijo)
        plazoFijo.mostrarPlazoFijoCargado(plazoFijo)
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
                plazoFijo = new Tradicional(montoDeposito, dias)   
            }else if(tipoPlazoFijo === "P"){
                plazoFijo = new Cancelable(montoDeposito, dias)
            }
            
            resultadoTasaInteres = plazoFijo.calcularRendimiento().toFixed(2)
            confirmar = prompt(`El interes ha generar por ${dias} dias es de: $${resultadoTasaInteres}. confirmar plazo fijo (Si/No)`).toUpperCase()
            
            if(confirmar ==="SI" && tipoPlazoFijo === "T"){
                agregarPazoFijoT(plazoFijo)
            }else if(confirmar ==="SI" && tipoPlazoFijo === "P"){
                agregarPazoFijoC(plazoFijo)
            }else{
                alert("No se ha genreado el plazo fijo")
            }

            otroPlazoFijo = generarOtroPlazoFijo()

        }
        
    
    }while((tipoPlazoFijo != "T" && tipoPlazoFijo != "P") || (isNaN(montoDeposito) || isNaN(dias)) || (montoDeposito < 1 || dias < 1) || otroPlazoFijo)