curl -X POST http://localhost:4000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  }'


curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Only two",
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479", 
    "conversationId": "43d4801a-410b-4c94-88a6-40db0541286a"
  }'



curl 'https://mali-backend.onrender.com/api/conversations' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.6' \
  -H 'content-type: application/json' \
  -H 'origin: http://localhost:5173' \
  -H 'priority: u=1, i' \
  -H 'referer: http://localhost:5173/' \
  -H 'sec-ch-ua: "Not(A:Brand";v="99", "Brave";v="133", "Chromium";v="133"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-gpc: 1' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
  --data-raw '{"userId":"4f949809-0e31-4d3c-98d9-2fcbb74e1ae4"}'
