curl -X POST http://localhost:4000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  }'


curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "content": "What are my two recent purchase",
    "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479", 
    "conversationId": "273e96ea-107b-4a38-9dfc-f7c0a3dc3e16"
  }'



