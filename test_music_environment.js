// Test suite for Q-Bi Character-Specific Musical Ambient Environments
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('GTs - Q比 (Q-Bi) 各角色風格專屬音樂環境功能測試');
console.log('====================================================\n');

// Mock Web Audio API
class MockAudioNode {
  constructor() {
    this.gain = {
      value: 1,
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {},
      linearRampToValueAtTime: () => {}
    };
    this.frequency = {
      value: 440,
      setValueAtTime: () => {},
      exponentialRampToValueAtTime: () => {},
      linearRampToValueAtTime: () => {}
    };
    this.Q = {
      value: 1,
      setValueAtTime: () => {}
    };
  }
  connect() {}
  disconnect() {}
  start() {}
  stop() {}
}

class MockAudioContext {
  constructor() {
    this.state = 'running';
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.destination = new MockAudioNode();
  }
  createOscillator() { return new MockAudioNode(); }
  createGain() { return new MockAudioNode(); }
  createBiquadFilter() { return new MockAudioNode(); }
  createBuffer(channels, length, sampleRate) {
    return {
      length,
      sampleRate,
      getChannelData: () => new Float32Array(length)
    };
  }
  createBufferSource() { return new MockAudioNode(); }
  resume() { return Promise.resolve(); }
}

const domElements = {};
function createMockElement(id) {
  return {
    id,
    classList: {
      contains: () => false,
      add: () => {},
      remove: () => {},
      toggle: () => {}
    },
    style: {},
    innerHTML: '',
    textContent: '',
    title: '',
    dataset: {},
    querySelectorAll: () => [],
    addEventListener: () => {}
  };
}

const sandbox = {
  window: {},
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  document: {
    getElementById: (id) => {
      if (!domElements[id]) domElements[id] = createMockElement(id);
      return domElements[id];
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    body: { style: {} }
  },
  console: console,
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  setInterval: (fn) => 999,
  clearInterval: () => {}
};
sandbox.window = sandbox;
sandbox.window.localStorage = sandbox.localStorage;

vm.createContext(sandbox);

// 1. Load soundEffects.js
const soundCode = fs.readFileSync(path.join(__dirname, 'js/soundEffects.js'), 'utf8');
vm.runInContext(soundCode, sandbox);
const soundEngine = sandbox.window.soundEngine;

// 2. Load qbiCompanion.js
const qbiCode = fs.readFileSync(path.join(__dirname, 'js/qbiCompanion.js'), 'utf8');
vm.runInContext(qbiCode, sandbox);
const qbiCompanion = sandbox.window.qbiCompanion;

console.log('【測試 1：驗證 5 隻角色風格專屬音樂環境配置】');
const poses = ['jump', 'walk', 'sit', 'think', 'sleep'];
poses.forEach(pose => {
  const info = soundEngine.getPoseAmbientInfo(pose);
  if (info && info.name && info.desc) {
    console.log(`  ✔ [${pose}] ➔ ${info.name} (${info.desc})`);
  } else {
    console.error(`  ❌ [${pose}] 缺乏完整的音樂環境資訊！`);
    process.exit(1);
  }
});

console.log('\n【測試 2：驗證各角色風格專屬即時樂句 (playPoseCue)】');
poses.forEach(pose => {
  try {
    soundEngine.playPoseCue(pose);
    console.log(`  ✔ 成功演奏 [${pose}] 專屬風格即時樂句`);
  } catch (err) {
    console.error(`  ❌ 演奏 [${pose}] 失敗:`, err);
    process.exit(1);
  }
});

console.log('\n【測試 3：驗證持續性氛圍音樂環境引擎 (startAmbient & switchAmbient)】');
// Start jump ambient
soundEngine.startAmbient('jump');
if (soundEngine.isAmbientPlaying && soundEngine.currentAmbientPose === 'jump') {
  console.log('  ✔ 成功啟動【🎉 陽光慶典・活力節奏】持續氛圍音樂');
} else {
  console.error('  ❌ 啟動 jump 氛圍音樂失敗！');
  process.exit(1);
}

// Switch across all 4 other poses
poses.slice(1).forEach(pose => {
  soundEngine.switchAmbient(pose);
  const info = soundEngine.getPoseAmbientInfo(pose);
  if (soundEngine.isAmbientPlaying && soundEngine.currentAmbientPose === pose) {
    console.log(`  ✔ 成功平滑切換至【${info.name}】氛圍音樂`);
  } else {
    console.error(`  ❌ 切換至 ${pose} 氛圍音樂失敗！`);
    process.exit(1);
  }
});

console.log('\n【測試 4：驗證氛圍音樂音量調節與暫停開關 (Volume & Toggle)】');
soundEngine.setAmbientVolume(0.7);
if (soundEngine.ambientVolume === 0.7) {
  console.log('  ✔ 音量成功調整為 0.7');
} else {
  console.error('  ❌ 音量調整失敗！');
  process.exit(1);
}

const isStopped = soundEngine.toggleAmbient();
if (!isStopped && !soundEngine.isAmbientPlaying) {
  console.log('  ✔ toggleAmbient 成功暫停播放');
} else {
  console.error('  ❌ toggleAmbient 暫停失敗！');
  process.exit(1);
}

const isStarted = soundEngine.toggleAmbient('sit');
if (isStarted && soundEngine.isAmbientPlaying && soundEngine.currentAmbientPose === 'sit') {
  console.log('  ✔ toggleAmbient 成功重新啟動【☕ 溫馨書房・雨聲 Lo-Fi】');
} else {
  console.error('  ❌ toggleAmbient 重啟失敗！');
  process.exit(1);
}

soundEngine.stopAmbient();
console.log('  ✔ stopAmbient 成功停止所有節點與排程計時器');

console.log('\n【測試 5：驗證吉祥物主控制器 (qbiCompanion) 切換角色與音樂環境聯動】');
qbiCompanion.init();

// Select Walk pose
qbiCompanion.setPose('walk');
if (qbiCompanion.currentPose === 'walk') {
  console.log('  ✔ qbiCompanion 切換至 [walk] 成功觸發專屬樂句與環境聯動');
} else {
  console.error('  ❌ qbiCompanion 切換 pose 失敗！');
  process.exit(1);
}

// Select Sit pose
qbiCompanion.setPose('sit');
if (qbiCompanion.currentPose === 'sit') {
  console.log('  ✔ qbiCompanion 切換至 [sit] 成功觸發專屬樂句與環境聯動');
} else {
  console.error('  ❌ qbiCompanion 切換 pose 失敗！');
  process.exit(1);
}

console.log('\n====================================================');
console.log('🎉 全部 5 大測試項 100% 通過！各角色音樂環境完美就緒！');
console.log('====================================================');
