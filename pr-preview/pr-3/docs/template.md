# 템플릿 사용법

학습지 HTML을 쓸 때 쓰는 구조와 표시법이다. 견본은 [grade3/sample.html](../grade3/sample.html).
내용 규칙은 [structure.md](structure.md) 3절과 [rules.md](rules.md)를 따른다.

## 1. 파일 기본 틀

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>2장 비교와 조건 · COS Pro 3급</title>
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/print.css">
  <script src="../assets/js/sheet.js" defer></script>
</head>
<body data-footer="COS Pro 3급 · 2장 비교와 조건">
  <section class="page"> … </section>   <!-- 쪽 하나 = A4 한 장 -->
</body>
</html>
```

- 쪽 아래 머리글과 쪽 번호는 `sheet.js`가 `data-footer`로 붙인다.
- 쪽 안의 요소는 `section.page`에 **바로** 넣는다(감싸는 `div` 없이). 그래야 `fill-rest`가 남는 공간을 채울 수 있다.
- 장의 첫 쪽은 맨 위에 `header.chapter-band`(장 번호 `div.ch-no`, `h1`, 한 줄 설명 `p`)를 넣는다.

## 2. 문제 머리말 · 원문

```html
<div class="prob-head">
  <h2>두 수 중 작은 수 · A</h2>
  <span class="src">1세트-03</span>
  <span class="badge type-write">함수 작성</span>   <!-- 빈칸 문제는 type-blank -->
  <span class="tag">min</span>
</div>
<p class="cond">내장 함수 min, max를 사용해 푼다.</p>   <!-- A / B 문제만 -->

<div class="orig">
  <div class="sec"><div class="lbl">문제 설명</div><div><p>원문 그대로</p></div></div>
  <div class="sec"><div class="lbl">입력 설명</div><div><p>…</p><ul><li>…</li></ul></div></div>
  <div class="sec"><div class="lbl">출력 설명</div><div><p>…</p></div></div>
  <div class="sec"><div class="lbl">예제</div><div>
    <table class="ex"><tr><th>n1</th><th>n2</th><th>result</th></tr><tr><td>27</td><td>64</td><td>27</td></tr></table>
  </div></div>
  <div class="sec"><div class="lbl"></div><div class="io-pair">
    <div><span class="lbl">입력</span><pre>27
64</pre></div>
    <div><span class="lbl">출력</span><pre>27</pre></div>
  </div></div>
  <div class="sec"><div class="lbl">예제 설명</div><div><p>…</p></div></div>
</div>
```

- 원문은 [sources/grade3-original.md](sources/grade3-original.md)에서 **그대로** 옮긴다. 원문에 없는 섹션은 만들지 않고, 원문 순서를 따른다.
- 원문의 줄바꿈은 `<br>` 또는 `<p>`로, `- ` 목록은 `<ul>`로 옮긴다. `<`, `>`는 `&lt;`, `&gt;`로 쓴다.
- 문제가 다음 쪽으로 이어지면 그 쪽 맨 위에 머리말만 다시 넣고, 배지 대신 `<span class="cont">(이어서)</span>`를 쓴다.

## 3. 단계

```html
<p class="steps-title">단계별로 풀기</p>
<div class="step">
  <p class="q"><span class="n">1.</span>입력된 숫자 두 개를 <code>n1</code>, <code>n2</code>에 대입한다.<span class="hint-tag">힌트</span></p>
  <div class="write-lines" style="--lines: 2"></div>
</div>
<div class="step fill-rest">
  <p class="q"><span class="n">5.</span>1~3을 모아 완성 코드를 작성한다.</p>
  <div class="write-lines" style="--lines: 3"></div>
