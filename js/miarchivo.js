
const botonJugar = document.getElementById('jugar')
const navJugar = document.getElementById('jugar2')
const divPantallaInicio = document.getElementById('pantallaInicio')
const divPantallaJuego = document.getElementById('pantallaJuego')
const arraydiv = [1,2,3,4,5,6,7]
const min = 1
let btnReiniciar


const palosCarta = ['Oro','Basto','Copa','Espada'];
const numerosCarta = [1,2,3,4,5,6,7,8,9,10,11,12];
let mazo = [];
let mazosCartasSeleccionadas 
    
    
class naipes {
    constructor(palo, numero) {
        this.palo = palo
        this.numero = numero }
}

    
function cartaAleatoria(mi, ma) { return Math.trunc(Math.random() * (ma - mi) + mi) }


function generarCarta(){
    let numeroAleatorio = cartaAleatoria(min, mazo.length)
    let carta = new naipes()
    carta = mazo[numeroAleatorio]
    mazo.splice(numeroAleatorio,1)
    return carta
}

function inicializarMazos (){
    mazosCartasSeleccionadas = [[],[],[],[],[],[],[]];
    let carta = new naipes()
    
    arraydiv.map((n)=>{
        let m = n - 1
        carta = generarCarta()
        mazosCartasSeleccionadas[m].push(carta)
    })

    mostrarCarta()
}

function mostrarCarta(){
    for (let i = 0; i < arraydiv.length; i++) {
        let parrafoCarta = document.getElementById(`parrafoPosicion${i+1}`)
        parrafoCarta.innerHTML = `${mazosCartasSeleccionadas[i][0].numero} ${mazosCartasSeleccionadas[i][0].palo}`
        }
}

function empiezaPartida () {
    localStorage.clear()
    let totalJugado = 0
    let aciertos= 0
    let winRate = 0
    let posicion = 1
    

    palosCarta.forEach(p=>{
        numerosCarta.forEach(n=>{
            let naipe = new naipes(p,n)
            mazo.push(naipe)
        })
    })

    mostrarPantallaJuego()

    inicializarMazos()

    logicaJuego(totalJugado,aciertos,winRate,posicion)

}

function logicaJuego(totalJugado,aciertos,winRate,posicion){
    const botonIgual = document.getElementById('btnIgual')
    const botonMayor = document.getElementById('btnMayor')
    const botonMenor = document.getElementById('btnMenor')

    pEstadistico.innerHTML = `Total jugado: ${totalJugado} - Aciertos: ${aciertos} - Winrate: ${winRate.toFixed(2)}%`

    let spanFlecha = document.getElementById(`span${posicion}`)
    spanFlecha.style.color = 'black'

    botonIgual.onclick = () => { 
            let tipo = 1  
            juego(tipo)   
    }

    botonMayor.onclick = () => {
            let tipo = 2  
            juego(tipo)
    }

    botonMenor.onclick = () => {
            let tipo = 3 
            juego(tipo)     
    }


    function juego(t){
        let carta1 = new naipes()
        spanFlecha.style.color = 'rgb(17, 204, 101)'
        carta1 = generarCarta()
        mazosCartasSeleccionadas[posicion-1].push(carta1)
        let ultCarta = mazosCartasSeleccionadas[posicion-1].length - 1;
        let parrafoCarta = document.getElementById(`parrafoPosicion${posicion}`)
        parrafoCarta.innerHTML = `${mazosCartasSeleccionadas[posicion-1][ultCarta].numero} ${mazosCartasSeleccionadas[posicion-1][ultCarta].palo}`

        console.log (`Carta Aleatoria: ${carta1.numero} => Carta Anterior: ${mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero}`)
        
        let resultado
        if (t===1) {
            if(carta1.numero===mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero){
                resultado = true
            } else {
                resultado = false
            }
        } else if (t===2) {
            if(carta1.numero>mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero){
                resultado = true
            } else {
                resultado = false
            }
        } else if (t===3) {
            if(carta1.numero<mazosCartasSeleccionadas[posicion-1][ultCarta-1].numero){
                resultado = true
            } else {
                resultado = false
            }
        }
        obtenerResultado(resultado)
        spanFlecha = document.getElementById(`span${posicion}`)
        spanFlecha.style.color = 'black'
        pEstadistico.innerHTML = `Total jugado: ${totalJugado} - Aciertos: ${aciertos} - Winrate: ${winRate.toFixed(2)}%`
        
        let datosPartida = {
            totalJugado: totalJugado,
            aciertos: aciertos,
            winRate: winRate,
            posicion: posicion,
            mazo: mazo,
            mazosCartasSeleccionadas: mazosCartasSeleccionadas
        }
        localStorage.setItem('datosPartida',JSON.stringify(datosPartida))
    }

    function obtenerResultado (r) {
        totalJugado++
        if(r){
            posicion++
            aciertos++
            alert('Correcto')
        } else{
            if(posicion===1){ } 
                else { posicion--}
            alert('Inorrecto')
        }
        winRate = aciertos/totalJugado*100
        
    }
}

