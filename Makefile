jwt:

	curl -vv -X POST "http://localhost:3000/users/login" -H "accept: */*" -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"asdfasdf\"}" | jq -r '.token' | pbcopy
