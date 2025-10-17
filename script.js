// Initialize Lucide icons
lucide.createIcons();

// Elements to pulse
const pulseElements = document.querySelectorAll('.bobPulse');

const enterScreen = document.getElementById('enter-screen');
const mainContent = document.getElementById('main-content');
const music = document.getElementById('bg-music');

// Handle full-screen enter click
enterScreen.addEventListener('click', async () => {
  enterScreen.style.opacity = '0';
  setTimeout(async () => {
    enterScreen.style.display = 'none';
    mainContent.classList.remove('hidden');

    // Resume audio context (required by some browsers)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    await audioCtx.resume();

    // Create MediaElementSource from local audio
    const source = audioCtx.createMediaElementSource(music);

    // Create analyser
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Play music
    music.volume = 0.5;
    music.play().catch(err => console.log("Autoplay blocked:", err));

    // Start beat animation
    animatePulse(analyser, pulseElements);
  }, 600);
});

// --- Animate pulse based on music ---
function animatePulse(analyser, elements) {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function pulseFrame() {
    requestAnimationFrame(pulseFrame);
    analyser.getByteFrequencyData(dataArray);

    // Compute average volume
    const avg = dataArray.reduce((a, b) => a + b) / bufferLength;

    // Map avg to scale & opacity
    const scale = 1 + (avg / 2560);    // max ~1.05
    const opacity = 0.85 + (avg / 5120); // ~0.85-1.0

    elements.forEach(el => {
      el.style.transform = `scale(${scale})`;
      el.style.opacity = opacity;
    });
  }

  pulseFrame();
}
