let timer;
let isBreak = false;
const workTime = 25 * 60; // 25 minuti in secondi
const breakTime = 5 * 60;  // 5 minuti in secondi
const cycles = 4;

const quotes = [
    {
        text: "Il successo non è definitivo, il fallimento non è fatale: è il coraggio di continuare che conta.",
        author: "Winston Churchill"
    },
    {
        text: "L'unico modo per fare un ottimo lavoro è amare quello che fai.",
        author: "Steve Jobs"
    },
    {
        text: "Non è mai troppo tardi per essere ciò che avresti potuto essere.",
        author: "George Eliot"
    },
    {
        text: "La qualità del tuo pensiero determina la qualità della tua vita.",
        author: "Brian Tracy"
    },
    {
        text: "Non aspettare. Non sarà mai il momento giusto.",
        author: "Napoleon Hill"
    },
    {
        text: "Sforzati di non avere solo successo, ma piuttosto di essere di valore.",
        author: "Albert Einstein"
    },
    {
        text: "Ciò che ottieni raggiungendo i tuoi obiettivi non è importante quanto ciò che diventi raggiungendoli.",
        author: "Zig Ziglar"
    }
];

let currentCycle = 0;
let remainingTime = workTime;
let pausedTime = 0;

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);

function updateCycleDisplay() {
    document.getElementById('cycleInfo').textContent = `Ciclo ${currentCycle + 1}/${cycles}`;
}

function startTimer() {
    if (timer) return; // Prevent multiple timers

    timer = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        document.getElementById('time').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        remainingTime--;
        
        if (remainingTime < 0) {
            clearInterval(timer);
            timer = null;
            if (isBreak) {
                currentCycle++;
                if (currentCycle < cycles) {
                    document.getElementById('message').textContent = "Tempo di studiare!";
                    document.getElementById('quote').textContent = "";
                    isBreak = false;
                    remainingTime = workTime;
                    updateCycleDisplay(); // Update cycle display
                    startTimer();
                } else {
                    document.getElementById('message').textContent = "Brava RAN! Hai completato tutti i cicli Pomodoro!";
                    document.getElementById('cycleInfo').textContent = ""; // Clear cycle info
                }
            } else {
                document.getElementById('message').textContent = "Tempo di fare un po' pausa a sgranocchiare qualcosa!";
                document.getElementById('quote').textContent = getRandomQuote();
                isBreak = true;
                remainingTime = breakTime;
                updateCycleDisplay(); // Update cycle display
                startTimer();
            }
        }
    }, 1000);
}

function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        pausedTime = remainingTime; // Store remaining time when paused
        document.getElementById('message').textContent = "Timer in pausa";
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        document.getElementById('message').textContent = "";
        document.getElementById('quote').textContent = "";
        document.getElementById('time').textContent = "25:00";
        remainingTime = workTime;
        pausedTime = 0;
        document.getElementById('cycleInfo').textContent = ""; // Clear cycle info
    }
}

function getRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return `"${quote.text}" - ${quote.author}`;
}
