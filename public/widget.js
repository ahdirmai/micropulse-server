(function() {
  'use strict';

  const currentScript = document.currentScript;
  const surveyId = currentScript?.getAttribute('data-survey-id');
  const baseUrl = currentScript?.src.split('/widget.js')[0] || '';

  if (!surveyId) {
    console.warn('MicroPulse: data-survey-id attribute is required');
    return;
  }

  const storageKey = `micropulse_${surveyId}`;

  if (sessionStorage.getItem(storageKey)) {
    return;
  }

  function loadWidget() {
    fetch(`${baseUrl}/api/widget/${surveyId}`)
      .then(res => {
        if (!res.ok) throw new Error('Survey not found');
        return res.json();
      })
      .then(data => {
        createWidget(data);
      })
      .catch(() => {
        // Silent fail
      });
  }

  function createWidget(surveyData) {
    const host = document.createElement('div');
    host.id = 'micropulse-widget';
    host.style.cssText = 'position: fixed; z-index: 999999;';

    const shadow = host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      .widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .fab {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF7A59 0%, #FF5C38 100%);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(255, 122, 89, 0.4);
        transition: transform 0.2s, opacity 0.2s;
        opacity: 0;
        animation: fadeIn 0.2s forwards;
      }
      @keyframes fadeIn {
        to { opacity: 1; }
      }
      .fab:hover {
        transform: scale(1.1);
      }
      .fab svg {
        width: 24px;
        height: 24px;
        fill: white;
      }
      .card {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 300px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        padding: 20px;
        transform: scale(0);
        transform-origin: bottom right;
        transition: transform 0.2s;
      }
      .card.open {
        transform: scale(1);
      }
      .question {
        font-size: 14px;
        font-weight: 500;
        color: #111827;
        margin-bottom: 16px;
        line-height: 1.5;
      }
      .rating {
        display: flex;
        gap: 8px;
        justify-content: center;
      }
      .star {
        width: 32px;
        height: 32px;
        cursor: pointer;
        fill: #D1D5DB;
        transition: fill 0.1s;
      }
      .star:hover, .star.active {
        fill: #FBBF24;
      }
      .nps {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .nps-btn {
        width: 28px;
        height: 28px;
        border: 1px solid #D1D5DB;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.1s;
      }
      .nps-btn:hover, .nps-btn.active {
        background: #FF7A59;
        color: white;
        border-color: #FF7A59;
      }
      .choice {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .choice label {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #D1D5DB;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        transition: all 0.1s;
      }
      .choice label:hover {
        border-color: #FF7A59;
        background: #FFF4F0;
      }
      .choice input {
        margin-right: 8px;
      }
      .text-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #D1D5DB;
        border-radius: 6px;
        font-size: 13px;
        resize: none;
        font-family: inherit;
      }
      .text-input:focus {
        outline: none;
        border-color: #FF7A59;
        box-shadow: 0 0 0 3px rgba(255, 122, 89, 0.1);
      }
      .char-count {
        font-size: 11px;
        color: #6B7280;
        text-align: right;
        margin-top: 4px;
      }
      .submit-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #FF7A59 0%, #FF5C38 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        margin-top: 12px;
        transition: all 0.2s;
        box-shadow: 0 2px 8px rgba(255, 122, 89, 0.3);
      }
      .submit-btn:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 122, 89, 0.4);
      }
      .submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .thank-you {
        text-align: center;
        color: #059669;
        font-weight: 500;
      }
      .error {
        text-align: center;
        color: #DC2626;
        font-weight: 500;
        font-size: 13px;
        line-height: 1.5;
      }
      .hidden {
        display: none;
      }
    `;
    shadow.appendChild(style);

    const container = document.createElement('div');
    container.className = 'widget-container';

    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';

    const card = document.createElement('div');
    card.className = 'card';

    const question = document.createElement('div');
    question.className = 'question';
    question.textContent = surveyData.question;
    card.appendChild(question);

    const inputArea = document.createElement('div');
    let selectedValue = null;

    if (surveyData.type === 'rating') {
      inputArea.className = 'rating';
      for (let i = 1; i <= 5; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        star.setAttribute('viewBox', '0 0 24 24');
        star.setAttribute('class', 'star');
        star.innerHTML = '<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>';
        star.onclick = () => {
          selectedValue = i.toString();
          inputArea.querySelectorAll('.star').forEach((s, idx) => {
            s.classList.toggle('active', idx < i);
          });
        };
        inputArea.appendChild(star);
      }
    } else if (surveyData.type === 'nps') {
      inputArea.className = 'nps';
      for (let i = 0; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = 'nps-btn';
        btn.textContent = i;
        btn.onclick = () => {
          selectedValue = i.toString();
          inputArea.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        };
        inputArea.appendChild(btn);
      }
    } else if (surveyData.type === 'choice') {
      inputArea.className = 'choice';
      surveyData.options.forEach((opt, idx) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'choice';
        input.value = opt;
        input.onchange = () => selectedValue = opt;
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt));
        inputArea.appendChild(label);
      });
    } else if (surveyData.type === 'text') {
      const textarea = document.createElement('textarea');
      textarea.className = 'text-input';
      textarea.rows = 3;
      textarea.maxLength = 500;
      textarea.placeholder = 'Type your answer...';
      textarea.oninput = (e) => {
        selectedValue = e.target.value;
        counter.textContent = `${e.target.value.length}/500`;
      };
      inputArea.appendChild(textarea);
      const counter = document.createElement('div');
      counter.className = 'char-count';
      counter.textContent = '0/500';
      inputArea.appendChild(counter);
    }

    card.appendChild(inputArea);

    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Submit';
    submitBtn.onclick = handleSubmit;
    card.appendChild(submitBtn);

    container.appendChild(fab);
    container.appendChild(card);
    shadow.appendChild(container);
    document.body.appendChild(host);

    fab.onclick = () => {
      card.classList.toggle('open');
      fab.classList.toggle('hidden');
    };

    function handleSubmit() {
      if (!selectedValue) return;

      submitBtn.disabled = true;

      const respondentId = getOrCreateRespondentId();

      fetch(`${baseUrl}/api/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          survey_id: surveyId,
          answer: selectedValue,
          respondent_id: respondentId,
          page_url: window.location.href
        })
      })
      .then(res => {
        if (res.status === 403) {
          return res.json().then(data => {
            throw new Error(data.error || 'Limit reached');
          });
        }
        if (!res.ok) throw new Error('Failed to submit');
        return res.json();
      })
      .then(() => {
        card.innerHTML = '<div class="thank-you">Thank you for your feedback!</div>';
        setTimeout(() => {
          card.classList.remove('open');
          setTimeout(() => {
            fab.classList.remove('hidden');
            sessionStorage.setItem(storageKey, '1');
          }, 200);
        }, 3000);
      })
      .catch(err => {
        submitBtn.disabled = false;
        if (err.message.includes('limit')) {
          card.innerHTML = '<div class="error">Response limit reached. Please try again next month.</div>';
          setTimeout(() => {
            card.classList.remove('open');
            setTimeout(() => fab.classList.remove('hidden'), 200);
          }, 5000);
        }
      });
    }

    function getOrCreateRespondentId() {
      let id = localStorage.getItem('micropulse_rid');
      if (!id) {
        id = 'r_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
        localStorage.setItem('micropulse_rid', id);
      }
      return id;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWidget);
  } else {
    loadWidget();
  }
})();
