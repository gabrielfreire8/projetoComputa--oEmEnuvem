//<button class="button" id="bt_ini">Página Inicial</button>
//<button class="button" id="bt_calen">Calendário</button>
//<button class="button" id="bt_ativ">Aprovar Atividades</button>
//<button class="button" id="bt_sair">Sair</button>

function redirecionar(){ // Função que faz as interaões entre as páginas
    window.location.href = "http://127.0.0.1:5500/frontend/index.html";
}

// Botoes menu lateral
const botaoInicial = document.getElementById("bt_ini")
botaoInicial.addEventListener("click", redirecionar);

const btCalendario = document.getElementById("bt_calen")
btCalendario.addEventListener("click", redirecionar);

const btAtiv = document.getElementById("bt_ativ")
btAtiv.addEventListener("click", redirecionar);

const logout = document.getElementById("bt_sair")
logout.addEventListener("click", redirecionar);



//Botoes principais
const bt_cadParticipante = document.getElementById("cadPart")
bt_cadParticipante.addEventListener("click",redirecionar);

const bt_criarAtividade = document.getElementById("createAtiv")
bt_criarAtividade.addEventListener("click",redirecionar);


const bt_alterarDados = document.getElementById("alterData")
bt_alterarDados.addEventListener("click",redirecionar);

const bt_frequencia = document.getElementById("frequencia")
bt_frequencia.addEventListener("click",redirecionar);

