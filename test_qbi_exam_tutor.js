// Test verification of Q-Bi Proactive Exam Question Assistance
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('GTs - Q比 (Q-Bi) 考場免提問直出解析功能測試');
console.log('====================================================\n');

// Mock DOM & Sound Engine
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
    dataset: {},
    querySelectorAll: () => [],
    addEventListener: () => {},
    focus: () => {}
  };
}

const sandbox = {
  window: {},
  document: {
    getElementById: (id) => {
      if (!domElements[id]) domElements[id] = createMockElement(id);
      return domElements[id];
    },
    querySelector: (sel) => {
      if (sel.includes('#hud-qbi-tutor-trigger')) {
        return createMockElement('hud-qbi-tutor-trigger');
      }
      return null;
    },
    querySelectorAll: () => [],
    body: { style: {} }
  },
  console: console,
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  setInterval: () => 123,
  clearInterval: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  }
};
sandbox.window = sandbox;
sandbox.window.localStorage = sandbox.localStorage;
sandbox.window.soundEngine = {
  playClick: () => {},
  playCorrect: () => {},
  playWrong: () => {},
  playVictory: () => {},
  speakText: () => {}
};

vm.createContext(sandbox);

// 1. Load examData.js
const examDataCode = fs.readFileSync(path.join(__dirname, 'js/examData.js'), 'utf8');
vm.runInContext(examDataCode, sandbox);

// 2. Load examEngine.js
const examEngineCode = fs.readFileSync(path.join(__dirname, 'js/examEngine.js'), 'utf8');
vm.runInContext(examEngineCode, sandbox);

// 3. Load aiTutor.js
const aiTutorCode = fs.readFileSync(path.join(__dirname, 'js/aiTutor.js'), 'utf8');
vm.runInContext(aiTutorCode, sandbox);

const examEngine = sandbox.window.examEngine;
const aiTutor = sandbox.window.aiTutor;

aiTutor.init();

// Test Scenario 1: Start Exam
console.log('【測試 1：進入光合作用專項考卷】');
const paper = sandbox.window.EXAM_DATA.papers.find(p => p.id === 'paper-bio-photosynthesis');
if (!paper) {
  console.error('❌ 找不到 paper-bio-photosynthesis！');
  process.exit(1);
}
examEngine.startExamWithPaper(paper, 'practice');
console.log(`✔ 考卷成功啟動：[${examEngine.currentPaper.title}]，當前為第 ${examEngine.currentIndex + 1} 題`);

// Test Scenario 2: Student clicks Q-Bi avatar circle without typing anything!
console.log('\n【測試 2：點擊 Q比 小圓圈（免提問、免輸入直出本題詳解與提示）】');
aiTutor.handleWidgetClick();

if (!aiTutor.isOpen) {
  console.error('❌ Q比 抽屜未開啟！');
  process.exit(1);
}
console.log('✔ Q比 導師抽屜成功打開 (isOpen = true)');

const lastMsg = aiTutor.messages[aiTutor.messages.length - 1];
if (!lastMsg || lastMsg.role !== 'assistant') {
  console.error('❌ 未自動生成 Q比 講解回覆！');
  process.exit(1);
}

const html = lastMsg.text;
const requiredSections = [
  '🐾 Q比 考場即時解惑',
  '🎯 核心考點',
  '💡 題幹破題思路',
  '🔍 為什麼是這個答案？深度詳解',
  '【正確選項 (A)】',
  '📊 即時診斷與防坑指南'
];

let allPassed = true;
requiredSections.forEach(sec => {
  if (html.includes(sec)) {
    console.log(`  ✔ 正確包含區塊: [${sec}]`);
  } else {
    console.error(`  ❌ 缺失區塊: [${sec}]`);
    allPassed = false;
  }
});

if (!allPassed) {
  console.error('Q比 輸出內容：\n', html);
  process.exit(1);
}

// Test Scenario 3: Test Option Trap Breakdown Preset
console.log('\n【測試 3：點擊「逐一剖析 4 個選項陷阱」】');
aiTutor.handleOptionBreakdownRequest();
const trapMsg = aiTutor.messages[aiTutor.messages.length - 1];
if (trapMsg.text.includes('4 個選項陷阱全拆解') && trapMsg.text.includes('選項 (A)【正確正解】') && trapMsg.text.includes('選項 (B)【干擾陷阱】')) {
  console.log('✔ 4 個選項逐一剖析與陷阱拆解成功生成！');
} else {
  console.error('❌ 選項剖析未正常生成，內容:', trapMsg.text);
  process.exit(1);
}

// Test Scenario 4: Test Mnemonic Preset
console.log('\n【測試 4：點擊「本題秒記口訣」】');
aiTutor.handleMnemonicRequest();
const mnemMsg = aiTutor.messages[aiTutor.messages.length - 1];
if (mnemMsg.text.includes('口訣') && mnemMsg.text.includes('沸水')) {
  console.log('✔ 本題獨家秒記口訣成功生成！');
} else {
  console.error('❌ 口訣未正常生成，內容:', mnemMsg.text);
  process.exit(1);
}

// Test Scenario 5: Reactive Answer Feedback
console.log('\n【測試 5：學生作答即時診斷與反饋】');
// Answer correctly (Option 0)
examEngine.selectOption(0);
const correctReaction = aiTutor.messages[aiTutor.messages.length - 1];
if (correctReaction.text.includes('答對了！') && correctReaction.text.includes('(A)')) {
  console.log('✔ 正確答案即時喝采與正向反饋成功觸發！');
} else {
  console.error('❌ 正確答案反饋不正確:', correctReaction.text);
  process.exit(1);
}

// Answer incorrectly (Option 1)
examEngine.selectOption(1);
const wrongReaction = aiTutor.messages[aiTutor.messages.length - 1];
if (wrongReaction.text.includes('你選擇了 **(B)**') && wrongReaction.text.includes('正確答案是 **(A)**')) {
  console.log('✔ 錯誤干擾選項即時警示與陷阱指引成功觸發！');
} else {
  console.error('❌ 錯誤選項反饋不正確:', wrongReaction.text);
  process.exit(1);
}

// Test Scenario 6: Switch Question and auto-update
console.log('\n【測試 6：切換至第 2 題，Q比 自動更新講解】');
examEngine.currentIndex = 1;
examEngine.renderCurrentQuestion();
const q2Msg = aiTutor.messages[aiTutor.messages.length - 1];
if (q2Msg.text.includes('第 2 / 16 題') && q2Msg.text.includes('隔水加熱')) {
  console.log('✔ 切換題目後，Q比 自動同步更新第 2 題提示與深度詳解！');
} else {
  console.error('❌ 第 2 題自動更新未包含預期內容:', q2Msg.text);
  process.exit(1);
}

console.log('\n====================================================');
console.log('🎉 全部 6 項考場 Q比 免提問直出解析功能測試 100% 通過！');
console.log('====================================================');
