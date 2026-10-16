#!/bin/bash
# usage: api.sh METHOD PATH [JSON_BODY]
TOKF=/d/platform/.studentA_tmp/token.txt
TOK=$(cat $TOKF 2>/dev/null)
METHOD=$1; PATH_=$2; BODY=$3
req() {
  if [ -n "$BODY" ]; then
    curl -s -m 90 -X "$METHOD" "http://localhost$PATH_" -H "Authorization: Bearer $TOK" -H 'Content-Type: application/json' -d "$BODY" -w "\n__HTTP__%{http_code}"
  else
    curl -s -m 90 -X "$METHOD" "http://localhost$PATH_" -H "Authorization: Bearer $TOK" -w "\n__HTTP__%{http_code}"
  fi
}
OUT=$(req)
CODE=$(echo "$OUT" | tail -1 | sed 's/.*__HTTP__//')
if [ "$CODE" = "401" ]; then
  # re-login once
  curl -s -m 30 -X POST http://localhost/api/auth/login -H 'Content-Type: application/json' -d '{"email":"demo@dreamapp.in","password":"demo123"}' | python -c "import json,sys; print(json.load(sys.stdin)['access_token'])" > $TOKF
  TOK=$(cat $TOKF)
  OUT=$(req)
  CODE=$(echo "$OUT" | tail -1 | sed 's/.*__HTTP__//')
fi
echo "$OUT"
