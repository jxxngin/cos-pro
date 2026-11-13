/* =========================================================
   학습지 공통 스크립트
   1) <pre class="code"> : 줄 번호, 문법 색, 빈칸({{1}}), 채운 정답(⟦값⟧)
   2) 쪽 아래 머리글/쪽 번호
   3) 화면 전용 넘침 검사: 쪽·반 쪽·코드가 넘치면 빨간 표시
      (검사 결과는 <body data-overflow="개수"> 로도 남긴다)
   ========================================================= */
(function () {
  "use strict";

  var KEYWORDS = new Set([
    "if", "elif", "else", "for", "while", "in", "and", "or", "not", "is",
    "def", "return", "break", "continue", "pass", "import", "from",
    "True", "False", "None"
  ]);
  var BUILTINS = new Set([
    "print", "input", "int", "float", "str", "list", "map", "len", "range",
    "min", "max", "sum", "abs", "round", "sorted"
  ]);

  var TOKEN = /(\{\{\d+(?::wide)?\}\})|(⟦[^⟧]*⟧)|(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g;
  var MARKER = /(\{\{\d+(?::wide)?\}\})|(⟦[^⟧]*⟧)/g;

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function circled(n) {
    return n >= 1 && n <= 20 ? String.fromCharCode(0x2460 + n - 1) : "(" + n + ")";
  }

  function blankHtml(marker) {
    var m = /\{\{(\d+)(:wide)?\}\}/.exec(marker);
    return '<span class="blank' + (m[2] ? " wide" : "") + '">' + circled(+m[1]) + "</span>";
  }

  // 문자열 안의 빈칸/정답 표시만 바꾼다 (문법 색은 칠하지 않음)
  function markersOnly(text) {
    var out = "", last = 0, m;
    MARKER.lastIndex = 0;
    while ((m = MARKER.exec(text))) {
      out += esc(text.slice(last, m.index));
      out += m[1] ? blankHtml(m[1]) : '<mark class="fill">' + esc(m[2].slice(1, -1)) + "</mark>";
      last = MARKER.lastIndex;
    }
    return out + esc(text.slice(last));
  }

  function highlight(line) {
    var out = "", last = 0, m;
    var re = new RegExp(TOKEN.source, "g");
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      var t = m[0];
      if (m[1]) {
        out += blankHtml(t);
      } else if (m[2]) {
        out += '<mark class="fill">' + highlight(t.slice(1, -1)) + "</mark>";
      } else if (m[3]) {
        out += '<span class="tok-com">' + esc(t) + "</span>";
      } else if (m[4]) {
        out += '<span class="tok-str">' + markersOnly(t) + "</span>";
      } else if (m[5]) {
        out += '<span class="tok-num">' + t + "</span>";
      } else {
        var rest = line.slice(re.lastIndex);
        var isCall = /^\s*\(/.test(rest);
        var afterDot = /\.\s*$/.test(line.slice(0, m.index));
        if (KEYWORDS.has(t)) out += '<span class="tok-kw">' + t + "</span>";
        else if (isCall && (BUILTINS.has(t) || afterDot)) out += '<span class="tok-fn">' + t + "</span>";
        else out += esc(t);
      }
      last = re.lastIndex;
    }
    return out + esc(line.slice(last));
  }

  function renderCode(pre) {
    var text = pre.textContent.replace(/^\r?\n/, "").replace(/\s+$/, "");
    pre.innerHTML = text.split(/\r?\n/).map(function (line) {
      return '<span class="line">' + (highlight(line) || " ") + "</span>";
    }).join("");
  }

  function renderFooters() {
    var title = document.body.getAttribute("data-footer") || "";
    var pages = document.querySelectorAll(".page");
    pages.forEach(function (page, i) {
      var foot = page.querySelector(".page-foot");
      if (!foot) {
        foot = document.createElement("footer");
        foot.className = "page-foot";
        page.appendChild(foot);
      }
      foot.innerHTML = "<span>" + esc(page.getAttribute("data-footer") || title) + "</span><span>" + (i + 1) + "</span>";
    });
  }

  function checkOverflow() {
    var count = 0;
    // over: 넘친 양(px). 0 이하면 넘치지 않음
    function mark(el, over) {
      var isOver = over > 1;
      el.classList.toggle(el.classList.contains("page") ? "is-overflow" : "is-overflow-el", isOver);
      if (isOver) { el.setAttribute("data-over-px", String(Math.round(over))); count++; }
      else el.removeAttribute("data-over-px");
    }
    // 1) 쪽: 본문 요소가 쪽의 본문 영역(아래 여백·머리글 위)을 벗어나면 넘침
    document.querySelectorAll(".page").forEach(function (page) {
      var box = page.getBoundingClientRect();
      var cs = getComputedStyle(page);
      var bottom = box.bottom - parseFloat(cs.paddingBottom);
      var over = page.scrollHeight - page.clientHeight;
      page.querySelectorAll("*").forEach(function (el) {
        if (el.closest(".page-foot")) return;
        var r = el.getBoundingClientRect();
        if (r.height > 0) over = Math.max(over, r.bottom - bottom);
      });
      mark(page, over);
    });
    // 2) 반 쪽 문제, 써 보기 칸: 안쪽 내용이 잘리면 넘침
    document.querySelectorAll(".half-pair > .problem, .practice").forEach(function (el) {
      mark(el, el.scrollHeight - el.clientHeight);
    });
    // 3) 코드: 가로·세로로 잘리면 넘침
    document.querySelectorAll("pre.code").forEach(function (pre) {
      mark(pre, Math.max(pre.scrollWidth - pre.clientWidth, pre.scrollHeight - pre.clientHeight));
    });
    document.body.setAttribute("data-overflow", String(count));
    if (count) console.warn("[sheet] 넘침 " + count + "곳");
  }

  function init() {
    document.querySelectorAll("pre.code").forEach(renderCode);
    renderFooters();
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(checkOverflow);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
