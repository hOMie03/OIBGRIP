let result = document.getElementById('result');

function input(value) {
    result.value += value;
}

function calculate() {
    try {
        result.value = eval(result.value);
    } catch (error) {
        result.value = 'Error';
    }
}

function clearResult() {
    result.value = '';
}

function backspace() {
    result.value = result.value.slice(0, -1);
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Escape') {
        clearResult();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (/[\d%\/*\-+.]/.test(event.key)) {
        input(event.key);
    }
});
