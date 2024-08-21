let timerInterval;
let isPaused = false;
let timeRemaining = 25 * 60; // Imposta 25 minuti come valore predefinito
let workTime = 25 * 60; // Tempo di lavoro di default (in secondi)
let breakTime = 5 * 60; // Tempo di pausa di default (in secondi)
const timerElement = document.getElementById('time');
const messageElement = document.getElementById('message');
const quoteElement = document.getElementById('quote');
const cycleInfoElement = document.getElementById('cycleInfo');

const quotes = [
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "The beautiful thing about learning is that no one can take it away from you. – B.B. King",
    "Study hard, for the well is deep, and our brains are shallow. – Richard Baxter",
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. – Malcolm X",
    "The more that you read, the more things you will know, the more that you learn, the more places you'll go. – Dr. Seuss",
    "There are no secrets to success. It is the result of preparation, hard work, and learning from failure. – Colin Powell",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi",
    "An investment in knowledge pays the best interest. – Benjamin Franklin",
    "The only place where success comes before work is in the dictionary. – Vidal Sassoon",
    "Le radici dell'educazione sono amare, ma i frutti sono dolci. – Aristotele",
    "Non permettere a ciò che non puoi fare di interferire con ciò che puoi fare. – John Wooden",
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer",
    "Your positive action combined with positive thinking results in success. – Shiv Khera",
    "The best way to predict your future is to create it. – Peter Drucker",
    "Develop a passion for learning. If you do, you will never cease to grow. – Anthony J. D'Angelo",
    "The expert in anything was once a beginner. – Helen Hayes",
    "Non è che io sia così intelligente, è che rimango con i problemi più a lungo. – Albert Einstein",
    "Il successo è passare da un fallimento all'altro senza perdere entusiasmo. – Winston Churchill",
    "L'educazione non è riempire un secchio, ma accendere un fuoco. – W.B. Yeats",
    "Il genio è per l'1% ispirazione e per il 99% traspirazione. – Thomas Edison",
    "L'educazione è l'arma più potente che puoi usare per cambiare il mondo. – Nelson Mandela",
    "Se pensi che l'istruzione sia costosa, prova l'ignoranza. – Andy McIntyre",
    "Più vivo, più imparo. Più imparo, più mi rendo conto di sapere meno. – Michel Legrand",
    "L'apprendimento non si ottiene per caso, deve essere cercato con ardore e seguito con diligenza. – Abigail Adams",
    "È più saggio scoprire che supporre. – Mark Twain",
    "Impara dal passato, vivi nel presente, spera nel futuro. L'importante è non smettere mai di fare domande. – Albert Einstein",
    "Il successo consiste nel passare da un fallimento all'altro senza perdere l'entusiasmo. – Winston Churchill",
    "Non guardare l'orologio; fai come fa lui: continua ad andare avanti. – Sam Levenson",
    "L'educazione è ciò che rimane dopo che si è dimenticato ciò che si è imparato a scuola. – Albert Einstein",
    "L'unico limite alla nostra realizzazione di domani sono i nostri dubbi di oggi. – Franklin D. Roosevelt",
    "Se vuoi raggiungere la grandezza, smetti di chiedere il permesso. – Anonimo",
    "L'unico modo per fare un ottimo lavoro è amare quello che fai. – Steve Jobs",
    "Inizia dove ti trovi. Usa ciò che hai. Fai ciò che puoi. – Arthur Ashe",
    "Non aspettare che il ferro sia caldo per battere, ma rendilo caldo battendo. – William Butler Yeats",
    "Non importa quanto lentamente vai, finché non ti fermi. – Confucio",
    "Il segreto per andare avanti è iniziare. – Mark Twain",
    "Il modo per iniziare è smettere di parlare e iniziare a fare. – Walt Disney",
    "Il successo di solito arriva a coloro che sono troppo occupati per cercarlo. – Henry David Thoreau",
    "Non desiderare che sia più facile. Desidera di essere migliore. – Jim Rohn",
    "La migliore preparazione per domani è fare del tuo meglio oggi. – H. Jackson Brown, Jr.",
    "Il successo non si misura da quanto in alto sei arrivato, ma da quanta differenza positiva hai fatto nel mondo. – Roy T. Bennett",
    "Ciò che impariamo con piacere non lo dimentichiamo mai. – Alfred Mercier",
    "Più impari, più posti visiterai. – Dr. Seuss",
    "L'apprendimento non esaurisce mai la mente. – Leonardo da Vinci",
    "Lo scopo dell'educazione è sostituire una mente vuota con una aperta. – Malcolm Forbes",
    "L'apprendimento è un tesoro che seguirà il suo proprietario ovunque. – Proverbio cinese",
    "Se non sei disposto a imparare, nessuno può aiutarti. Se sei determinato a imparare, nessuno può fermarti. – Zig Ziglar"
];

document.getElementById('startButton').addEventListener('click', function() {
    if (isPaused) {
        startTimer(timeRemaining);
        isPaused = false;
        messageElement.textContent = '';
    } else {
        startTimer(workTime);
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

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    timeRemaining = workTime;
    timerElement.textContent = formatTime(timeRemaining);
    messageElement.textContent = '';
    quoteElement.textContent = ''; // Rimuove eventuali citazioni precedenti
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
    const audio = new Audio('notification.wav'); // Aggiungi un file audio chiamato notification.wav nella cartella del progetto
    audio.play();
}

// Salvataggio dello stato nel localStorage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('timeRemaining', timeRemaining);
    localStorage.setItem('isPaused', isPaused);
});

window.addEventListener('load', () => {
    if (localStorage.getItem('timeRemaining')) {
        timeRemaining = parseInt(localStorage.getItem('timeRemaining'), 10) || workTime;
        isPaused = localStorage.getItem('isPaused') === 'true';
        timerElement.textContent = formatTime(timeRemaining);
    }
});
