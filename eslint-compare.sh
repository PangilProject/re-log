#!/bin/bash

# 로컬 node_modules/.bin을 PATH에 추가
export PATH="./node_modules/.bin:$PATH"

# ===============================
# ESLint 전후 비교 자동화 스크립트
# ===============================

REPORT_DIR="eslint-reports"
mkdir -p $REPORT_DIR

BEFORE="$REPORT_DIR/eslint-before.json"
AFTER="$REPORT_DIR/eslint-after.json"

# 명령어 체크
if ! command -v eslint >/dev/null 2>&1; then
  echo "❌ ESLint가 설치되어 있지 않습니다. npm i -D eslint 로 설치해주세요."
  exit 1
fi

echo "========================================"
echo "📌 ESLint 리포트 생성 (전 상태)"
echo "========================================"

eslint . -f json -o $BEFORE
echo "✔ 리포트 저장됨: $BEFORE"

echo ""
echo "========================================"
echo "📌 리팩토링 진행 후 Enter 눌러주세요"
echo "========================================"
read

echo "========================================"
echo "📌 ESLint 리포트 생성 (후 상태)"
echo "========================================"

eslint . -f json -o $AFTER
echo "✔ 리포트 저장됨: $AFTER"

echo ""
echo "========================================"
echo "📊 ESLint 차이 비교"
echo "========================================"

BEFORE_COUNT=$(jq '. | map(.errorCount + .warningCount) | add' $BEFORE)
AFTER_COUNT=$(jq '. | map(.errorCount + .warningCount) | add' $AFTER)

echo "🔹 리팩토링 전 문제 수: $BEFORE_COUNT"
echo "🔹 리팩토링 후 문제 수: $AFTER_COUNT"

DIFF=$((BEFORE_COUNT - AFTER_COUNT))

if [ "$DIFF" -gt 0 ]; then
  echo "✨ 개선됨: 총 $DIFF 개 해결!"
elif [ "$DIFF" -lt 0 ]; then
  echo "⚠️ 악화됨: $((-DIFF)) 개 증가!"
else
  echo "ℹ️ 변화 없음"
fi

echo ""
echo "========================================"
echo "🎉 완료!"
echo "========================================"