const texts = {
      en: [
        "The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.The quick brown fox jumps over the lazy dog.",
        "Typing speed improves with practice.Typing speed improves with practice.Typing speed improves with practice.Typing speed improves with practice.Typing speed improves with practice.",
        
        
        
        "Practice daily to become a faster typist.Practice daily to become a faster typist.Practice daily to become a faster typist.Practice daily to become a faster typist.Practice daily to become a faster typist.",
        
        "Consistent practice enhances typing skills.Consistent practice enhances typing skills.Consistent practice enhances typing skills.Consistent practice enhances typing skills.Consistent practice enhances typing skills."
      ],
      hi: [
        "तेज़ टाइपिंग अभ्यास से बेहतर होती है।",
        "प्रतिदिन अभ्यास से टाइपिंग गति बढ़ती है।",
        "सटीक टाइपिंग ध्यान और अभ्यास से आती है।"
      ]
    };

    let selectedText = "";
    let startTime, timerInterval;
    let totalTyped = 0, correctTyped = 0;
    let testDuration = 60;

    function startTest() {
      const lang = document.getElementById('language').value;
      testDuration = parseInt(document.getElementById('duration').value);
      selectedText = texts[lang][Math.floor(Math.random() * texts[lang].length)];

      document.getElementById('text-display').innerText = selectedText;
      document.getElementById('input').value = "";
      document.getElementById('input').disabled = false;
      document.getElementById('input').focus();
      document.getElementById('summary').style.display = "none";

      totalTyped = 0;
      correctTyped = 0;
      startTime = new Date();

      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
      let elapsed = Math.floor((new Date() - startTime) / 1000);
      let remaining = testDuration - elapsed;
      let progress = (remaining / testDuration) * 100;

      document.getElementById('timer').innerText = `Time: ${remaining}s`;
      document.getElementById('progress-bar').style.width = `${progress}%`;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        document.getElementById('input').disabled = true;
        showSummary();
      }
    }

    function checkInput() {
      const input = document.getElementById('input').value;
      const display = document.getElementById('text-display');
      let html = '';
      correctTyped = 0;

      for (let i = 0; i < selectedText.length; i++) {
        if (i < input.length) {
          if (input[i] === selectedText[i]) {
            html += `<span class="correct">${selectedText[i]}</span>`;
            correctTyped++;
          } else {
            html += `<span class="incorrect">${selectedText[i]}</span>`;
          }
        } else {
          html += selectedText[i];
        }
      }

      display.innerHTML = html;
      totalTyped = input.length;

      updateStats();
    }

    function updateStats() {
      let elapsedMinutes = (new Date() - startTime) / 60000;
      let wpm = Math.round(correctTyped / 5 / elapsedMinutes);
      let accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;

      document.getElementById('char-count').innerText = `Characters Typed: ${totalTyped}`;
      document.getElementById('speed').innerText = `Speed: ${wpm} WPM`;
      document.getElementById('accuracy').innerText = `Accuracy: ${accuracy}%`;
    }

    function restartTest() {
      clearInterval(timerInterval);
      document.getElementById('input').value = "";
      document.getElementById('input').disabled = true;
      document.getElementById('text-display').innerText = "";
      document.getElementById('timer').innerText = "Time: 0s";
      document.getElementById('char-count').innerText = "Characters Typed: 0";
      document.getElementById('speed').innerText = "Speed: 0 WPM";
      document.getElementById('accuracy').innerText = "Accuracy: 0%";
      document.getElementById('progress-bar').style.width = "100%";
      document.getElementById('summary').style.display = "none";
    }

    function showSummary() {
      const summaryBox = document.getElementById('summary');
      let elapsedMinutes = (new Date() - startTime) / 60000;
      let wpm = Math.round(correctTyped / 5 / elapsedMinutes);
      let accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;

      summaryBox.innerHTML = `
        <h3>Test Completed</h3>
        <p>Words per Minute (WPM): <strong>${wpm}</strong></p>
        <p>Accuracy: <strong>${accuracy}%</strong></p>
        <p>Total Characters Typed: <strong>${totalTyped}</strong></p>
      `;
      summaryBox.style.display = "block";
    }

    function toggleTheme() {
      document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? '' : 'dark';
    }