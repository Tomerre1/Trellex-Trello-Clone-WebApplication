Kanban-style task management board app inspired by trello.com
Production link - https://trellex-coding-academy.herokuapp.com/

Manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects to do in the project. Users can modify the board and change list and card locations using Drag and Drop.

## Application Features


Create Boards and manage projects
Craete, remove, and update lists
Drag and Drop lists and task cards in the board
Create, remove, edit tasks
Manage members, lables, due date, attachments, activity and comments in each task
Get notifications when actions are done on your tasks
Search and filter cards based on lables, members and free text
Archive tasks and view the archived tasks
Change the background of your board with the Unsplash Photo API
View project analytics in the dashboard

## Application Demo


Link: https://trellex-coding-academy.herokuapp.com/


## Technology Stack


The technology stack i used was MERN - MongoDB, Express, React, Node.js .
The app uses webSockets to update the board in real-time , without the need to refresh the page to get updates.
The API calls to the backend are done with the REST API method , and we used middlewares to authenticate and authorize actions.

## Getting Started


1. Head to my Bambello Repository and clone the project or download the files.
git clone https://github.com/Tomerre1/Trellex

2.Enter the backend folder and make sure you have node_modules installed. After that we will initiate the server with 'npm start'
    
    cd backend 
    npm i 
    npm start
    
    You shuold get a console ouput that the server is up and running at port 3030

    Enter the frontend folder and repeat the same process.
    cd frontend
    npm i 
    npm start
    You shuold get a console ouput that the server is up and running at localhost:3000.

the app will be up and running at localhost:3000 in your browser. enjoy !

