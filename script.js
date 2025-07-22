// Abrir e fechar janelas
function openWindow(id) {
  document.getElementById(id).style.display = "block";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

// Relógio da barra de tarefas
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// Terminal fake
function runCommand(event) {
  if (event.key === 'Enter') {
    const input = event.target;
    const output = document.getElementById('terminal-output');
    const command = input.value.trim().toLowerCase();
    let result = '';

    switch(command) {
      case 'help':
        result = 'Comandos disponíveis: help, whoami, projetos';
        break;
      case 'whoami':
        result = 'Miguel Lopes - Desenvolvedor Front-End';
        break;
      case 'projetos':
        result = 'Acesse a janela de Projetos para ver os detalhes.';
        break;
      default:
        result = 'Comando não reconhecido.';
    }

    output.innerHTML += `<br>> ${command}<br>${result}`;
    input.value = '';
  }
}