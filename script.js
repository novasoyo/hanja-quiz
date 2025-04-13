const hanjaList = [
    { hanja: '一', meaning: '하나', sound: '일' },
    { hanja: '二', meaning: '둘', sound: '이' },
    { hanja: '人', meaning: '사람', sound: '인' },
    { hanja: '刀', meaning: '칼', sound: '도' },
    { hanja: '又', meaning: '또', sound: '우' },
    { hanja: '十', meaning: '열', sound: '십' },
    { hanja: '力', meaning: '힘', sound: '력' },
    { hanja: '八', meaning: '여덟', sound: '팔' },
    { hanja: '口', meaning: '입', sound: '구' },
    { hanja: '生', meaning: '낳다', sound: '생' },
    { hanja: '女', meaning: '여자', sound: '녀' },
    { hanja: '土', meaning: '흙', sound: '토' },
    { hanja: '大', meaning: '크다', sound: '대' },
    { hanja: '子', meaning: '아들', sound: '자' },
    { hanja: '弓', meaning: '활', sound: '궁' },
    { hanja: '山', meaning: '산', sound: '산' },
    { hanja: '寸', meaning: '마디', sound: '촌' },
    { hanja: '木', meaning: '나무', sound: '목' },
    { hanja: '心', meaning: '마음', sound: '심' },
    { hanja: '日', meaning: '해, 날', sound: '일' },
    { hanja: '手', meaning: '손', sound: '수' },
    { hanja: '火', meaning: '불', sound: '화' },
    { hanja: '犬', meaning: '개', sound: '견' },
    { hanja: '月', meaning: '달', sound: '월' },
    { hanja: '方', meaning: '모', sound: '방' },
    { hanja: '水', meaning: '물', sound: '수' },
    { hanja: '鳥', meaning: '새', sound: '조' },
    { hanja: '目', meaning: '눈', sound: '목' },
    { hanja: '示', meaning: '보다', sound: '시' },
    { hanja: '田', meaning: '밭', sound: '전' },
    { hanja: '車', meaning: '수레', sound: '차, 거' },
    { hanja: '見', meaning: '보다', sound: '견' },
    { hanja: '足', meaning: '발', sound: '족' },
    { hanja: '貝', meaning: '조개', sound: '패' },
    { hanja: '言', meaning: '말씀', sound: '언' },
    { hanja: '門', meaning: '문', sound: '문' },
    { hanja: '金', meaning: '쇠', sound: '금' },
    { hanja: '雨', meaning: '비', sound: '우' },
    { hanja: '食', meaning: '음식', sound: '식' },
    { hanja: '馬', meaning: '말', sound: '마' },
    { hanja: '石', meaning: '돌', sound: '석' },
    { hanja: '行', meaning: '다니다', sound: '행' },
    { hanja: '穴', meaning: '구멍', sound: '혈' },
    { hanja: '立', meaning: '서다', sound: '립' },
    { hanja: '禾', meaning: '벼', sound: '화' },
    { hanja: '衣', meaning: '옷', sound: '의' },
    { hanja: '竹', meaning: '대나무', sound: '죽' },
    { hanja: '米', meaning: '쌀', sound: '미' },
    { hanja: '肉', meaning: '고기', sound: '육' },
    { hanja: '耳', meaning: '귀', sound: '이' }
  ];

  let current = 0;
  let wrongAnswers = [];
  let retryMode = false;
  let quizOrder = [];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function hideAll() {
    document.querySelectorAll('.card, .quiz').forEach(el => el.classList.remove('visible'));
  }

  function startFlashcards() {
    current = 0;
    hideAll();
    document.getElementById('flashcard').classList.add('visible');
    showFlashcard();
  }

  function showFlashcard() {
    const card = hanjaList[current];
    document.getElementById('cardHanja').textContent = card.hanja;
    document.getElementById('cardMeaning').textContent = card.meaning;
    document.getElementById('cardSound').textContent = card.sound;
  }

  function nextFlashcard() {
    current++;
    if (current < hanjaList.length) {
      showFlashcard();
    } else {
      alert('학습 완료!');
      hideAll();
    }
  }

  function startQuizMultiple() {
    current = 0;
    wrongAnswers = [];
    retryMode = false;
    quizOrder = shuffle([...hanjaList]);
    hideAll();
    document.getElementById('multipleFeedback').textContent = '';
    document.getElementById('quizMultiple').classList.add('visible');
    showMultipleQuiz();
  }

  function showMultipleQuiz() {
    const list = retryMode ? wrongAnswers : quizOrder;
    const q = list[current];
    document.getElementById('quizHanja').textContent = `문제: ${q.hanja}`;
    document.getElementById('multipleFeedback').textContent = '';

    let options = shuffle([...hanjaList]).slice(0, 4);
    if (!options.find(opt => opt.hanja === q.hanja)) {
      options[Math.floor(Math.random() * 4)] = q;
    }
    options = shuffle(options);

    const optionHtml = options.map(opt => `
      <button class="option" onclick="checkMultipleAnswer('${opt.meaning} ${opt.sound}', '${q.meaning} ${q.sound}', ${hanjaList.indexOf(q)})">
        ${opt.meaning} - ${opt.sound}
      </button>
    `).join('');
    document.getElementById('quizOptions').innerHTML = optionHtml;
  }

  window.checkMultipleAnswer = function(answer, correct, qIndex) {
    const feedback = document.getElementById('multipleFeedback');
    if (answer === correct) {
      feedback.textContent = '✅ 정답입니다!';
      feedback.style.color = 'green';
    } else {
      feedback.textContent = `❌ 틀렸어요! 정답은 ${correct}입니다.`;
      feedback.style.color = 'red';
      if (!retryMode) wrongAnswers.push(hanjaList[qIndex]);
    }
    setTimeout(() => {
      current++;
      const list = retryMode ? wrongAnswers : quizOrder;
      if (current < list.length) {
        showMultipleQuiz();
      } else if (!retryMode && wrongAnswers.length > 0) {
        alert('1차 퀴즈 완료! 틀린 문제만 다시 풀어봅시다.');
        current = 0;
        retryMode = true;
        showMultipleQuiz();
      } else {
        alert('퀴즈 완료! 수고했어요!');
        hideAll();
      }
    }, 1500);
  }

  function startQuizWritten() {
    current = 0;
    quizOrder = shuffle([...hanjaList]);
    hideAll();
    document.getElementById('quizWritten').classList.add('visible');
    showWrittenQuiz();
  }

  function showWrittenQuiz() {
    const q = quizOrder[current];
    document.getElementById('writtenHanja').textContent = `문제: ${q.hanja}`;
    document.getElementById('writtenAnswer').value = '';
    document.getElementById('writtenFeedback').textContent = '';
  }

  function submitWrittenAnswer() {
    const q = quizOrder[current];
    const userInput = document.getElementById('writtenAnswer').value.trim();
    const correct = `${q.meaning} ${q.sound}`;
    if (userInput === correct) {
      document.getElementById('writtenFeedback').textContent = '✅ 정답입니다!';
    } else {
      document.getElementById('writtenFeedback').textContent = `❌ 틀렸어요! 정답은 ${correct}입니다.`;
    }
    current++;
    setTimeout(() => {
      if (current < quizOrder.length) {
        showWrittenQuiz();
      } else {
        alert('주관식 퀴즈 완료!');
        hideAll();
      }
    }, 1500);
  }

  document.getElementById('btnFlashcards').addEventListener('click', startFlashcards);
  document.getElementById('btnQuizMultiple').addEventListener('click', startQuizMultiple);
  document.getElementById('btnQuizWritten').addEventListener('click', startQuizWritten);
  document.getElementById('btnNextFlashcard').addEventListener('click', nextFlashcard);
  document.getElementById('btnSubmitWritten').addEventListener('click', submitWrittenAnswer);
