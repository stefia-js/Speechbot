const textInput = document.getElementById('textInput');
const recognitionBtn = document.getElementById('recognitionBtn');
const textToSpeachBtn = document.getElementById('textToSpeachBtn');
const speedBtns = document.querySelectorAll('.speed-btn');
let speedActiveBtn = document.querySelector('.speed-btn[data-speed="1"]');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const synthesis = window.speechSynthesis;

let currentSpeed = 1;
let currentVoice = null;

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

speedActiveBtn.classList.add('active')

function pickVoice() {
    const voices = speechSynthesis.getVoices();
    currentVoice = null;
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang === 'en-US' && voices[i].name === 'Albert') {
            currentVoice = voices[i];
            break;
        }
    }
}
pickVoice();
speechSynthesis.onvoiceschanged = pickVoice;
function convertTextToSpeech(text) {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentSpeed;
    utterance.voice = currentVoice
    synthesis.speak(utterance);
}
recognitionBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.addEventListener("result", (e) => {
    const text = e.results[0][0].transcript;
    convertTextToSpeech(text);
});

textToSpeachBtn.addEventListener("click", () => {
    const text = textInput.value;
    convertTextToSpeech(text);
});

speedBtns.forEach(button => {
    button.addEventListener('click', () => {
        speedActiveBtn.classList.remove('active');
        button.classList.add('active')
        speedActiveBtn = button;
        currentSpeed = +button.dataset.speed
    })
})

