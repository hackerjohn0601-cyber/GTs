// Comprehensive validation script for GTs (Go to Study) All Grades Support
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('====================================================');
console.log('GTs (Go to Study) - 全年級教材、考卷與 AI 導師全面檢驗');
console.log('====================================================\n');

// Mock browser window environment
const sandbox = {
  window: {},
  document: {
    getElementById: () => null,
    body: { style: {} }
  },
  console: console
};
vm.createContext(sandbox);

// 1. Load curriculumData.js
const currCode = fs.readFileSync(path.join(__dirname, 'js/curriculumData.js'), 'utf8');
vm.runInContext(currCode, sandbox);
const currData = sandbox.window.CURRICULUM_DATA;

console.log('【1. 課綱年級與教材單元檢驗】');
console.log(`- 支援版本數: ${currData.editions.length} (${currData.editions.map(e => e.name).join(', ')})`);
console.log(`- 涵蓋年級數: ${currData.grades.length} (${currData.grades.map(g => g.name).join(', ')})`);
console.log(`- 收錄單元總數: ${currData.units.length} 單元`);

const gradeCounts = {};
currData.units.forEach(u => {
  gradeCounts[u.gradeId] = (gradeCounts[u.gradeId] || 0) + 1;
});
console.log('- 各年級單元分佈:');
Object.entries(gradeCounts).forEach(([grade, count]) => {
  const gName = currData.grades.find(g => g.id === grade)?.name || grade;
  console.log(`  * ${gName} [${grade}]: ${count} 個精選核心單元`);
});

// 2. Load examData.js
const examCode = fs.readFileSync(path.join(__dirname, 'js/examData.js'), 'utf8');
vm.runInContext(examCode, sandbox);
const examData = sandbox.window.EXAM_DATA;

console.log('\n【2. 專屬考卷庫與零干擾驗證】');
console.log(`- 收錄試卷總數: ${examData.papers.length} 份`);

const paperIds = new Set(examData.papers.map(p => p.id));

// Verify each paper has valid questions
let totalQuestions = 0;
let paperErrors = 0;
examData.papers.forEach(p => {
  if (!p.id || !p.title || !p.questions || p.questions.length === 0) {
    console.error(`  [ERROR] 考卷 ${p.id} 缺少必要欄位或無題目！`);
    paperErrors++;
  }
  totalQuestions += p.questions.length;
  p.questions.forEach((q, idx) => {
    if (q.answer < 0 || q.answer >= q.options.length) {
      console.error(`  [ERROR] 考卷 ${p.id} 第 ${idx + 1} 題答案索引越界: ${q.answer}`);
      paperErrors++;
    }
  });
});
console.log(`- 考題總題數: ${totalQuestions} 題`);
console.log(`- 試卷結構檢查: ${paperErrors === 0 ? '✔ 全部通過 (0 錯誤)' : `❌ 發現 ${paperErrors} 處錯誤`}`);

// Verify all quizPaperId in curriculum units point to existing papers
console.log('\n【3. 單元 ➔ 試卷關聯完整性檢查】');
let missingPaperRefs = 0;
currData.units.forEach(u => {
  if (u.quizPaperId && !paperIds.has(u.quizPaperId)) {
    console.error(`  [ERROR] 單元 [${u.unitCode} ${u.unitName}] 指向未定義之考卷 ID: ${u.quizPaperId}`);
    missingPaperRefs++;
  }
});
console.log(`- 單元考卷關聯檢查: ${missingPaperRefs === 0 ? '✔ 全部單元考卷皆精準對應！' : `❌ 發現 ${missingPaperRefs} 處缺失`}`);

// 3. Load materialsData.js
const matCode = fs.readFileSync(path.join(__dirname, 'js/materialsData.js'), 'utf8');
vm.runInContext(matCode, sandbox);
const materialsData = sandbox.window.MATERIALS_DATA;

console.log('\n【4. 深入學習教材庫檢驗】');
console.log(`- 收錄精讀教材總數: ${materialsData.length} 篇`);
materialsData.forEach(m => {
  console.log(`  * [${m.grade}] ${m.title} (關聯考卷: ${m.relatedQuizId})`);
  if (m.relatedQuizId && !paperIds.has(m.relatedQuizId)) {
    console.error(`    [ERROR] 教材關聯之考卷 ${m.relatedQuizId} 不存在！`);
  }
});

// 4. Test AI Tutor response logic across all grades
console.log('\n【5. AI 學習導師 (AURA) 全年級問答與跳轉按鈕檢驗】');
const aiCode = fs.readFileSync(path.join(__dirname, 'js/aiTutor.js'), 'utf8');
vm.runInContext(aiCode, sandbox);
const aiTutor = sandbox.window.aiTutor;

const testQueries = [
  { q: '國一 1-1 到 1-2 重點複習', expectedPaper: 'paper-g7-bio-ch1', grade: '國一' },
  { q: '考我光合作用', expectedPaper: 'paper-bio-photosynthesis', grade: '國一自然' },
  { q: '國二理化透鏡成像與熱量計算', expectedPaper: 'paper-g8-phy-optics', grade: '國二理化' },
  { q: '國二數學乘法公式與畢氏定理', expectedPaper: 'paper-g8-math-pythagoras', grade: '國二數學' },
  { q: '國三會考自然力學與牛頓定律', expectedPaper: 'paper-g9-cap-science', grade: '國三會考' },
  { q: '國三數學相似形與圓周角', expectedPaper: 'paper-g9-cap-math', grade: '國三會考數學' },
  { q: '高中學測自然分子生物中心法則', expectedPaper: 'paper-senior-physics-bio', grade: '高中學測自然' },
  { q: '高中數學多項式餘式定理與對數', expectedPaper: 'paper-senior-math-poly', grade: '高中學測數學' }
];

let aiErrors = 0;
testQueries.forEach(({ q, expectedPaper, grade }) => {
  const reply = aiTutor.generateResponse(q);
  const hasExpectedPaper = reply.includes(expectedPaper);
  if (hasExpectedPaper) {
    console.log(`  ✔ [${grade}] 問答: "${q}" ➔ 正確產生對應專屬考卷 [${expectedPaper}]！`);
  } else {
    console.error(`  ❌ [${grade}] 問答: "${q}" ➔ 未包含預期考卷 [${expectedPaper}]！回覆內容:`, reply);
    aiErrors++;
  }
});

console.log(`\nAI 導師問答檢驗結果: ${aiErrors === 0 ? '✔ 全部 8 項全年級測試 100% 通過！' : `❌ ${aiErrors} 項失敗`}`);

if (paperErrors === 0 && missingPaperRefs === 0 && aiErrors === 0) {
  console.log('\n🎉 GTs 全年級課綱、教材、專屬考卷與 AI 導師全面驗證成功！');
  process.exit(0);
} else {
  console.error('\n❌ 驗證未通過，請檢查上述錯誤。');
  process.exit(1);
}
