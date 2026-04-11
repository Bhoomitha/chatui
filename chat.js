/**
 * Healing Chat UI — chat.js
 * Author: Student
 * Description: All JavaScript and jQuery functionality for the Chat UI assignment.
 */

$(document).ready(function () {

  /* ============================================================
     MOCK AI RESPONSES
  ============================================================ */

  const AI_RESPONSES = [
    "That's a great question! Let me break it down for you.\n\nThis is a complex topic, but the core idea is straightforward once you understand the fundamentals. I'd recommend starting with the basics and building up from there.",
    "Here's what I found for you:\n\n1. **First**, understand the core concept\n2. **Second**, practice with small examples\n3. **Third**, build progressively larger projects\n\nThis approach works well for most learners.",
    "Absolutely! Here's a concise explanation:\n\nThe key insight here is that everything connects back to first principles. Once you internalize those, the rest follows naturally.",
    "Great point! There are a few ways to think about this:\n\n- **Approach A** focuses on simplicity and readability\n- **Approach B** optimizes for performance\n- **Approach C** balances both\n\nFor most use-cases, I'd recommend starting with Approach A.",
    "I can help with that! Here's a quick overview:\n\nThe main thing to keep in mind is consistency. Whether you're writing code, designing systems, or managing projects — consistent patterns reduce cognitive load and errors.",
    "That's an interesting problem to solve! Here's my take:\n\nStart by defining what success looks like. Once you have clear goals, the path forward becomes much easier to map out.",
    "Sure! Let me walk you through it step by step.\n\nFirst, gather all the relevant context. Second, identify constraints. Third, generate options and evaluate trade-offs. Finally, commit to the best solution and iterate.",
    "Excellent question! The answer depends on your specific context, but here are some general principles:\n\n• Keep things simple until complexity is necessary\n• Measure before optimizing\n• Prioritize readability for future maintainers\n• Document your decisions and rationale",
    "Here's a practical example to illustrate the concept:\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"World\"))  # Output: Hello, World!\n```\n\nThis pattern is extensible — you can adapt it for any similar problem.",
    "That's a nuanced topic with several perspectives worth considering. The consensus leans toward a balanced approach that accounts for both short-term needs and long-term sustainability.",
  ];

  /* ============================================================
     STATE & CACHED DOM REFERENCES
  ============================================================ */

  let isFirstMessage   = true;
  let isDarkMode       = false;
  let typewriterTimeout = null;

  const $messagesContainer = $('#messagesContainer');
  const $messagesWrapper   = $('#messagesWrapper');
  const $messageInput      = $('#messageInput');
  const $sendBtn           = $('#sendBtn');
  const $typingIndicator   = $('#typingIndicator');
  const $welcomeScreen     = $('#welcomeScreen');
  const $sidebar           = $('#sidebar');
  const $sidebarOverlay    = $('#sidebarOverlay');
  const $hamburgerBtn      = $('#hamburgerBtn');
  const $sidebarClose      = $('#sidebarClose');
  const $themeToggle       = $('#themeToggle');
  const $themeIcon         = $('#themeIcon');
  const $themeLabel        = $('#themeLabel');
  const $newChatBtn        = $('#newChatBtn');
  const $newChatMobile     = $('#newChatMobile');
  const $historyList       = $('#historyList');

  /* ============================================================
     UTILITY FUNCTIONS
  ============================================================ */

  function getCurrentTime() {
    const now  = new Date();
    let hours  = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours      = hours % 12 || 12;
    return `${hours}:${mins} ${ampm}`;
  }

  // Bonus: simple markdown formatter (bold, italic, inline code, code blocks)
  function formatMessage(text) {
    let out = text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    out = out.replace(/```([\s\S]*?)```/g, (_, c) => `<pre><code>${c.trim()}</code></pre>`);
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
    out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/\n/g, '<br>');
    return out;
  }

  /* ============================================================
     ADD MESSAGE
  ============================================================ */

  function addMessage(text, sender, animate = false) {
    const time        = getCurrentTime();
    const isUser      = sender === 'user';
    const msgClass    = isUser ? 'user-message' : 'ai-message';
    const avatarClass = isUser ? 'user-avatar-msg' : 'ai-avatar';
    const avatarHTML  = isUser ? 'S' : '<i class="fa-solid fa-atom"></i>';
    const senderName  = isUser ? 'You' : 'Healing';
    const formatted   = formatMessage(text);

    const $message = $(`
      <div class="message ${msgClass}" role="article" aria-label="${senderName} message">
        <div class="message-avatar ${avatarClass}" aria-hidden="true">${avatarHTML}</div>
        <div class="message-body">
          <div class="message-header">
            <span class="message-name">${senderName}</span>
            <span class="message-time" aria-label="Sent at ${time}">${time}</span>
          </div>
          <div class="message-bubble">${animate ? '' : formatted}</div>
          ${!isUser ? `
          <div class="action-bar" role="toolbar" aria-label="Message actions">
            <button class="btn-action copy-btn" title="Copy" aria-label="Copy message">
              <i class="fa-regular fa-copy"></i> Copy
            </button>
          </div>` : ''}
        </div>
      </div>
    `);

    $messagesContainer.append($message);
    scrollToBottom();

    if (animate && !isUser) {
      typewriterEffect($message.find('.message-bubble'), text);
    }
    return $message;
  }

  /* ============================================================
     BONUS: TYPEWRITER EFFECT
  ============================================================ */

  function typewriterEffect($bubble, text) {
    let i = 0;
    const speed = 18;
    function typeChar() {
      if (i <= text.length) {
        $bubble.html(
          formatMessage(text.substring(0, i)) +
          '<span aria-hidden="true" style="display:inline-block;width:2px;height:1em;background:currentColor;animation:cursorBlink 0.7s step-end infinite;vertical-align:text-bottom;margin-left:1px;border-radius:1px;"></span>'
        );
        scrollToBottom();
        i++;
        typewriterTimeout = setTimeout(typeChar, speed);
      } else {
        $bubble.html(formatMessage(text));
        scrollToBottom();
      }
    }
    typeChar();
  }

  /* ============================================================
     SCROLL TO BOTTOM
  ============================================================ */

  function scrollToBottom() {
    const el = $messagesWrapper[0];
    el.scrollTop = el.scrollHeight;
  }

  /* ============================================================
     TYPING INDICATOR
  ============================================================ */

  function showTypingIndicator() {
    $typingIndicator.addClass('show').attr('aria-hidden', 'false');
    scrollToBottom();
  }
  function hideTypingIndicator() {
    $typingIndicator.removeClass('show').attr('aria-hidden', 'true');
  }

  /* ============================================================
     SEND MESSAGE
  ============================================================ */

  function sendMessage() {
    const rawText = $messageInput.val().trim();
    if (!rawText) return;

    // Hide welcome screen on first message
    if (isFirstMessage) {
      $welcomeScreen.fadeOut(300, function () { $(this).remove(); });
      isFirstMessage = false;
    }

    addMessage(rawText, 'user');
    $messageInput.val('').trigger('input');
    $sendBtn.prop('disabled', true);
    addToHistory(rawText);

    const delay = Math.floor(Math.random() * 1200) + 1000;
    showTypingIndicator();

    setTimeout(function () {
      hideTypingIndicator();
      const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      addMessage(response, 'ai', true);
    }, delay);
  }

  /* ============================================================
     SIDEBAR HISTORY
  ============================================================ */

  function addToHistory(text) {
    const label = text.length > 36 ? text.substring(0, 34) + '…' : text;
    $historyList.find('.history-item').removeClass('active');
    const $item = $(`
      <li class="history-item active" role="listitem" tabindex="0">
        <i class="fa-regular fa-comment"></i>
        <span>${$('<span>').text(label).html()}</span>
      </li>
    `);
    $historyList.prepend($item);
    const $all = $historyList.find('.history-item');
    if ($all.length > 10) $all.last().remove();
  }

  /* ============================================================
     INPUT HANDLING
  ============================================================ */

  function autoResize() {
    const el = $messageInput[0];
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }

  $messageInput.on('input', function () {
    $sendBtn.prop('disabled', !$(this).val().trim());
    autoResize();
  });

  $messageInput.on('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!$sendBtn.prop('disabled')) sendMessage();
    }
  });

  $sendBtn.on('click', sendMessage);

  /* ============================================================
     SUGGESTION CARDS
  ============================================================ */

  $(document).on('click', '.suggestion-card', function () {
    $messageInput.val($(this).data('prompt')).trigger('input');
    setTimeout(sendMessage, 120);
  });

  /* ============================================================
     SIDEBAR TOGGLE (Mobile)
  ============================================================ */

  function openSidebar() {
    $sidebar.addClass('open');
    $sidebarOverlay.addClass('active');
    $hamburgerBtn.attr('aria-expanded', 'true');
    $('body').css('overflow', 'hidden');
  }
  function closeSidebar() {
    $sidebar.removeClass('open');
    $sidebarOverlay.removeClass('active');
    $hamburgerBtn.attr('aria-expanded', 'false');
    $('body').css('overflow', '');
  }

  $hamburgerBtn.on('click', openSidebar);
  $sidebarClose.on('click', closeSidebar);
  $sidebarOverlay.on('click', closeSidebar);
  $(document).on('keydown', function (e) { if (e.key === 'Escape') closeSidebar(); });

  /* ============================================================
     NEW CHAT (Reset)
  ============================================================ */

  function resetChat() {
    if (typewriterTimeout) { clearTimeout(typewriterTimeout); typewriterTimeout = null; }
    $messagesContainer.children().not('#welcomeScreen').remove();

    if ($('#welcomeScreen').length === 0) {
      const $ws = $(`
        <div class="welcome-screen" id="welcomeScreen" aria-label="Welcome screen">
          <div class="welcome-inner">
            <div class="welcome-icon" aria-hidden="true"><i class="fa-solid fa-atom"></i></div>
            <h1 class="welcome-title">Hello, I'm Healing</h1>
            <p class="welcome-subtitle">Your AI-powered thinking partner. Ask me anything.</p>
            <div class="suggestion-grid" role="list" aria-label="Suggested prompts">
              <button class="suggestion-card" role="listitem" data-prompt="Explain quantum computing in simple terms">
                <div class="card-icon"><i class="fa-solid fa-atom"></i></div>
                <div class="card-body-text"><strong>Explain quantum computing</strong><span>Make it simple for a beginner</span></div>
              </button>
              <button class="suggestion-card" role="listitem" data-prompt="Write a Python function to sort a list of dictionaries by a specific key">
                <div class="card-icon"><i class="fa-solid fa-code"></i></div>
                <div class="card-body-text"><strong>Write Python code</strong><span>Sort a list of dictionaries</span></div>
              </button>
              <button class="suggestion-card" role="listitem" data-prompt="Give me 5 tips to improve my productivity while working from home">
                <div class="card-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <div class="card-body-text"><strong>Productivity tips</strong><span>Working from home effectively</span></div>
              </button>
              <button class="suggestion-card" role="listitem" data-prompt="Summarize the key differences between REST and GraphQL APIs">
                <div class="card-icon"><i class="fa-solid fa-network-wired"></i></div>
                <div class="card-body-text"><strong>Compare REST vs GraphQL</strong><span>Key differences summarized</span></div>
              </button>
            </div>
          </div>
        </div>
      `);
      $messagesContainer.prepend($ws);
    } else {
      $welcomeScreen.show();
    }

    hideTypingIndicator();
    isFirstMessage = true;
    $messageInput.val('').trigger('input');
    closeSidebar();
    $historyList.find('.history-item').removeClass('active');
  }

  $newChatBtn.on('click', resetChat);
  $newChatMobile.on('click', resetChat);

  /* ============================================================
     SIDEBAR HISTORY ITEM CLICK
  ============================================================ */

  $(document).on('click keydown', '.history-item', function (e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    $('.history-item').removeClass('active');
    $(this).addClass('active');
    closeSidebar();
  });

  /* ============================================================
     BONUS: DARK MODE TOGGLE
  ============================================================ */

  $themeToggle.on('click', function () {
    isDarkMode = !isDarkMode;
    $('body').addClass('theme-transition');
    if (isDarkMode) {
      $('html').attr('data-theme', 'dark');
      $themeIcon.removeClass('fa-moon').addClass('fa-sun');
      $themeLabel.text('Light Mode');
    } else {
      $('html').attr('data-theme', 'light');
      $themeIcon.removeClass('fa-sun').addClass('fa-moon');
      $themeLabel.text('Dark Mode');
    }
    setTimeout(() => $('body').removeClass('theme-transition'), 500);
  });

  /* ============================================================
     BONUS: COPY MESSAGE
  ============================================================ */

  $(document).on('click', '.copy-btn', function () {
    const $btn = $(this);
    const text = $btn.closest('.message-body').find('.message-bubble').text();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        $btn.html('<i class="fa-solid fa-check"></i> Copied!');
        setTimeout(() => $btn.html('<i class="fa-regular fa-copy"></i> Copy'), 2000);
      });
    } else {
      const $t = $('<textarea>').val(text).appendTo('body').select();
      document.execCommand('copy');
      $t.remove();
      $btn.html('<i class="fa-solid fa-check"></i> Copied!');
      setTimeout(() => $btn.html('<i class="fa-regular fa-copy"></i> Copy'), 2000);
    }
  });

  /* ============================================================
     BONUS: EXPORT CHAT (Ctrl+Shift+E)
  ============================================================ */

  $(document).on('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      const lines = ['Healing Chat Export', 'Exported: ' + new Date().toLocaleString(), '='.repeat(40), ''];
      $('.message').each(function () {
        const name    = $(this).find('.message-name').text();
        const time    = $(this).find('.message-time').text();
        const content = $(this).find('.message-bubble').text().trim();
        lines.push(`[${time}] ${name}:`, content, '');
      });
      if (lines.length <= 4) { alert('No messages to export yet!'); return; }
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url  = URL.createObjectURL(blob);
      const $a   = $('<a>').attr({ href: url, download: 'healing-chat-' + Date.now() + '.txt' }).appendTo('body');
      $a[0].click(); $a.remove(); URL.revokeObjectURL(url);
    }
  });

  /* ============================================================
     BONUS: ATTACH FILE
  ============================================================ */

  $('#attachBtn').on('click', function () {
    const $fi = $('<input type="file" accept="image/*,.pdf,.txt,.doc,.docx" style="display:none">').appendTo('body');
    $fi.trigger('click').on('change', function () {
      if (this.files[0]) {
        const cur = $messageInput.val();
        $messageInput.val((cur ? cur + '\n' : '') + '[Attached: ' + this.files[0].name + ']').trigger('input');
      }
      $fi.remove();
    });
  });

  /* ============================================================
     INIT
  ============================================================ */

  if (window.innerWidth >= 992) $messageInput.focus();
  autoResize();
  console.log('%cHealing Chat UI ready! 🚀', 'color:#6C63FF;font-weight:bold;font-size:14px;');
  console.log('Tip: Ctrl+Shift+E to export chat as a .txt file.');

});