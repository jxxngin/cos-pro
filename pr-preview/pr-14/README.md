# cos-pro

이미 한 번씩 풀어 본 **COS Pro 3급(Python)** 문제를 시험 전날 다시 떠올리기 위한 **A4 인쇄용 복습 학습지**입니다.
문제는 시험 원문 그대로 싣고, 풀이는 짧은 단계로 나눠 직접 코드를 써 보게 했습니다. 힌트와 정답은 각 장 끝에 있습니다.

**바로 보기: https://jxxngin.github.io/cos-pro/**

## 구성

| 순서 | 학습지 | 수록 문제 | 쪽 |
| --- | --- | --- | --- |
| 표지 | [표지 · 목차](https://jxxngin.github.io/cos-pro/grade3/index.html) | 푸는 방법, 장별 수록 문제 | 1 |
| 요약 | [한 장 요약](https://jxxngin.github.io/cos-pro/grade3/cheatsheet.html) | 문제에 나온 문법만 모은 요약 | 2 |
| 1장 | [기본 연산과 출력 형식](https://jxxngin.github.io/cos-pro/grade3/ch01-basic-output.html) | 유형1 문제 10, 유형2 문제 3 | 7 |
| 2장 | [비교와 조건](https://jxxngin.github.io/cos-pro/grade3/ch02-compare.html) | 유형1 문제 3, 유형2 문제 4 · 2 · 10 · 5 | 23 |
| 3장 | [합계 · 평균 · 최댓값](https://jxxngin.github.io/cos-pro/grade3/ch03-sum-max.html) | 유형2 문제 1 · 8, 유형1 문제 8 | 11 |
| 4장 | [개수 세기](https://jxxngin.github.io/cos-pro/grade3/ch04-count.html) | 유형1 문제 6, 유형2 문제 9 · 6, 유형1 문제 2 | 14 |
| 5장 | [문자열 · 리스트 다루기](https://jxxngin.github.io/cos-pro/grade3/ch05-string-list.html) | 유형1 문제 4 · 9, 유형2 문제 7 | 10 |
| 6장 | [반복으로 만들기](https://jxxngin.github.io/cos-pro/grade3/ch06-loop.html) | 유형1 문제 1 · 5 | 9 |

20문제 중 19문제를 수록했습니다. 유형1 문제 7은 시험 코드 자료를 받는 대로 1장에 추가합니다.

## 학습지 한 문제의 흐름

1. **원문 읽기**: 시험과 같은 문제 설명, 입력·출력 설명, 예제
2. **풀이 힌트**: 쓸 수 있는 도구를 간접적으로 알려 주는 한 줄
3. **단계별로 풀기**: 짧은 질문마다 코드를 한 줄씩 쓰고, 마지막에 전체 코드를 처음부터 쓴다
4. **장 끝 힌트 · 정답**: 막히면 힌트를, 다 쓰면 정답을 본다

풀이 방법이 두 가지인 문제는 A · B로 나눠 각각 풉니다. 예를 들어 `sum()`으로 평균을 구하는 풀이와 반복문으로 직접 더하는 풀이를 따로 풉니다.

## 인쇄하기

- Chrome이나 Edge에서 학습지를 열고 <kbd>Ctrl</kbd> + <kbd>P</kbd>를 누릅니다.
- 용지는 **A4**, 여백은 **없음**(또는 기본값)으로 두고, **배경 그래픽**을 켜면 색이 화면과 같게 나옵니다.
- 장마다 파일이 나뉘어 있어 필요한 장만 다시 인쇄할 수 있습니다. 순서는 표지 → 요약 → 1~6장입니다.

## 저장소 구조

```
cos-pro/
├─ index.html        첫 화면 (GitHub Pages)
├─ grade3/           3급 학습지 (표지, 요약, 장별 HTML)
├─ assets/
│  ├─ css/           공통 스타일, 인쇄 스타일
│  └─ js/sheet.js    코드 줄 번호·색·빈칸 표시, 쪽 번호, 넘침 검사
└─ docs/             구성 · 디자인 · 작성 규칙, 문제 원문
```

빌드 과정 없이 HTML을 그대로 엽니다. `main`에 머지하면 GitHub Pages에 자동으로 배포되고, PR마다 미리보기 주소(`/cos-pro/pr-preview/pr-번호/`)가 만들어집니다.

## 작성 규칙

학습지는 [`docs/`](docs/)의 규칙을 기준으로 만듭니다.

- [structure.md](docs/structure.md): 목적, 전체 구성, 문제 페이지 구성
- [design.md](docs/design.md): 색상, 글꼴, 인쇄 규칙
- [rules.md](docs/rules.md): 원문, 단계, 힌트, 정답 작성 규칙
- [workflow.md](docs/workflow.md): 브랜치 · PR · 리뷰 진행 방식

문제 원문은 시험 문제를 그대로 옮긴 것으로, 저작권은 출제 기관에 있습니다. 이 저장소는 개인 학습용 복습 자료입니다.
