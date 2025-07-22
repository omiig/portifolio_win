function calcular() {
  const n1 = parseFloat(document.getElementById('n1').value);
  const n2 = parseFloat(document.getElementById('n2').value);
  const op = document.getElementById('operador').value;
  let resultado;

  if (isNaN(n1) || isNaN(n2)) {
    resultado = 'Por favor, digite dois números válidos.';
  } else {
    switch (op) {
      case '+':
        resultado = n1 + n2;
        break;
      case '-':
        resultado = n1 - n2;
        break;
      case 'x':
        resultado = n1 * n2;
        break;
      case '/':
        resultado = n2 !== 0 ? n1 / n2 : 'Divisão por zero não é permitida.';
        break;
      default:
        resultado = 'Operação inválida.';
    }
  }

  document.getElementById('resultado').innerText = 'Resultado: ' + resultado;
}