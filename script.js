let timerInterval;
let isPaused = false;
let timeRemaining = 1500; // 25 minuti in secondi
const timerElement = document.getElementById('time');
const messageElement = document.getElementById('message');

document.getElementById('startButton').addEventListener('click', function() {
    if (isPaused) {
        // Riprendi il timer dalla pausa
        startTimer(timeRemaining);
        isPaused = false;
        messageElement.textContent = ''; // Rimuovi il messaggio "Timer in pausa"
    } else {
        // Inizia un nuovo timer
        startTimer(1500);
    }
});

document.getElementById('pauseButton').addEventListener('click', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        isPaused = true;
        messageElement.textContent = 'Timer in pausa';
    }
});

document.getElementById('stopButton').addEventListener('click', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    isPaused = false;
    timeRemaining = 1500; // Resetta il timer a 25 minuti
    timerElement.textContent = formatTime(timeRemaining);
    messageElement.textContent = ''; // Rimuovi eventuali messaggi
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
        } else {
            timerElement.textContent = formatTime(timeRemaining);
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
