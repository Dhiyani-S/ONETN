const outputText = document.getElementById("outputText");
const inputText = document.getElementById("inputText");
const languageSelect = document.getElementById("language");

// <-- Backend URL here -->
const TRANSLATE_API_URL = "http://localhost:3000/translate"; // Replace with hosted URL if deployed

// Function to translate typed text
async function translateText() {
  const text = inputText.value.trim();
  if (!text) return;

  const targetLang = languageSelect.value;

  try {
    const response = await fetch(`${TRANSLATE_API_URL}?text=${encodeURIComponent(text)}&target=${targetLang}`);
    const data = await response.json();

    outputText.innerText = data.translatedText;

    // Text-to-speech
    const utterance = new SpeechSynthesisUtterance(data.translatedText);
    utterance.lang = targetLang === "ta" ? "ta-IN" : targetLang === "hi" ? "hi-IN" : "en-US";
    speechSynthesis.speak(utterance);

  } catch (err) {
    outputText.innerText = "Translation failed: " + err;
  }
}

// Microphone input
function startMic() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech Recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    inputText.value = event.results[0][0].transcript;
    translateText();
  };

  recognition.start();
}
