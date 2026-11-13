# 템플릿 사용법

학습지 HTML을 쓸 때 쓰는 구조와 표시법이다. 견본은 [grade3/sample.html](../grade3/sample.html).

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

## 2. 쪽 구성

| 쪽 종류 | 구조 |
| --- | --- |
| 장 첫 쪽 | `header.chapter-band` + (반 쪽 문제 짝 `div.half-pair` 또는 `article.problem.full`) |
| 1쪽 문제 | `section.page > article.problem.full` |
| 반 쪽 문제 2개 | `section.page > div.half-pair > article.problem.half` × 2 |
| 장 끝 정답 | `h2.answers-title` + `div.answer` 여러 개 |

### 문제 하나의 순서

1. `div.prob-head`: `h2` 제목, `span.src` 원래 번호, `span.badge.type-blank`(빈칸 채우기) 또는 `span.badge.type-write`(함수 작성), `span.tag` 주제
2. `div.summary`: 요약 `p` + 입출력 표 `table.io`
3. `p.idea`: 핵심 한 줄 (앞에 "핵심"이 자동으로 붙음)
4. `div.compare`: `div.method` 두 개. 코드가 길면 `div.compare.stack`(위아래)
   - `div.method-head`: `span.label`(방법 A/B) + 설명 + `span.exam`(시험 코드 방식) 또는 `span.ref`(참고) + `span.memo`(한 줄 메모, 오른쪽)
5. `div.warn`: 헷갈리기 쉬운 점 목록
6. `div.practice`: 직접 써 보기. 빈칸 코드 또는 `div.write-lines`

- 반 쪽 문제는 4~6을 `div.half-grid`(왼쪽 풀이 / 오른쪽 `div.side`에 주의·써 보기)로 묶는다.

## 3. 빈칸 문제의 `시험 코드 방식`

빈칸 문제에서 `시험 코드 방식` 칸에 **정답을 채운 코드를 넣지 않는다.** 같은 쪽의 "직접 써 보기" 빈칸 답이 그대로 보이기 때문이다.

- `시험 코드 방식` 칸: 코드가 어떤 순서로 동작하는지 `ol.steps`로 2~4줄 설명한다.
- "직접 써 보기": 시험 코드 틀을 빈칸 그대로 싣는다.
- 장 끝 정답: 빈칸별 정답 + 채운 전체 코드(⟦ ⟧ 강조)

## 4. 코드 블록 표시법

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
| `⟦cards[0]⟧` | 채운 정답 강조 (정답 쪽에서 사용) |
| `&lt;` | `<` (HTML 안이므로 `<`는 반드시 `&lt;`로 쓴다) |

- 줄 번호와 문법 색은 자동으로 붙는다. 코드는 `<pre class="code">` 바로 다음 줄부터 들여쓰기 없이 쓴다.
- 작은 글씨가 필요하면 `pre.code.small`.

## 5. 쓰기 줄

```html
<div class="write-lines" style="--lines: 4"></div>
```

- `div.practice` 안에서는 남는 공간을 줄로 모두 채운다. `--lines`는 최소 줄 수다.

## 6. 넘침 검사

화면에서 열면 `sheet.js`가 쪽·반 쪽·써 보기 칸·코드가 넘치는지 검사한다.

- 넘친 곳은 빨간 테두리로 표시되고, `data-over-px`에 넘친 양(px)이 남는다. 인쇄에는 나오지 않는다.
- `<body data-overflow="0">`이면 넘친 곳이 없다. PR을 올리기 전에 모든 쪽이 `0`인지 확인한다.
