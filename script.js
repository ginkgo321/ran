let timerInterval;
let isPaused = false;
let isRunning = false;
let timeRemaining = 25 * 60;
let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentCycle = 1;
let totalCycles = 4; // Variabile dinamica per il numero di cicli
const timerElement = document.getElementById('time');
const messageElement = document.getElementById('message');
const quoteElement = document.getElementById('quote');
const cycleInfoElement = document.getElementById('cycleInfo');
const toggleButton = document.getElementById('toggleButton');
const toggleIcon = document.getElementById('toggleIcon');

const quotes = [
    "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela",
    "The more that you read, the more things you will know, the more that you learn, the more places you'll go. – Dr. Seuss",
    "An investment in knowledge pays the best interest. – Benjamin Franklin",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi",
    "The beautiful thing about learning is that no one can take it away from you. – B.B. King",
    "Education is not the filling of a pail, but the lighting of a fire. – W.B. Yeats",
    "The roots of education are bitter, but the fruit is sweet. – Aristotle",
    "The only person who is educated is the one who has learned how to learn and change. – Carl Rogers",
    "Education is the key to unlock the golden door of freedom. – George Washington Carver",
    "Learning never exhausts the mind. – Leonardo da Vinci",
    "The best way to predict your future is to create it. – Peter Drucker",
    "The only place where success comes before work is in the dictionary. – Vidal Sassoon",
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "Formal education will make you a living; self-education will make you a fortune. – Jim Rohn",
    "The function of education is to teach one to think intensively and to think critically. Intelligence plus character – that is the goal of true education. – Martin Luther King Jr.",
    "Study without desire spoils the memory, and it retains nothing that it takes in. – Leonardo da Vinci",
    "Don't let what you cannot do interfere with what you can do. – John Wooden",
    "Develop a passion for learning. If you do, you will never cease to grow. – Anthony J. D'Angelo",
    "The expert in anything was once a beginner. – Helen Hayes",
    "The more I live, the more I learn. The more I learn, the more I realize, the less I know. – Michel Legrand",
    "Education is what remains after one has forgotten what one has learned in school. – Albert Einstein",
    "If you think education is expensive, try ignorance. – Andy McIntyre",
    "Change is the end result of all true learning. – Leo Buscaglia",
    "A good education is a foundation for a better future. – Elizabeth Warren",
    "It is not that I'm so smart. But I stay with the questions much longer. – Albert Einstein",
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. – Malcolm X",
    "The purpose of education is to replace an empty mind with an open one. – Malcolm Forbes",
    "Learning is a treasure that will follow its owner everywhere. – Chinese Proverb",
    "Education is not preparation for life; education is life itself. – John Dewey",
    "Knowledge is power. – Sir Francis Bacon"
];

toggleButton.addEventListener('click', function() {
    if (!isRunning && !isPaused) {
        startTimer(timeRemaining);
        isRunning = true;
        toggleIcon.className = 'fas fa-pause'; // Cambia l'icona in pausa quando il timer parte
        messageElement.textContent = '';
    } else if (isPaused) {
        startTimer(timeRemaining);
        isPaused = false;
        isRunning = true;
        toggleIcon.className = 'fas fa-pause'; // Cambia l'icona in pausa quando il timer riparte
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
    totalCycles = document.getElementById('cycleCount').value;
    timeRemaining = workTime;
    timerElement.textContent = formatTime(timeRemaining);
    cycleInfoElement.textContent = `Ciclo ${currentCycle}/${totalCycles}`; // Aggiorna l'indicazione del ciclo
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
            playSound();

            if (currentCycle < totalCycles) {
                currentCycle++;
                cycleInfoElement.textContent = `Ciclo ${currentCycle}/${totalCycles}`;
                timeRemaining = workTime;
                startTimer(workTime);
            } else {
                messageElement.textContent = 'Hai completato tutti i cicli!';
                toggleIcon.className = 'fas fa-play'; // Torna all'icona play
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
    toggleIcon.className = 'fas fa-play'; // Cambia l'icona in play quando in pausa
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    isRunning = false;
    timeRemaining = workTime;
    currentCycle = 1;
    cycleInfoElement.textContent = `Ciclo ${currentCycle}/${totalCycles}`;
    timerElement.textContent = formatTime(timeRemaining);
    messageElement.textContent = '';
    toggleIcon.className = 'fas fa-play'; // Torna all'icona play
    quoteElement.textContent = '';
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
        toggleIcon.className = isPaused ? 'fas fa-play' : 'fas fa-pause'; // Imposta l'icona corretta all'avvio
    }
});
