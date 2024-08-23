let workTime = 25 * 60;
let breakTime = 5 * 60;
let longBreakTime = 15 * 60;
let cycleCount = 4;
let currentCycle = 1;
let isWorking = true;
let timerInterval;

const notificationSound = document.getElementById('notificationSound');
const studyMessageElement = document.getElementById('studyMessage');

// Salvataggio delle impostazioni
document.getElementById('saveSettings').addEventListener('click', () => {
    workTime = document.getElementById('workTime').value * 60;
    breakTime = document.getElementById('breakTime').value * 60;
    longBreakTime = document.getElementById('longBreakTime').value * 60;
    cycleCount = document.getElementById('cycleCount').value;

    // Aggiorna immediatamente il timer con il nuovo tempo di studio
    document.getElementById('time').textContent = formatTime(workTime);
    
    // Chiudi il menu delle impostazioni
    document.getElementById('settingsContent').classList.remove('show');
});

// Impostazioni predefinite
document.getElementById('defaultSettings').addEventListener('click', () => {
    document.getElementById('workTime').value = 25;
    document.getElementById('breakTime').value = 5;
    document.getElementById('longBreakTime').value = 15;
    document.getElementById('cycleCount').value = 4;
    
    // Chiudi il menu delle impostazioni
    document.getElementById('settingsContent').classList.remove('show');
});

// Annulla le modifiche e chiudi il menu
document.getElementById('cancelSettings').addEventListener('click', () => {
    // Ripristina i valori attuali (quelli già salvati)
    document.getElementById('workTime').value = workTime / 60;
    document.getElementById('breakTime').value = breakTime / 60;
    document.getElementById('longBreakTime').value = longBreakTime / 60;
    document.getElementById('cycleCount').value = cycleCount;

    // Chiudi il menu delle impostazioni
    document.getElementById('settingsContent').classList.remove('show');
});

// Apertura del menu delle impostazioni
document.getElementById('settingsButton').addEventListener('click', () => {
    document.getElementById('settingsContent').classList.toggle('show');
});

document.getElementById('toggleButton').addEventListener('click', () => {
    if (!timerInterval) {
        startTimer(workTime, document.getElementById('time'));
        updateCycleInfo();
        document.getElementById('toggleIcon').classList.replace('fa-play', 'fa-pause');
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('toggleIcon').classList.replace('fa-pause', 'fa-play');
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('time').textContent = formatTime(workTime);
    document.getElementById('toggleIcon').classList.replace('fa-pause', 'fa-play');
    currentCycle = 1;
    isWorking = true;
    updateCycleInfo();
    resetStudyMessage();
});

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            playNotification();
            timerFinished();
        }
    }, 1000);
}

function timerFinished() {
    if (isWorking) {
        if (currentCycle >= cycleCount) {
            updateCycleInfo(true); // Passiamo true per indicare la pausa lunga
            updateStudyMessage(true); // Mostra il messaggio della pausa lunga
            startTimer(longBreakTime, document.getElementById('time'));
            currentCycle = 1; // Resetta i cicli dopo la pausa lunga
        } else {
            updateCycleInfo(false, true); // Passiamo true per indicare la pausa breve
            updateStudyMessage(); // Mostra il messaggio della pausa breve
            startTimer(breakTime, document.getElementById('time'));
            currentCycle++;
        }
    } else {
        resetStudyMessage(); // Ripristina il messaggio di studio
        startTimer(workTime, document.getElementById('time'));
        updateCycleInfo(); // Ripristina "Ciclo X/X" al termine della pausa breve
    }
    isWorking = !isWorking;
}

function playNotification() {
    notificationSound.play();
}

function updateCycleInfo(isLongBreak = false, isShortBreak = false) {
    const cycleInfoElement = document.getElementById('cycleInfo');
    if (isLongBreak) {
        cycleInfoElement.textContent = "Pausa lunga";
    } else if (isShortBreak) {
        cycleInfoElement.textContent = `Pausa breve del ciclo ${currentCycle}/${cycleCount}`;
    } else {
        cycleInfoElement.textContent = `Ciclo ${currentCycle}/${cycleCount}`;
    }
}

function updateStudyMessage(isLongBreak = false) {
    if (isLongBreak) {
        studyMessageElement.textContent = "Hai completato tutti i cicli! Ora vai a sgranocchiare qualcosa ﺕ";
    } else {
        studyMessageElement.textContent = "Bravissima! Ora pausa ﺕ";
    }
}

function resetStudyMessage() {
    studyMessageElement.textContent = "Buono studio ❤️";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

