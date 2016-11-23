# Listify

## Deploy
git clone https://github.mit.edu/6170-fa16/final-proj-philmeup.git
npm install
sudo mongod
npm start

go to http://localhost:3000/ in the browser

## Caveats
Passwords are currently stored in plain text.
The feed of rankings you participate in don't yet display the number of contributors.
We currently don't display validation errors when we create Ranking and Consensus objects.
You cannot toggle public or private yet.
For some reason,

## Routes
http://localhost:3000/login for the login page. Note that we haven't yet implemented middleware to detect whether the user is authenticated. 

http://localhost:3000/