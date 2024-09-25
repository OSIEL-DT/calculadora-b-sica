// Pega todos os botões
const buttons = document.querySelectorAll('.btn');

// Pega o display da calculadora
const display = document.getElementById('display');

// Variáveis para armazenar os valores e o operador atual
let currentValue = '';
let operator = '';
let previousValue = '';

// Função para atualizar o display da calculadora
function updateDisplay(value) {
    display.value = value;
}

// Função para limpar a calculadora
function clearCalculator() {
    currentValue = '';
    previousValue = '';
    operator = '';
    updateDisplay('0');
}

// Função para calcular a expressão matemática
function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    // Verifica qual operador está em uso
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    // Atualiza os valores e o display com o resultado
    currentValue = result.toString();
    operator = '';
    previousValue = '';
    updateDisplay(currentValue);
}

// Adiciona evento para cada botão
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.value;

        // Se o botão clicado for um operador (+, -, *, /)
        if (event.target.classList.contains('operator')) {
            // Se já houver um valor anterior, realiza a operação
            if (currentValue !== '') {
                calculate();
                previousValue = currentValue;
                currentValue = '';
            } else {
                previousValue = currentValue;
                currentValue = '';
            }
            operator = value;
        }
        // Se o botão clicado for o botão de igual
        else if (value === '=') {
            calculate();
        }
        // Se o botão clicado for o botão de limpar (C)
        else if (value === 'C') {
            clearCalculator();
        }
        // Caso seja um número ou ponto
        else {
            // Limita a entrada de múltiplos pontos
            if (value === '.' && currentValue.includes('.')) return;
            currentValue += value;
            updateDisplay(currentValue);
        }
    });
});

// Inicializa a calculadora com o valor 0
clearCalculator();
