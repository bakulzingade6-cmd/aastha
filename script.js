/**
 * ========================================================
 * AASTHA'S BELATED BIRTHDAY WEB APPLICATION
 * Interactive Flow, Dodging Mechanics, Web Audio & Particles
 * ========================================================
 */

// Configuration & Customization Constants
const CONFIG = {
  recipientName: "Aastha",
  soundEnabled: true,
  song: {
    title: "Priyatama 2.0",
    fullTitle: "Priyatama 2.0 (Video Song) | Kabir Singh | Sahid Kapoor, Kiara Adwani | Radhan | AA Films",
    youtubeId: "4HtQG7i6hO0"
  },
  dodgePhrases: [
    "No 😤",
    "Are you sure? 🥺",
    "Pretty please? 🥺👉👈",
    "Nice try! 😜",
    "Think again... 🌹",
    "You can't escape! 🙈",
    "Error 404: 'No' not found! 😂",
    "Just click Yes already! 💕",
    "Look how big YES is! 👀",
    "Resistance is futile! ✨",
    "Okay, you're stubborn! 😆"
  ],
  dodgeRemarks: [
    "Hehe, nice try! Try clicking Yes instead 😉",
    "Oops! The button slipped away... 🙈",
    "Come on Aastha, you know you want to forgive me! 💕",
    "That 'No' button is slippery! 🧼",
    "Look at the YES button, it's glowing just for you! ✨",
    "I'll buy you your favorite coffee if you forgive me! ☕",
    "Almost had it! But Yes is so much easier ❤️"
  ]
};

// ========================================================
// 1. WEB AUDIO SYNTHESIZER (Zero external MP3 dependencies)
// ========================================================
class AudioController {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.musicInterval = null;
    this.isMusicPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft magical chime / harp glissando
  playChime() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.9);
      }, index * 90);
    });
  }

  // Playful pop / whoosh when 'No' button dodges
  playWhoosh() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  // Celebratory fanfare when 'Yes' is clicked
  playFanfare() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const chords = [
      { notes: [392.00, 493.88, 587.33], time: 0 },       // G maj
      { notes: [440.00, 554.37, 659.25], time: 220 },     // A maj
      { notes: [523.25, 659.25, 783.99, 1046.50], time: 480 } // C maj octave
    ];

    chords.forEach(chord => {
      setTimeout(() => {
        chord.notes.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 1.2);
        });
      }, chord.time);
    });
  }

  // Candle blow puff sound
  playBlow() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    // Breath / white noise puff
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.3);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Card flip click/swish
  playFlip() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Lofi Ambient Romantic progression generator (Soft Rhodes/electric piano simulation)
  toggleLofiMusic(callback) {
    this.init();
    if (!this.ctx) return;

    if (this.isMusicPlaying) {
      clearInterval(this.musicInterval);
      this.isMusicPlaying = false;
      if (callback) callback(false);
      return;
    }

    this.isMusicPlaying = true;
    if (callback) callback(true);

    // Warm chord progression: Fmaj7 -> Cmaj7 -> Dm7 -> Am7
    const chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [220.00, 261.63, 329.63, 392.00]  // Am7
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      const currentChord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      currentChord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.028, this.ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.04);
        osc.stop(this.ctx.currentTime + 2.9);
      });
    };

    playChord();
    this.musicInterval = setInterval(playChord, 3000);
  }
}

const audio = new AudioController();

// ========================================================
// PRIYATAMA 2.0 MUSIC PLAYER (YouTube IFrame + Audio Engine)
// Song: Priyatama 2.0 (Video Song) | Kabir Singh | Radhan
// ========================================================
class PriyatamaPlayer {
  constructor() {
    this.ytPlayer = null;
    this.isReady = false;
    this.isPlaying = false;
    this.videoId = CONFIG.song.youtubeId; // 4HtQG7i6hO0
    this.localAudio = null;
    this.musicDock = null;
    this.musicToggleBtn = null;
    this.musicLabel = null;
    this.dockPlayPauseBtn = null;
    this.dockCloseBtn = null;
  }

