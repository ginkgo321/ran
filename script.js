let timerInterval;
let isPaused = false;
let isRunning = false; // Variabile per tracciare se il timer è in esecuzione
let timeRemaining = 25 * 60; // Imposta 25 minuti come valore predefinito
let workTime = 25 * 60; // Tempo di studio di default (in secondi)
let breakTime = 5 * 60; // Tempo di pausa di default (in secondi)
let currentCycle = 1; // Ciclo corrente, inizialmente impostato a 1
const totalCycles = 4; // Numero totale di cicli
const timerElement = document.getElementById('time');
const messageElement = document.getElementById('message');
const quoteElement = document.getElementById('quote');
const cycleInfoElement = document.getElementById('cycleInfo');
const toggleButton = document.getElementById('toggleButton');

const quotes = [
    // (Elenco delle citazioni)
];

toggleButton.addEventListener('click', function() {
    if (!isRunning && !isPaused) {
        startTimer(timeRemaining);
        isRunning = true;
        toggleButton.textContent = 'Pausa'; // Cambia il testo in "Pausa" quando il timer parte
        messageElement.textContent = '';
    } else if (isPaused) {
        startTimer(timeRemaining);
        isPaused = false;
        isRunning = true;
        toggleButton.textContent = 'Pausa'; // Cambia il testo in "Pausa" quando il timer riparte
        messageElement.textContent = '';
    } else {
        pauseTimer();
    }
});

document.getElementById('stopButton').addEventListener('click', function() {
    resetTimer();
});

document.getElementById('saveSettings').addEventListener('click', function() {
    workTime = document.getElementById('workTime').value * 60;
    breakTime = document.getElementById('breakTime').value * 60;
    timeRemaining = workTime; // Aggiorna il tempo rimanente
    timerElement.textContent = formatTime(timeRemaining); // Visualizza il tempo aggiornato
});

function startTimer(duration) {
    let startTime = Date.now();
    timerInterval = setInterval(function() {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timeRemaining = duration - elapsedTime;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00";
            messageElement.textContent = 'Tempo scaduto!';
            showRandomQuote();
            showNotification("Tempo scaduto!");
            playSound(); // Riproduce il suono di festeggiamento

            // Aggiorna il ciclo corrente
            if (currentCycle < totalCycles) {
                currentCycle++;
                cycleInfoElement.textContent = `Ciclo ${currentCycle}/${totalCycles}`;
                // Avvia automaticamente il nuovo ciclo di studio
                timeRemaining = workTime;
                startTimer(workTime);
            } else {
                messageElement.textContent = 'Hai completato tutti i cicli!';
                toggleButton.textContent = 'Inizia';
                isRunning = false;
            }
        } else {
            timerElement.textContent = formatTime(timeRemaining);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    isRunning = false;
    messageElement.textContent = 'Timer in pausa';
    toggleButton.textContent = 'Riprendi'; // Cambia il testo in "Riprendi" quando il timer è in pausa
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    isRunning = false;
    timeRemaining = workTime;
    currentCycle = 1; // Resetta il ciclo corrente al primo ciclo
    cycleInfoElement.textContent = `Ciclo ${currentCycle}/${totalCycles}`;
    timerElement.textContent = formatTime(timeRemaining);
    messageElement.textContent = '';
    toggleButton.textContent = 'Inizia'; // Cambia il testo in "Inizia" quando il timer è fermo
    quoteElement.textContent = ''; // Rimuove eventuali citazioni precedenti
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}

function playSound() {
    const audio = new Audio('notification.wav');
    audio.play();
}

// Salvataggio dello stato nel localStorage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('timeRemaining', timeRemaining);
    localStorage.setItem('isPaused', isPaused);
    localStorage.setItem('currentCycle', currentCycle);
});

window.addEventListener('load', () => {
    if (localStorage.getItem('timeRemaining')) {
        timeRemaining = parseInt(localStorage.getItem('timeRemaining'), 10) || workTime;
        isPaused = localStorage.getItem('isPaused') === 'true';
        currentCycle = parseInt(localStorage.getItem('currentCycle'), 10) || 1;
        cycleInfoElement.textContent = `Ciclo ${currentCycle}/${totalCycles}`;
        timerElement.textContent = formatTime(timeRemaining);
        toggleButton.textContent = isPaused ? 'Riprendi' : 'Inizia';
    }
});