</div>
```

| 요소 | 쓰는 법 |
| --- | --- |
| `p.steps-title` | "단계별로 풀기" 머리글. B 문제처럼 원문이 없는 문제는 생략해도 된다 |
| `div.step` | 단계 하나. 안에는 `p.q`(질문 한 줄)와 쓰기 칸만 둔다 |
| `span.n` | 단계 번호 `1.` |
| `span.hint-tag` | 장 끝 힌트가 있는 단계에 붙인다 |
| `div.write-lines` | 쓰기 줄. `--lines`는 줄 수(줄 간격 8mm, 기본 1줄) |
| `div.step.fill-rest` | 쪽의 남는 공간을 모두 쓰기 줄로 채운다. 이때 `--lines`는 최소 줄 수 |

- 빈칸 문제의 마지막 단계는 쓰기 칸 대신 시험 코드 틀(`pre.code`, 빈칸 `{{1}}`)을 넣는다.

## 4. 장 끝 힌트 · 정답

```html
<h2 class="answers-title">2장 힌트</h2>
<div class="answer hint-box">
  <h3>1세트-03 · 두 수 중 작은 수 · A</h3>
  <ol>
    <li><span class="no">1</span><span><p>일반적인 설명</p>
<pre class="code plain">
name = input()
</pre></span></li>
  </ol>
</div>

<h2 class="answers-title">2장 정답</h2>
<div class="answer">
  <h3>1세트-03 · 두 수 중 작은 수 · A <span class="badge type-write">함수 작성</span></h3>
  <ol>
    <li><span class="no">1</span><span><code>n1 = input()</code></span></li>
    <li><span class="no blank-no">7 ①</span><span><code>cards[0]</code> — 설명</span></li>
  </ol>
</div>
```

- `span.no`에는 단계 번호를 쓴다. 시험 빈칸은 `span.no.blank-no`(주황).
- 힌트 상자는 `div.answer.hint-box`(번호가 파랑), 정답 상자는 `div.answer`.
- 완성 코드는 `li` 안에 `pre.code.small`로 넣는다. 시험 틀의 채운 코드는 `⟦ ⟧`로 정답을 강조한다.

### 칸 그림 (힌트에서 사용)

```html
<table class="cells">
  <tr class="pos"><th>번째</th><td>1</td><td>2</td><td class="hl">3</td></tr>
  <tr class="val"><th>arr</th><td>-85</td><td>999</td><td class="hl">111</td></tr>
  <tr class="idx"><th>인덱스</th><td>0</td><td>1</td><td class="hl">2</td></tr>
</table>
```

- `tr.val`은 칸(테두리 상자), `tr.idx`는 인덱스(파랑), `tr.pos`는 번째·설명(회색)이다. 필요한 줄만 쓴다.
- 강조할 칸은 `td.hl`(주황 옅은 바탕).

## 5. 코드 블록 표시법

```html
<pre class="code">
for i in range(1, n, 2):
    {{1}}
</pre>
```

| 표시 | 결과 |
| --- | --- |
| `{{1}}` | 손으로 채울 빈칸 ① (주황 상자) |
| `{{2:wide}}` | 넓은 빈칸 ② |
| `⟦cards[0]⟧` | 채운 정답 강조 (장 끝 정답에서 사용) |
| `&lt;` `&gt;` | `<` `>` (HTML 안이므로 반드시 바꿔 쓴다) |

- 줄 번호와 문법 색은 자동으로 붙는다. 코드는 `<pre class="code">` 바로 다음 줄부터 들여쓰기 없이 쓴다.
- `pre.code.plain`: 줄 번호 없는 짧은 예시(힌트 안). `pre.code.small`: 작은 글씨(정답 쪽).

## 6. 넘침 검사

화면에서 열면 `sheet.js`가 쪽·단계·힌트·정답 상자·코드가 넘치는지 검사한다(세로와 가로 모두).

- 넘친 곳은 빨간 테두리로 표시되고, `data-over-px`에 넘친 양(px)이 남는다. 인쇄에는 나오지 않는다.
- `<body data-overflow="0">`이면 넘친 곳이 없다. PR을 올리기 전에 모든 쪽이 `0`인지 확인한다.
- 넘치면 단계를 통째로 다음 쪽으로 옮긴다(단계 하나는 두 쪽에 걸치지 않는다).