  setupDOM() {
    this.localAudio = document.getElementById('localAudioFallback');
    this.musicDock = document.getElementById('musicDock');
    this.musicToggleBtn = document.getElementById('musicToggleBtn');
    this.musicLabel = document.getElementById('musicLabel');
    this.dockPlayPauseBtn = document.getElementById('dockPlayPauseBtn');
    this.dockCloseBtn = document.getElementById('dockCloseBtn');

    // YouTube API init or ready check
    if (window.YT && window.YT.Player) {
      this.initYTPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        this.initYTPlayer();
      };
    }

    if (this.dockPlayPauseBtn) {
      this.dockPlayPauseBtn.addEventListener('click', () => this.toggle());
    }

    if (this.dockCloseBtn) {
      this.dockCloseBtn.addEventListener('click', () => {
        this.pause();
        if (this.musicDock) this.musicDock.classList.remove('active');
      });
    }
  }

  initYTPlayer() {
    try {
      this.ytPlayer = new YT.Player('ytPlayerContainer', {
        height: '200',
        width: '200',
        videoId: this.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: () => {
            this.isReady = true;
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              this.setPlayingState(true);
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
              this.setPlayingState(false);
            }
          },
          onError: () => {
            console.log("YouTube embed fallback: switching to alternate audio.");
          }
        }
      });
    } catch (e) {
      console.warn("Could not load YouTube player immediately", e);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    // 1. Try YouTube Player
    if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
      try {
        this.ytPlayer.playVideo();
        this.setPlayingState(true);
        return;
      } catch (err) {
        console.warn("YouTube play exception", err);
      }
    }

    // 2. Try Local Audio Fallback if mp3 exists
    if (this.localAudio && this.localAudio.currentSrc) {
      this.localAudio.play().then(() => {
        this.setPlayingState(true);
      }).catch(() => {
        // 3. Fallback to gentle ambient synthesizer chords
        audio.toggleLofiMusic((playing) => this.setPlayingState(playing));
      });
      return;
    }

    // If still initializing, retry briefly or use synth
    setTimeout(() => {
      if (this.ytPlayer && typeof this.ytPlayer.playVideo === 'function') {
        this.ytPlayer.playVideo();
        this.setPlayingState(true);
      } else {
        audio.toggleLofiMusic((playing) => this.setPlayingState(playing));
      }
    }, 400);
  }

  pause() {
    if (this.ytPlayer && typeof this.ytPlayer.pauseVideo === 'function') {
      try { this.ytPlayer.pauseVideo(); } catch (err) {}
    }
    if (this.localAudio) {
      try { this.localAudio.pause(); } catch (err) {}
    }
    if (audio.isMusicPlaying) {
      audio.toggleLofiMusic();
    }
    this.setPlayingState(false);
  }

  setPlayingState(playing) {
    this.isPlaying = playing;
    if (playing) {
      if (this.musicToggleBtn) this.musicToggleBtn.classList.add('playing');
      if (this.musicLabel) this.musicLabel.textContent = 'Priyatama 2.0 🎵';
      if (this.musicDock) {
        this.musicDock.classList.add('active', 'playing');
      }
      if (this.dockPlayPauseBtn) this.dockPlayPauseBtn.textContent = '⏸️';
    } else {
      if (this.musicToggleBtn) this.musicToggleBtn.classList.remove('playing');
      if (this.musicLabel) this.musicLabel.textContent = 'Priyatama 2.0';
      if (this.musicDock) {
        this.musicDock.classList.remove('playing');
      }
      if (this.dockPlayPauseBtn) this.dockPlayPauseBtn.textContent = '▶️';
    }
  }
}

const priyatamaPlayer = new PriyatamaPlayer();


