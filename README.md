Kanban-style task management board app inspired by trello.com
Production link - https://trellex-coding-academy.herokuapp.com/

Manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects to do in the project. Users can modify the board and change list and card locations using Drag and Drop.

![Screen Shot 2021-11-13 at 14 07 41](https://user-images.githubusercontent.com/58183173/141643223-7c375ce4-a337-4feb-aed5-d8f7c003ae70.png)
![Screen Shot 2021-11-13 at 14 03 19](https://user-images.githubusercontent.com/58183173/141643226-e1787019-acdc-41a1-8fb4-d7f75bd53d37.png)
![Screen Shot 2021-11-13 at 14 04 54](https://user-images.githubusercontent.com/58183173/141643227-a5c2af50-1aa4-44bd-b048-b0ad11892387.png)
![Screen Shot 2021-11-13 at 14 05 35](https://user-images.githubusercontent.com/58183173/141643228-20960024-3f6c-440d-87a0-b9cc015c9fe7.png)
![Screen Shot 2021-11-13 at 14 06 03](https://user-images.githubusercontent.com/58183173/141643229-dce7dac0-bff0-4532-9ca7-62e84821788d.png)


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

First Head to my Trellex Repository and clone the project or download the files.
git clone https://github.com/Tomerre1/Trellex

Second Enter the backend folder and make sure you have node_modules installed. After that we will initiate the server with 'npm start'
    
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

