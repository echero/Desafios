const TASA_TRADICIONAL = 46
const TASA_PRECANCELABLE = 40
const DIAS_ANIO = 365
const PORCIENTO = 100

const plazoFijoTradicional = (montoDeposito, dias) =>  ((montoDeposito * (TASA_TRADICIONAL / PORCIENTO)) / DIAS_ANIO) * dias
const plazoFijoPrecancelable = (montoDeposito, dias) =>  ((montoDeposito * (TASA_PRECANCELABLE / PORCIENTO) ) / DIAS_ANIO) * dias
const sumaTotal = (rendimiento, deposito) => (rendimiento + deposito)

let tipoPlazoFijo,montoDeposito, dias

do{
    
    tipoPlazoFijo = prompt("Que tipo de plazo fijo quiere realizar? (T => TRADICIONAL / P => PRECANCELABLE)").toUpperCase()
    montoDeposito = parseInt(prompt("Ingrese el monto a depositar"))
    dias = parseInt(prompt("Ingrese la cantidad de dias que quiere generar su deposito"))

    if( tipoPlazoFijo != "T" && tipoPlazoFijo != "P" ){

        alert("Por favor ingrese un tipo de plazo fijo existente (T / P)")

    }else if((isNaN(montoDeposito) || isNaN(dias)) || (montoDeposito < 1 || dias < 1) ){
        alert("Por favor ingrese un numero valido, y que sea mayor a 0")
    }
    

}while((tipoPlazoFijo != "T" && tipoPlazoFijo != "P") || (isNaN(montoDeposito) || isNaN(dias)) || (montoDeposito < 1 || dias < 1))

switch (tipoPlazoFijo) {
    case "T":
        alert(`El rendimiento de su plazo fijo Tradicional a ${dias} días es de: \n$${plazoFijoTradicional(montoDeposito, dias).toFixed(2)} \nPor el monton de: \n$${montoDeposito} \nMonto total al vencer el pazo fijo:\n$${sumaTotal(plazoFijoTradicional(montoDeposito, dias),montoDeposito).toFixed(2)}`)
        break;
    case "P":
        alert(`El rendimiento de su plazo fijo Precancelable a ${dias} días es de: \n$${plazoFijoPrecancelable(montoDeposito, dias).toFixed(2)} \nPor el monton de: \n$${montoDeposito} \nMonto total al vencer el pazo fijo:\n$${sumaTotal(plazoFijoPrecancelable(montoDeposito, dias),montoDeposito).toFixed(2)}`)
        break;
}