// ========================================================
// 2. AMBIENT BACKGROUND PARTICLES CANVAS
// ========================================================
class AmbientParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = window.innerWidth < 600 ? 25 : 45;
    
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Spawn initial particles
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
    
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticle(randomY = false) {
    const types = ['heart', 'sparkle', 'dot'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 20,
      size: type === 'heart' ? (Math.random() * 8 + 8) : (Math.random() * 3 + 2),
      speedY: Math.random() * 0.6 + 0.25,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      type: type,
      hue: Math.random() > 0.4 ? 350 : 340, // Crimson / ruby hues
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02
    };
  }

  drawHeart(ctx, x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 15, size / 15);
    ctx.fillStyle = `rgba(255, 30, 66, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
    ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  drawSparkle(ctx, x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = `rgba(255, 209, 102, ${opacity})`;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.x, p.y, p.size, p.opacity);
      } else if (p.type === 'sparkle') {
        this.drawSparkle(this.ctx, p.x, p.y, p.size, p.opacity);
      } else {
        this.ctx.fillStyle = `rgba(255, 133, 161, ${p.opacity * 0.7})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Reset when particle floats off top or sides
      if (p.y < -20 || p.x < -20 || p.x > this.width + 20) {
        this.particles[i] = this.createParticle(false);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}


// ========================================================
// 3. CELEBRATORY CONFETTI ENGINE (With fallback)
// ========================================================
function launchCelebrationConfetti() {
  const colors = ['#ff1e42', '#e63946', '#ffb3c1', '#ffd166', '#ffffff'];

  // Check if canvas-confetti library is available
  if (typeof confetti === 'function') {
    // Center big burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: colors
    });

    // Left cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: colors
      });
    }, 200);

    // Right cannon
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: colors
      });
    }, 350);
  } else {
    // Offline / fallback DOM particle burst
    for (let i = 0; i < 60; i++) {
      const p = document.createElement('div');
      p.style.position = 'fixed';
      p.style.zIndex = '9999';
      p.style.pointerEvents = 'none';
      p.style.left = '50%';
      p.style.top = '60%';
      p.style.width = Math.random() * 8 + 6 + 'px';
      p.style.height = Math.random() * 8 + 6 + 'px';
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 300 + 150;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 100;
      
      p.style.transition = 'transform 1.2s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1.2s ease-out';
      document.body.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 1300);
    }
  }
}


