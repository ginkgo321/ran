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

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);

function startTimer() {
    if (timer) return; // Prevent multiple timers
    let time = workTime;
    if (isBreak) time = breakTime;
    
    timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('time').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        time--;
        
        if (time < 0) {
            clearInterval(timer);
            timer = null;
            if (isBreak) {
                currentCycle++;
                if (currentCycle < cycles) {
                    document.getElementById('message').textContent = "Tempo di lavoro!";
                    document.getElementById('quote').textContent = "";
                    isBreak = false;
                    startTimer();
                } else {
                    document.getElementById('message').textContent = "Hai completato tutti i cicli Pomodoro!";
                }
            } else {
                document.getElementById('message').textContent = "Tempo di pausa!";
                document.getElementById('quote').textContent = getRandomQuote();
                isBreak = true;
                startTimer();
            }
        }
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        document.getElementById('message').textContent = "";
        document.getElementById('quote').textContent = "";
        document.getElementById('time').textContent = "25:00";
    }
}

function getRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return `"${quote.text}" - ${quote.author}`;
}

