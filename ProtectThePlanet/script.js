var dirxJ, diryJ, jog, velJ, pjx, pjy
var velT
var tamTelaW, tamTelaH
var jogo
var frames
var contBombas, painelContBombas, velB, tempoCriaBomba
var bombasTotal
var vidaPlaneta

function teclaDw() {
    var tecla = event.keyCode

    if (tecla == 38) { //Cima
        diryJ = -1
    } else if (tecla == 40) { //Baixo
        diryJ = 1
    } else if (tecla == 37) { //Esquerda
        dirxJ = -1
    } else if (tecla == 39) { //Direita
        dirxJ = 1
    } else if (tecla == 32) { //Espaço - Tiro
        atirar(pjx+49 ,pjy)
    }
}

function teclaUp() {
    var tecla = event.keyCode
    if ((tecla == 38)||(tecla == 40)) {
        diryJ = 0
    }
    if ((tecla == 37)||(tecla == 39)) {
        dirxJ = 0
    }
}

function controlaJogador() {
    pjy += diryJ * velJ
    pjx += dirxJ * velJ
    jog.style.top = pjy+"px"
    jog.style.left= pjx+"px"
}

function criarBomba() {
    if(jogo) {
        var y = 0
        var x = Math.random()*tamTelaW
        var bomba = document.createElement("div")
        var att1 = document.createAttribute("class")
        var att2 = document.createAttribute("style")
        att1.value="bomba"
        att2.value="top: "+y+"px; left: "+x+"px" 
        bomba.setAttributeNode(att1)
        bomba.setAttributeNode(att2)
        document.body.appendChild(bomba)
        contBombas--
    }
}

function controlaBomba() {
    bombasTotal = document.getElementsByClassName("bomba")
    var tam = bombasTotal.length
    for (var i=0;i<tam;i++) {
        if(bombasTotal[i]) {
            var pi = bombasTotal[i].offsetTop
            pi+=velB
            bombasTotal[i].style.top=pi+"px"
            if (pi>tamTelaH) {
                vidaPlaneta-=10
                bombasTotal[i].remove()
            }
        }
    }
}

function atirar(x,y) {
    var t = document.createElement("div")
    var att1 = document.createAttribute("class")
    var att2 = document.createAttribute("style")
    att1.value="tiroJog"
    att2.value="top:"+y+"px;left:"+x+"px"
    t.setAttributeNode(att1)
    t.setAttributeNode(att2)
    document.body.appendChild(t)
}

function controleTiros() {
    var tiros = document.getElementsByClassName("tiroJog")
    var tam = tiros.length
    for (var i = 0;i<tam;i++) {
        if (tiros[i]){
            var pt = tiros[i].offsetTop;
            pt -= velT
            tiros[i].style.top=pt+"px"
            colisaoTiroBomba(tiros[i])
            if(pt<0) {
                tiros[i].remove()
            }
        }
    }
}

function colisaoTiroBomba(tiro) {
    var tam = bombasTotal.length
    for (var i=0;i<tam;i++) {
        if (bombasTotal[i]) {
            if (
                (
                    (tiro.offsetTop<=(bombasTotal[i].offsetTop+35)) && ((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop))
                )
                &&
                (
                    (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+35)) && ((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft))
                )
            ) {
                bombasTotal[i].remove()
                tiro.remove()
            }
        }
    }
}

function gameLoop() {
    if(jogo==true) {
        controlaJogador()
        controleTiros()
        controlaBomba()
    }
    frames = requestAnimationFrame(gameLoop)
}

function inicio() {
    jogo=true
    
    //Inicio Tela
    tamTelaH = window.innerHeight
    tamTelaW = window.innerWidth

    //Inicio Jogador
    dirxJ = 0
    diryJ = 0
    pjx=tamTelaW/2
    pjy=tamTelaH/2
    velJ=5
    velT=5
    jog=document.getElementById("navJog")
    jog.style.top=pjy+"px"
    jog.style.left=pjx+"px"

    //Controles das Bombas
    clearInterval(tempoCriaBomba)
    contBombas = 150
    velB = 3
    tempoCriaBomba = setInterval(criarBomba, 2000)

    //Controle Planeta
    vidaPlaneta = 300

    gameLoop()
}

window.addEventListener("load",inicio)
document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)