// ========================================================
// 4. MAIN APPLICATION LOGIC & STAGE CONTROLLER
// ========================================================
document.addEventListener('DOMContentLoaded', () => {

  // Initialize Ambient Particle Canvas
  new AmbientParticleCanvas('ambientCanvas');

  // DOM Elements
  const stage1 = document.getElementById('stage1');
  const stage2 = document.getElementById('stage2');
  const stage3 = document.getElementById('stage3');

  // Stage 1 elements
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const openTeaserBtn = document.getElementById('openTeaserBtn');
  const waxSealBtn = document.getElementById('waxSealBtn');

  // Stage 2 elements
  const apologyCard = document.getElementById('apologyCard');
  const apologyEmoji = document.getElementById('apologyEmoji');
  const buttonsArea = document.getElementById('buttonsArea');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const noBtnText = document.getElementById('noBtnText');
  const dodgeRemark = document.getElementById('dodgeRemark');

  // Stage 3 Cake elements
  const candles = document.querySelectorAll('.candle');
  const blowCandlesBtn = document.getElementById('blowCandlesBtn');
  const relightBtn = document.getElementById('relightBtn');
  const wishBanner = document.getElementById('wishBanner');
  const cakeInstruction = document.getElementById('cakeInstruction');

  // Flip cards
  const flipCards = document.querySelectorAll('.flip-card');

  // Nav toggles & footer actions
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const replayBtn = document.getElementById('replayBtn');
  const extraConfettiBtn = document.getElementById('extraConfettiBtn');

  // Internal state
  let dodgeCount = 0;
  let yesScale = 1.0;
  let isEnvelopeOpened = false;
  let blownCandlesCount = 0;


  // ======================================================
  // STAGE TRANSITIONS
  // ======================================================
  function showStage(targetStage) {
    [stage1, stage2, stage3].forEach(stage => {
      if (stage === targetStage) {
        stage.style.display = 'block';
        setTimeout(() => {
          stage.classList.add('stage-active');
          stage.classList.remove('stage-hidden');
        }, 30);
      } else {
        stage.classList.remove('stage-active');
        stage.classList.add('stage-hidden');
        setTimeout(() => {
          stage.style.display = 'none';
        }, 500);
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  // Initialize Priyatama 2.0 Music Player
  priyatamaPlayer.setupDOM();

  // ======================================================
  // SOUND & MUSIC TOGGLES
  // ======================================================
  soundToggleBtn.addEventListener('click', () => {
    audio.soundEnabled = !audio.soundEnabled;
    soundIcon.textContent = audio.soundEnabled ? '🔔' : '🔕';
    soundToggleBtn.title = audio.soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted';
    if (audio.soundEnabled) audio.playFlip();
  });

  musicToggleBtn.addEventListener('click', () => {
    priyatamaPlayer.toggle();
  });


  // ======================================================
  // STAGE 1: ENVELOPE OPENING
  // ======================================================
  function openEnvelopeAndProceed() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    audio.playChime();
    envelopeWrapper.classList.add('open');

    // Give time for envelope fold & letter slide animation, then transition
    setTimeout(() => {
      showStage(stage2);
    }, 1100);
  }

  envelopeWrapper.addEventListener('click', openEnvelopeAndProceed);
  openTeaserBtn.addEventListener('click', openEnvelopeAndProceed);
  waxSealBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEnvelopeAndProceed();
  });


  // ======================================================
  // STAGE 2: PLAYFUL VIRAL DODGING "NO" BUTTON
  // ======================================================
  function dodgeNoButton(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    dodgeCount++;
    audio.playWhoosh();

    // 1. Grow YES button progressively
    yesScale = Math.min(1.42, 1.0 + dodgeCount * 0.07);
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.boxShadow = `0 0 ${20 + dodgeCount * 8}px rgba(255, 30, 66, ${0.45 + dodgeCount * 0.05})`;

    // 2. Change text on NO button
    const phraseIdx = dodgeCount % CONFIG.dodgePhrases.length;
    noBtnText.textContent = CONFIG.dodgePhrases[phraseIdx];

    // 3. Show playful remark
    const remarkIdx = (dodgeCount - 1) % CONFIG.dodgeRemarks.length;
    dodgeRemark.querySelector('span').textContent = CONFIG.dodgeRemarks[remarkIdx];
    dodgeRemark.classList.add('show');

    // 4. Emoji progression
    const cuteEmojis = ['🥺', '🙈', '👉👈', '🥺', '😭', '💖', '👀'];
    apologyEmoji.textContent = cuteEmojis[dodgeCount % cuteEmojis.length];

    // 5. Calculate new safe position inside the viewport
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // Viewport boundaries with safety padding
    const padding = 20;
    const availableW = Math.max(20, window.innerWidth - btnRect.width - padding * 2);
    const availableH = Math.max(20, window.innerHeight - btnRect.height - padding * 2);

    let newX = padding;
    let newY = padding;
    let collision = true;
    let attempts = 0;

    // Pick random coordinate, ensuring it doesn't overlap the YES button
    while (collision && attempts < 15) {
      newX = Math.floor(Math.random() * availableW) + padding;
      newY = Math.floor(Math.random() * availableH) + padding;

      // Check distance from YES button
      const distToYesX = Math.abs(newX - yesRect.left);
      const distToYesY = Math.abs(newY - yesRect.top);

      if (distToYesX > 100 || distToYesY > 70) {
        collision = false;
      }
      attempts++;
    }

    // Set fixed position with smooth spring transition
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.zIndex = '999';
    noBtn.style.transition = 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }

  // Handle both pointer hover (desktop) and tap/touchstart (mobile)
  noBtn.addEventListener('mouseenter', dodgeNoButton);
  noBtn.addEventListener('touchstart', dodgeNoButton, { passive: false });
  noBtn.addEventListener('pointerdown', (e) => {
    // If it's a touch or mouse click attempt, dodge!
    if (dodgeCount < 10) {
      dodgeNoButton(e);
    }
  });

  // If user somehow manages to click "No" (fast clicker)
  noBtn.addEventListener('click', (e) => {
    if (dodgeCount < 8) {
      dodgeNoButton(e);
    } else {
      // Surrender playfully and accept forgiveness
      noBtnText.textContent = "Okay, YES! ❤️";
      setTimeout(() => {
        acceptApology();
      }, 400);
    }
  });


  // ======================================================
  // ACCEPT APOLOGY -> REVEAL CELEBRATION (STAGE 3)
  // ======================================================
  function acceptApology() {
    audio.playFanfare();
    launchCelebrationConfetti();

    // Smooth transition to Stage 3
    showStage(stage3);

    // Continuous mini confetti shower on celebration reveal
    setTimeout(() => {
      launchCelebrationConfetti();
    }, 600);
  }

  yesBtn.addEventListener('click', acceptApology);


  // ======================================================
  // STAGE 3: INTERACTIVE BIRTHDAY CAKE & CANDLE BLOWING
  // ======================================================
  function extinguishCandle(candleEl) {
    if (candleEl.classList.contains('extinguished')) return;

    candleEl.classList.add('extinguished');
    blownCandlesCount++;
    audio.playBlow();

    // Check if all candles are blown
    if (blownCandlesCount >= candles.length) {
      allCandlesBlown();
    }
  }

  // Individual candle tap
  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      extinguishCandle(candle);
    });
  });

  // Blow out all candles button
  blowCandlesBtn.addEventListener('click', () => {
    candles.forEach((candle, idx) => {
      setTimeout(() => {
        extinguishCandle(candle);
      }, idx * 160);
    });
  });

  function allCandlesBlown() {
    audio.playChime();
    launchCelebrationConfetti();

    // Update UI instructions and reveal wish banner
    cakeInstruction.textContent = "✨ All candles are blown out! Your wish is on its way to the stars! ✨";
    wishBanner.classList.add('show');

    // Swap buttons to relight option
    blowCandlesBtn.style.display = 'none';
    relightBtn.style.display = 'inline-block';
  }

  // Relight candles
  relightBtn.addEventListener('click', () => {
    audio.playFlip();
    candles.forEach(candle => {
      candle.classList.remove('extinguished');
    });
    blownCandlesCount = 0;
    cakeInstruction.textContent = "Make a secret wish in your heart, then tap the candles to blow them out!";
    wishBanner.classList.remove('show');

    blowCandlesBtn.style.display = 'inline-block';
    relightBtn.style.display = 'none';
  });


  // ======================================================
  // INTERACTIVE 3D FLIP CARDS
  // ======================================================
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      audio.playFlip();
    });
  });


  // ======================================================
  // EXTRA CONFETTI BUTTON & REPLAY
  // ======================================================
  extraConfettiBtn.addEventListener('click', () => {
    audio.playChime();
    launchCelebrationConfetti();
  });

  replayBtn.addEventListener('click', () => {
    audio.playFlip();
    
    // Reset all states
    isEnvelopeOpened = false;
    envelopeWrapper.classList.remove('open');
    
    dodgeCount = 0;
    yesScale = 1.0;
    yesBtn.style.transform = 'scale(1)';
    yesBtn.style.boxShadow = '';
    
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtnText.textContent = "No 😤";
    dodgeRemark.classList.remove('show');
    apologyEmoji.textContent = '🥺';

    candles.forEach(candle => candle.classList.remove('extinguished'));
    blownCandlesCount = 0;
    cakeInstruction.textContent = "Make a secret wish in your heart, then tap the candles to blow them out!";
    wishBanner.classList.remove('show');
    blowCandlesBtn.style.display = 'inline-block';
    relightBtn.style.display = 'none';

    flipCards.forEach(card => card.classList.remove('flipped'));

    // Go back to Stage 1
    showStage(stage1);
  });

});
