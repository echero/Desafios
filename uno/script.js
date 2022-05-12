let numero

do{
    numero = parseInt(prompt("Ingrese un numero por favor"))
    
    if(isNaN(numero) || numero==0){
        alert("Tiene que ingresar un numero valido mayor a 0")
    }
}while(isNaN(numero) || numero==0)


for( let i=1; i <= numero; i++){
    console.log(`Hola ${i}`)
}