function mostrarPantallaJuego(){
    divPantallaInicio.remove()

    const divAgrupa = document.createElement('div')
    const divEstadisticos = document.createElement('div')
    const divBotones = document.createElement('div')
    const divTablero = document.createElement('div')
    const divReiniciar = document.createElement('div')
    divTablero.setAttribute('class','divTablero')
    
    divAgrupa.append(divEstadisticos, divBotones, divTablero, divReiniciar)
    
    divPantallaJuego.append(divAgrupa)

    const botonReiniciar = document.createElement('button') 
    const botonIgual = document.createElement('button')
    const botonMayor = document.createElement('button')
    const botonMenor = document.createElement('button')
    
    botonIgual.setAttribute('id','btnReiniciar')
    botonReiniciar.innerText = 'Reiniciar partida'

    botonIgual.setAttribute('id','btnIgual')
    botonIgual.innerText = 'Igual'
 
    botonMayor.setAttribute('id','btnMayor')
    botonMayor.innerText = 'Mayor'
 
    botonMenor.setAttribute('id','btnMenor')
    botonMenor.innerText = 'Menor'
   
    divBotones.append(botonIgual,botonMayor,botonMenor)
    divReiniciar.append(botonReiniciar)
    
    const pEstadistico = document.createElement('p')
    pEstadistico.setAttribute('id','pEstadistico')
    divEstadisticos.append(pEstadistico)
    

    arraydiv.map((i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class','divCard')
        divCard.setAttribute('id',`cartaPosicion${i}`) 
        const parrafoCarta = document.createElement('p')
        parrafoCarta.setAttribute('id',`parrafoPosicion${i}`)
        

        const divPuntero = document.createElement('div')
        divPuntero.setAttribute('class','divPuntero')
        divPuntero.setAttribute('id', `puntero${i}`)

        const spanFlecha = document.createElement('span')
        spanFlecha.setAttribute('id', `span${i}`)
        spanFlecha.setAttribute('class','spanFlecha')

        divPuntero.append(spanFlecha)
        divCard.append(divPuntero,parrafoCarta)
        divTablero.append(divCard)
        
    })

    botonReiniciar.onclick = () => {
        divAgrupa.remove()
        
        empiezaPartida()
    }
    

}

let datosPartida = JSON.parse(localStorage.getItem('datosPartida'))
if(datosPartida){ 
    mostrarPantallaJuego()
    mazo = datosPartida.mazo
    mazosCartasSeleccionadas = datosPartida.mazosCartasSeleccionadas
    mostrarCarta()
    logicaJuego(datosPartida.totalJugado,datosPartida.aciertos,datosPartida.winRate,datosPartida.posicion)
}

botonJugar.onclick = () => empiezaPartida()
navJugar.onclick = () => empiezaPartida()


