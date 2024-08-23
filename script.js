// Gestione del timer
let workTime = 25;
let breakTime = 5;
let cycleCount = 4;
let currentCycle = 1;
let timer;
let isRunning = false;
let isWorkTime = true;

function updateTimerDisplay(minutes, seconds) {
    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    return setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        updateTimerDisplay(minutes, seconds);

        if (--timer < 0) {
            clearInterval(timer);
            document.getElementById("notificationSound").play(); // Riproduce il suono

            if (isWorkTime) {
                if (currentCycle < cycleCount) {
                    isWorkTime = false;
                    timer = breakTime * 60;
                    document.getElementById("studyMessage").textContent = "Bravissima! Ora pausa ﺕ";
                    currentCycle++;
                    document.getElementById("cycleInfo").textContent = `Ciclo ${currentCycle}/${cycleCount}`;
                    document.getElementById("notificationSound").play(); // Riproduce il suono all'inizio della pausa
                } else {
                    document.getElementById("studyMessage").textContent = "Hai completato tutti i cicli! Ora vai a sgranocchiare qualcosa ﺕ";
                    document.getElementById("toggleIcon").className = "fas fa-play";
                    isRunning = false;
                }
            } else {
                isWorkTime = true;
                timer = workTime * 60;
                document.getElementById("studyMessage").textContent = "Forza, rimettiti a studiare! 💪🏻";
                document.getElementById("notificationSound").play(); // Riproduce il suono all'inizio del lavoro
            }
        }
    }, 1000);
}

document.getElementById("toggleButton").addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("toggleIcon").className = "fas fa-play";
    } else {
        if (!timer) {
            timer = startTimer(workTime * 60, document.querySelector("#time"));
        } else {
            timer = startTimer(parseInt(document.querySelector("#time").textContent.split(":")[0]) * 60 + parseInt(document.querySelector("#time").textContent.split(":")[1]), document.querySelector("#time"));
        }
        document.getElementById("toggleIcon").className = "fas fa-pause";
    }
    isRunning = !isRunning;
});

document.getElementById("stopButton").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    isWorkTime = true;
    currentCycle = 1;
    updateTimerDisplay(workTime, 0);
    document.getElementById("toggleIcon").className = "fas fa-play";
    document.getElementById("studyMessage").textContent = "Buono studio ❤️";
    document.getElementById("cycleInfo").textContent = `Ciclo ${currentCycle}/${cycleCount}`;
});

// Funzione per chiudere il menu delle Impostazioni
function closeSettingsMenu() {
    var settingsContent = document.getElementById('settingsContent');
    settingsContent.classList.remove('show');
    setTimeout(() => { settingsContent.style.display = "none"; }, 300); // Delay to match the transition
}

// Salvataggio delle impostazioni personalizzate
document.getElementById("saveSettings").addEventListener("click", () => {
    workTime = parseInt(document.getElementById("workTime").value);
    breakTime = parseInt(document.getElementById("breakTime").value);
    cycleCount = parseInt(document.getElementById("cycleCount").value);
    clearInterval(timer);
    timer = null;
    isRunning = false;
    isWorkTime = true;
    currentCycle = 1;
    updateTimerDisplay(workTime, 0);
    document.getElementById("toggleIcon").className = "fas fa-play";
    document.getElementById("studyMessage").textContent = "Buono studio ❤️";
    document.getElementById("cycleInfo").textContent = `Ciclo ${currentCycle}/${cycleCount}`;
    closeSettingsMenu(); // Chiudi il menu dopo aver salvato
});

// Ripristina le impostazioni predefinite
document.getElementById("defaultSettings").addEventListener("click", () => {
    workTime = 25;
    breakTime = 5;
    cycleCount = 4;
    document.getElementById("workTime").value = workTime;
    document.getElementById("breakTime").value = breakTime;
    document.getElementById("cycleCount").value = cycleCount;
    clearInterval(timer);
    timer = null;
    isRunning = false;
    isWorkTime = true;
    currentCycle = 1;
    updateTimerDisplay(workTime, 0);
    document.getElementById("toggleIcon").className = "fas fa-play";
    document.getElementById("studyMessage").textContent = "Buono studio ❤️";
    document.getElementById("cycleInfo").textContent = `Ciclo ${currentCycle}/${cycleCount}`;
    closeSettingsMenu(); // Chiudi il menu dopo aver ripristinato
});

// Gestione del menu Impostazioni
document.getElementById('settingsButton').addEventListener('click', function() {
    var settingsContent = document.getElementById('settingsContent');
    if (settingsContent.classList.contains('show')) {
        settingsContent.classList.remove('show');
        setTimeout(() => { settingsContent.style.display = "none"; }, 300); // Delay to match the transition
    } else {
        settingsContent.style.display = "block";
        setTimeout(() => { settingsContent.classList.add('show'); }, 10); // Small delay to trigger transition
    }
});

