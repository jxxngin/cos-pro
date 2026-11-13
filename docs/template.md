# 템플릿 사용법

학습지 HTML을 쓸 때 쓰는 구조와 표시법이다. 견본은 [grade3/sample.html](../grade3/sample.html).
내용 규칙은 [structure.md](structure.md) 3절과 [rules.md](rules.md) 4~7절을 따른다.

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

## 2. 문제 시작

```html
<div class="prob-head">
  <h2>두 수 중 작은 수 · A</h2>
  <span class="src">1세트-03</span>
  <span class="badge type-write">함수 작성</span>   <!-- 빈칸 문제는 type-blank -->
  <span class="tag">min</span>
</div>
<div class="summary">
  <p>쉬운 말로 줄인 문제 2~3줄</p>
  <table class="io"><tr><th>입력</th><th>출력</th></tr><tr><td>27
64</td><td>27</td></tr></table>
</div>
<p class="goal">이 문제에서 할 일 한 줄</p>   <!-- 앞에 "목표"가 자동으로 붙음 -->
```

- 문제가 다음 쪽으로 이어지면, 그 쪽 맨 위에 머리말만 다시 넣고 배지 대신 `<span class="cont">(이어서)</span>`를 쓴다.
- 장의 첫 쪽은 맨 위에 `header.chapter-band`(장 번호 `div.ch-no`, `h1`, 한 줄 설명 `p`)를 넣는다.

## 3. 미션

```html
<div class="mission">
  <div class="m-no">2</div>
  <h3>숫자로 바꾸기</h3>
  <div class="note">
    <p>설명 (질문보다 먼저)</p>
    <pre class="code plain">
age = int(age)    # 문제와 다른 변수로 예시
</pre>
  </div>
  <p class="caution">틀리기 쉬운 점 한 줄</p>        <!-- 앞에 "⚠ 주의" 자동 -->
  <p class="ask">n1, n2를 정수로 바꿔 보세요.</p>    <!-- 앞에 "Q." 자동 -->
  <div class="write-lines" style="--lines: 2"></div>
</div>
```

| 요소 | 쓰는 법 |
| --- | --- |
| `div.note` | 알아 두기. 안에 `p`, `pre.code`, `table.cells`, `ol.steps`를 넣는다 |
| `div.note.short` | 한 줄짜리 알아 두기. 장의 두 번째 문제부터 반복되는 미션에 쓴다 |
| `p.caution` | 주의 한 줄 (미션당 0~1개) |
| `p.ask` | 질문 한 문장 |
| `div.write-lines` | 쓰기 줄. `--lines`는 줄 수(줄 간격 8mm) |
| `div.mission.final` | 최종 미션 (번호 동그라미가 채워짐) |
| `div.mission.fill-rest` | 쪽의 남는 공간을 모두 쓰기 줄로 채움. 이때 `--lines`는 최소 줄 수 |

## 4. 칸 그림

리스트·문자열의 "번째"와 인덱스를 보여 줄 때 쓴다.

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
- `pre.code.plain`: 줄 번호 없는 짧은 예시(알아 두기 안). `pre.code.small`: 작은 글씨(정답 쪽).

## 6. 장 끝 정답

```html
<h2 class="answers-title">2장 정답</h2>
<div class="answer">
  <h3>1세트-03 · 두 수 중 작은 수 · A <span class="badge type-write">함수 작성</span></h3>
  <ol>
    <li><span class="no">미션 1</span><span><code>n1 = input()</code></span></li>
    <li><span class="no blank-no">최종 ①</span><span><code>cards[0]</code> — 설명</span></li>
  </ol>
</div>
```

- 완성 코드는 `li` 안에 `pre.code.small`로 넣는다. 시험 틀의 채운 코드는 `⟦ ⟧`로 정답을 강조한다.

## 7. 넘침 검사

화면에서 열면 `sheet.js`가 쪽·미션·알아 두기·정답 상자·코드가 넘치는지 검사한다.

- 넘친 곳은 빨간 테두리로 표시되고, `data-over-px`에 넘친 양(px)이 남는다. 인쇄에는 나오지 않는다.
- `<body data-overflow="0">`이면 넘친 곳이 없다. PR을 올리기 전에 모든 쪽이 `0`인지 확인한다.
- 넘치면 미션을 통째로 다음 쪽으로 옮긴다(미션 하나는 두 쪽에 걸치지 않는다).
