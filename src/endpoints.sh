#this document contains the curl commands for any endpoint of this project
#the line /* jq -R '. as $raw | try fromjson catch $raw */ just improve the json highlighting


#get tasks by id
curl 'http://localhost:3000/tasks/1' \
  | jq -R '. as $raw | try fromjson catch $raw' 

#create task
curl -d "title=curlTest&description=I am using curl" \
  -X POST http://localhost:3000/tasks \
  | jq -R '. as $raw | try fromjson catch $raw' 

#delete one task by id
curl -X DELETE http://localhost:3000/tasks/16 

#update one by ID
curl --data-urlencode 'status=IN_PROGRESS' \
  -X PATCH 'http://localhost:3000/tasks/status/8' \
  | jq -R '. as $raw | try fromjson catch $raw'


#get all tasks
curl 'http://localhost:3000/tasks' \
  | jq -R '. as $raw | try fromjson catch $raw'

#get tasks by status
curl 'http://localhost:3000/tasks?status=OPEN' \
  | jq -R '. as $raw | try fromjson catch $raw'

#get tasks by search param (it search on title and description)
curl 'http://localhost:3000/tasks?search=Call' \
  | jq -R '. as $raw | try fromjson catch $raw'
