// Web Audio API Synthesizer and Web Speech Audio Engine
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('omnilearn_muted') === 'true';
    this.speechSynth = window.speechSynthesis;
    this.isSpeaking = false;

    // Ambient Music Environment State
    this.isAmbientPlaying = false;
    this.ambientVolume = parseFloat(localStorage.getItem('gts_ambient_volume') || '0.45');
    this.currentAmbientPose = 'jump';
    this.ambientMasterGain = null;
    this.ambientActiveNodes = [];
    this.ambientIntervals = [];
    this.noiseBuffer = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('omnilearn_muted', this.isMuted);
    if (this.isMuted) {
      if (this.speechSynth) {
        this.speechSynth.cancel();
        this.isSpeaking = false;
      }
      if (this.isAmbientPlaying) {
        this.stopAmbient();
      }
    }
    return this.isMuted;
  }

  // Soft mechanical tap
  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  // Cheerful chime on correct answer (C5 -> E5 -> G5)
  playCorrect() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        const start = this.audioCtx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch (e) {}
  }

  // Gentle low tone on mistake
  playWrong() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      const start = this.audioCtx.currentTime;
      osc.frequency.setValueAtTime(220, start);
      osc.frequency.linearRampToValueAtTime(180, start + 0.2);
      gain.gain.setValueAtTime(0.09, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(start);
      osc.stop(start + 0.28);
    } catch (e) {}
  }

  // Celebration triumph fanfare
  playVictory() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      const chords = [
        { f: 523.25, t: 0.0 }, // C5
        { f: 659.25, t: 0.1 }, // E5
        { f: 783.99, t: 0.2 }, // G5
        { f: 1046.50, t: 0.35 } // C6 (held)
      ];
      chords.forEach(n => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        const start = this.audioCtx.currentTime + n.t;
        const dur = n.t >= 0.3 ? 0.6 : 0.2;
        osc.frequency.setValueAtTime(n.f, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + dur + 0.05);
      });
    } catch (e) {}
  }

  // ============================================================
  // CHARACTER POSE SIGNATURE MUSICAL CUES
  // ============================================================
  playPoseCue(poseName) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      if (poseName === 'jump') {
        // 🎉 跳躍慶祝：活力喜悅大調音階 (C5 -> E5 -> G5 -> B5 -> C6)
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          const t = now + idx * 0.06;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.14, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.24);
        });
      } else if (poseName === 'walk') {
        // 🚶 歡樂漫步：木琴與腳步躍動節奏 (woodblock + E4 -> G4 -> A4 -> C5)
        const notes = [329.63, 392.00, 440.00, 523.25];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          const t = now + idx * 0.08;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.18);
        });
      } else if (poseName === 'sit') {
        // 📖 專注伴讀：Lo-Fi 爵士電鋼琴滾奏暖和弦 (Fmaj7: F3 -> C4 -> E4 -> A4)
        const notes = [174.61, 261.63, 329.63, 440.00];
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, now);
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          const t = now + idx * 0.035;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
          osc.connect(gain);
          gain.connect(filter);
          osc.start(t);
          osc.stop(t + 0.7);
        });
        filter.connect(this.audioCtx.destination);
      } else if (poseName === 'think') {
        // 💡 深度思考：靈感宇宙頌缽 (432Hz + 864Hz) 與靈感閃爍高音 (E6, A6)
        const drone = this.audioCtx.createOscillator();
        const droneGain = this.audioCtx.createGain();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(432, now);
        droneGain.gain.setValueAtTime(0.12, now);
        droneGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        drone.connect(droneGain);
        droneGain.connect(this.audioCtx.destination);
        drone.start(now);
        drone.stop(now + 1.25);

        // High shimmer bell
        [1318.51, 1760.00].forEach((freq, i) => {
          const spark = this.audioCtx.createOscillator();
          const sparkGain = this.audioCtx.createGain();
          spark.type = 'sine';
          const t = now + 0.12 + i * 0.1;
          spark.frequency.setValueAtTime(freq, t);
          sparkGain.gain.setValueAtTime(0.08, t);
          sparkGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
          spark.connect(sparkGain);
          sparkGain.connect(this.audioCtx.destination);
          spark.start(t);
          spark.stop(t + 0.85);
        });
      } else if (poseName === 'sleep') {
        // 💤 小憩充電：溫柔星空音樂盒搖籃曲 (E5 -> B4 -> G#4 -> E4)
        const notes = [659.25, 493.88, 415.30, 329.63];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          const t = now + idx * 0.16;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.11, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.6);
        });
      }
    } catch (e) {}
  }

  // ============================================================
  // CONTINUOUS AMBIENT SOUNDSCAPE & MUSIC ENVIRONMENT ENGINE
  // ============================================================
  getPoseAmbientInfo(poseName) {
    const infos = {
      jump: {
        id: 'jump',
        name: '🎉 陽光慶典・活力節奏',
        desc: '歡騰大調音階・激發學習鬥志與動能',
        icon: '🎉'
      },
      walk: {
        id: 'walk',
        name: '🚶 林間步道・輕快節拍',
        desc: '清脆木琴腳步・戶外微風與鳥鳴漫步',
        icon: '🚶'
      },
      sit: {
        id: 'sit',
        name: '☕ 溫馨書房・雨聲 Lo-Fi',
        desc: '窗邊細雨淅瀝・爵士電鋼琴溫暖伴讀',
        icon: '☕'
      },
      think: {
        id: 'think',
        name: '🌌 靈感宇宙・星空頌缽',
        desc: '432Hz 深度專注・西藏頌缽與天體共振',
        icon: '🌌'
      },
      sleep: {
        id: 'sleep',
        name: '🌙 搖籃夜曲・星空微風',
        desc: '八音盒星空催眠曲・夜風蟲鳴舒緩充電',
        icon: '🌙'
      }
    };
    return infos[poseName] || infos.jump;
  }

  createPinkNoiseBuffer(duration = 2.5) {
    if (!this.audioCtx) return null;
    const sampleRate = this.audioCtx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = this.audioCtx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  startAmbient(poseName = this.currentAmbientPose) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    this.stopAmbient(false); // Stop prior without changing isAmbientPlaying

    this.isAmbientPlaying = true;
    this.currentAmbientPose = poseName;

    // Master Ambient Gain Node
    this.ambientMasterGain = this.audioCtx.createGain();
    this.ambientMasterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.ambientMasterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.01, this.ambientVolume),
      this.audioCtx.currentTime + 0.35
    );
    this.ambientMasterGain.connect(this.audioCtx.destination);

    if (poseName === 'jump') {
      this._startJumpAmbient();
    } else if (poseName === 'walk') {
      this._startWalkAmbient();
    } else if (poseName === 'sit') {
      this._startSitAmbient();
    } else if (poseName === 'think') {
      this._startThinkAmbient();
    } else if (poseName === 'sleep') {
      this._startSleepAmbient();
    }
  }

  stopAmbient(markState = true) {
    if (markState) {
      this.isAmbientPlaying = false;
    }
    // Clear all scheduled intervals
    this.ambientIntervals.forEach(t => clearInterval(t));
    this.ambientIntervals = [];

    // Smoothly fade out master gain
    if (this.ambientMasterGain && this.audioCtx) {
      try {
        const curTime = this.audioCtx.currentTime;
        this.ambientMasterGain.gain.setValueAtTime(this.ambientMasterGain.gain.value, curTime);
        this.ambientMasterGain.gain.exponentialRampToValueAtTime(0.0001, curTime + 0.2);
        const oldGain = this.ambientMasterGain;
        setTimeout(() => {
          try { oldGain.disconnect(); } catch (e) {}
        }, 250);
      } catch (e) {}
    }

    // Stop active audio nodes
    this.ambientActiveNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.ambientActiveNodes = [];
  }

  switchAmbient(poseName) {
    this.currentAmbientPose = poseName;
    if (this.isAmbientPlaying) {
      this.startAmbient(poseName);
    }
  }

  toggleAmbient(poseName = this.currentAmbientPose) {
    if (this.isAmbientPlaying) {
      this.stopAmbient(true);
      return false;
    } else {
      this.startAmbient(poseName);
      return true;
    }
  }

  setAmbientVolume(vol) {
    this.ambientVolume = Math.max(0, Math.min(1, parseFloat(vol)));
    localStorage.setItem('gts_ambient_volume', this.ambientVolume);
    if (this.ambientMasterGain && this.audioCtx) {
      try {
        this.ambientMasterGain.gain.setValueAtTime(this.ambientVolume, this.audioCtx.currentTime);
      } catch (e) {}
    }
  }

  // 1. Jump Environment: Upbeat Festival Celebration Synth Arpeggios & Bright Beats
  _startJumpAmbient() {
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5, D5, E5, G5, A5, C6
    let step = 0;

    const playArpBeat = () => {
      if (!this.audioCtx || !this.ambientMasterGain) return;
      const now = this.audioCtx.currentTime;
      const noteFreq = scale[step % scale.length];
      step = (step + 1 + (Math.random() > 0.7 ? 2 : 0)) % scale.length;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ambientMasterGain);
      osc.start(now);
      osc.stop(now + 0.38);

      // Light bass root on downbeats
      if (step % 4 === 0) {
        const bass = this.audioCtx.createOscillator();
        const bassGain = this.audioCtx.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(130.81, now); // C3
        bassGain.gain.setValueAtTime(0.12, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        bass.connect(bassGain);
        bassGain.connect(this.ambientMasterGain);
        bass.start(now);
        bass.stop(now + 0.55);
      }
    };

    playArpBeat();
    const interval = setInterval(playArpBeat, 420);
    this.ambientIntervals.push(interval);
  }

  // 2. Walk Environment: Forest Stroll Rhythmic Footsteps & Outdoor Breeze
  _startWalkAmbient() {
    let leftRight = false;
    const notes = [329.63, 392.00, 440.00, 493.88]; // E4, G4, A4, B4
    let noteIdx = 0;

    // Outdoor gentle wind buffer
    const noiseBuffer = this.createPinkNoiseBuffer(3);
    if (noiseBuffer) {
      const noiseSource = this.audioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(1.8, this.audioCtx.currentTime);

      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);

      noiseSource.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ambientMasterGain);

      noiseSource.start();
      this.ambientActiveNodes.push(noiseSource, noiseGain, filter);
    }

    const stepAction = () => {
      if (!this.audioCtx || !this.ambientMasterGain) return;
      const now = this.audioCtx.currentTime;
      leftRight = !leftRight;

      // Soft woodblock click
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(leftRight ? 580 : 490, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ambientMasterGain);
      osc.start(now);
      osc.stop(now + 0.07);

      // Occasional playful marimba note
      if (Math.random() > 0.4) {
        const mNote = this.audioCtx.createOscillator();
        const mGain = this.audioCtx.createGain();
        mNote.type = 'triangle';
        mNote.frequency.setValueAtTime(notes[noteIdx % notes.length], now + 0.02);
        noteIdx++;
        mGain.gain.setValueAtTime(0.07, now + 0.02);
        mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        mNote.connect(mGain);
        mGain.connect(this.ambientMasterGain);
        mNote.start(now + 0.02);
        mNote.stop(now + 0.3);
      }
    };

    stepAction();
    const interval = setInterval(stepAction, 540);
    this.ambientIntervals.push(interval);
  }

  // 3. Sit Environment: Rainy Window & Warm Lo-Fi Study Chords
  _startSitAmbient() {
    // 1. Procedural Window Rain
    const noiseBuffer = this.createPinkNoiseBuffer(3);
    if (noiseBuffer) {
      const rainSource = this.audioCtx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      const rainFilter = this.audioCtx.createBiquadFilter();
      rainFilter.type = 'lowpass';
      rainFilter.frequency.setValueAtTime(750, this.audioCtx.currentTime);

      const rainGain = this.audioCtx.createGain();
      rainGain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);

      rainSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ambientMasterGain);

      rainSource.start();
      this.ambientActiveNodes.push(rainSource, rainGain, rainFilter);
    }

    // 2. Lo-Fi Rhodes Piano Progression (Fmaj7 - Em7 - Dm7 - Cmaj7)
    const chords = [
      [174.61, 261.63, 329.63, 440.00], // Fmaj7 (F3, C4, E4, A4)
      [164.81, 246.94, 293.66, 392.00], // Em7 (E3, B3, D4, G4)
      [146.83, 220.00, 261.63, 349.23], // Dm7 (D3, A3, C4, F4)
      [130.81, 196.00, 246.94, 329.63]  // Cmaj7 (C3, G3, B3, E4)
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.audioCtx || !this.ambientMasterGain) return;
      const now = this.audioCtx.currentTime;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);

      chord.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        const t = now + idx * 0.04;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.2);

        osc.connect(gain);
        gain.connect(filter);
        osc.start(t);
        osc.stop(t + 2.3);
      });

      filter.connect(this.ambientMasterGain);
    };

    playChord();
    const interval = setInterval(playChord, 3200);
    this.ambientIntervals.push(interval);
  }

  // 4. Think Environment: 432Hz Alpha Wave Drone & Tibetan Singing Bowl
  _startThinkAmbient() {
    // Binaural Alpha Focus Drone: 432Hz & 442Hz (10Hz focus alpha beat)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gain1 = this.audioCtx.createGain();
    const gain2 = this.audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(216, this.audioCtx.currentTime); // 432 octave down
    gain1.gain.setValueAtTime(0.06, this.audioCtx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(226, this.audioCtx.currentTime);
    gain2.gain.setValueAtTime(0.06, this.audioCtx.currentTime);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.ambientMasterGain);
    gain2.connect(this.ambientMasterGain);

    osc1.start();
    osc2.start();
    this.ambientActiveNodes.push(osc1, osc2, gain1, gain2);

    // Periodic Tibetan Singing Bowl chime
    const bowlHarmonics = [432.00, 864.00, 1296.00];
    const playSingingBowl = () => {
      if (!this.audioCtx || !this.ambientMasterGain) return;
      const now = this.audioCtx.currentTime;

      bowlHarmonics.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        const amp = idx === 0 ? 0.09 : 0.035;
        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.ambientMasterGain);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    };

    playSingingBowl();
    const interval = setInterval(playSingingBowl, 4600);
    this.ambientIntervals.push(interval);
  }

  // 5. Sleep Environment: Celestial Music Box & Nocturnal Crickets
  _startSleepAmbient() {
    // 1. Soft nocturnal night breeze drone
    const noiseBuffer = this.createPinkNoiseBuffer(3);
    if (noiseBuffer) {
      const breeze = this.audioCtx.createBufferSource();
      breeze.buffer = noiseBuffer;
      breeze.loop = true;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);

      breeze.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientMasterGain);

      breeze.start();
      this.ambientActiveNodes.push(breeze, gain, filter);
    }

    // 2. Starry Music Box Lullaby (E5 - G#5 - B5 - E6 - B5 - G#5)
    const lullabyNotes = [659.25, 830.61, 987.77, 1318.51, 987.77, 830.61, 659.25, 493.88];
    let noteIdx = 0;

    const playMusicBoxNote = () => {
      if (!this.audioCtx || !this.ambientMasterGain) return;
      const now = this.audioCtx.currentTime;
      const freq = lullabyNotes[noteIdx % lullabyNotes.length];
      noteIdx++;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.075, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      osc.connect(gain);
      gain.connect(this.ambientMasterGain);
      osc.start(now);
      osc.stop(now + 1.7);
    };

    playMusicBoxNote();
    const interval = setInterval(playMusicBoxNote, 2400);
    this.ambientIntervals.push(interval);
  }

  // Text-To-Speech Reader using Web Speech API
  speakText(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      alert('您的瀏覽器暫不支援語音朗讀功能');
      return;
    }
    this.speechSynth.cancel();
    if (!text || text.trim() === '') return;

    // Strip HTML tags for clean reading
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Choose appropriate voice
    const voices = this.speechSynth.getVoices();
    const isChinese = /[\u4e00-\u9fa5]/.test(cleanText);
    const selectedVoice = voices.find(v => isChinese ? (v.lang.includes('zh') || v.lang.includes('cmn')) : v.lang.includes('en'));
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    this.isSpeaking = true;
    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.speechSynth.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
    }
  }
}

window.soundEngine = new SoundEngine();
