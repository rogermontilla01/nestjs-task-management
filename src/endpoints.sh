#this document contains the curl commands for any endpoint of this project
#the line /* jq -R '. as $raw | try fromjson catch $raw */ just improve the json highlighting

#### Use "exit" to clese the terminal

#get tasks by id
curl -s 'http://localhost:3000/tasks/1' \
  --header "Authorization: Bearer $USER_TOKEN_2" \
  | jq -R '. as $raw | try fromjson catch $raw' 

#create task
curl -H "Authorization: Bearer ${USER_TOKEN_1}" \
  -X POST --data "title=Task with an owner&description=This is a test 3" \
  'http://localhost:3000/tasks' \
  | jq -R '. as $raw | try fromjson catch $raw' 

#delete one task by id
curl -H "Authorization: Bearer ${USER_TOKEN_1}" \
  -X DELETE http://localhost:3000/tasks/3 

#update one by ID
curl -H "Authorization: Bearer ${USER_TOKEN_1}" \
  --data-urlencode 'status=DONE' \
  -X PATCH 'http://localhost:3000/tasks/status/2' \
  | jq -R '. as $raw | try fromjson catch $raw'


#get all tasks by user
curl -s 'http://localhost:3000/tasks' \
  --header "Authorization: Bearer ${USER_TOKEN_1}" \
  | jq -R '. as $raw | try fromjson catch $raw'

#get tasks by status
curl -i 'http://localhost:3000/tasks?status=OPEN' \
  --header "Authorization: Bearer ${USER_TOKEN_1}" \
  | jq -R '. as $raw | try fromjson catch $raw'

#get tasks by search param (it search on title and description)
curl 'http://localhost:3000/tasks?search=1' \
  --header "Authorization: Bearer ${USER_TOKEN_1}" \
  | jq -R '. as $raw | try fromjson catch $raw'

#singup one user 
curl -i --header "Content-Type: application/json" \
  --request POST --data '{"username":"sandra","password":"User.002"}' \
  http://localhost:3000/auth/signup \
  | jq -R '. as $raw | try fromjson catch $raw'

#singin user 1
curl -s --header "Content-Type: application/json" \
  --request POST --data '{"username":"natalia","password":"User.001"}' \
  http://localhost:3000/auth/signin \
  | export USER_TOKEN_1=$( jq -r '.accessToken') && \
  echo $USER_TOKEN_1

#singin user 2
curl -s --header "Content-Type: application/json" \
  --request POST --data '{"username":"sandra","password":"User.002"}' \
  http://localhost:3000/auth/signin \
  | export USER_TOKEN_2=$( jq -r '.accessToken') && \
  echo $USER_TOKEN_2


#test
curl --location --request POST 'http://localhost:3000/auth/test' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbmRyYSIsImlhdCI6MTYxODE4OTAyNiwiZXhwIjoxNjE4MTkyNjI2fQ.4OVJhpSiXPhcgM0c-7CNucHp27hkwdarSl6GTibReWA' 

