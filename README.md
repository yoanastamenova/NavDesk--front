# 🔒 NavDesk - An Access Control Management System 🔒

Welcome to the Frontend part of NavDesk. This is a Co-Working App project providing interactive and user-friendly interfaces to access "Las Naves" facility in Valencia!

<img src="./public/Logobg.png" width="600" height="600" align="center">
<br>

##  <summary> Table of contents 📝</summary>
  <ol>
    <li><a href="#about-the-project-📁">About the project</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#local-installation-option">Clone</a></li>
    <li><a href="#endpoints-⚒">Views</a></li>
    <li><a href="#future-functionalities">Future functionalities</a></li>
    <li><a href="#contributions">Contribution</a></li>
    <li><a href="#web-refferences">Web refferences</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#appreciations">Appreciation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## About the project 📁

This project provides a rich front-end application built with React, TypeScript, Vite, and MUI. It interfaces with the NavDesk backend server to manage access and administration within a co-working space. Users can register, log in, view rooms, make bookings, and admins have additional functionalities like managing room assignments and viewing extensive reports.

<img src="./public/event.png" width="500" height="auto" align="center">

## Deploy 🚀

<div align="center">
    <a href="https://tattoo-studio.zeabur.app/"><strong> Click here! </strong></a>🚀🚀🚀
</div>

## Stack

Used technologies for the project:

<div align="center"> 
<a href="https://reactjs.org/"> 
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> </a> 
<a href="https://typescriptlang.org"> 
<img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> </a>
<a href="https://vitejs.dev/"> 
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/> </a> <a href="https://mui.com/"> 
<img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white"/> </a>  
</div>

## Features
- Authentication (Login/Signup)
- Responsive layout optimized for multiple device sizes
- Booking management for rooms
- Admin specific views:
 - Room management
- User management


## Local installation option ⚙️
- Before starting it is important to have SQL and MySQLWorkbench installed locally in order to work with the database. If you dont have it or simply prefer to use a Docker configuration please follow the steps bellow and then you can continue with the clone.
  -1- Create docker SQL Image `docker build -t mssql-app`
  -2- Create a SQL container `docker run -d --name mssql-container -p 3306:3306 mssql-app`
  -3- Run Docker Desktop App and run the container from there

1. Clone the repository from the url
2. `$ npm install` (to get all the node packages)
3. Connect the cloned repo with our Database (if you dont have docker make a mysql container and run it on the wanted port such as:
` docker run -d --name mysqlc -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root  -v mysql_data:/var/lib/mysql mysql `)
4. Change variables in .env with the PORT given from Docker (default is 3306)
5. `$ npm run migrations`
6. `$ npm run db:seed`
7. `$ npm run db:refresh` to execute everything from the beginning
8. `$ npm run dev` to run our server

## Views

## Future functionalities 
<br>
✅ Add calendar view<br>
⬜ Add confirmation via email <br>
⬜ StartUp and old users validations <br>

## Contribute to the project 📦

Feel free to suggest an improvment or functionality to my project.

There are two ways of doing this:

1. Opening an issue
2. Creating a fork of the repository
   - Creating a new branch
     ```
     $ git checkout -b feature/yourUsername -feat
     ```
   - Make a commit with your changes
     ```
     $ git commit -m 'feat: this X thing'
     ```
   - Make a push to the branch
     ```
     $ git push origin feature/yourUsername -feat
     ```
   - Opening a Pull Request

## Web refferences 📧

To achieve my project I used data from the following sites:

- google.com
- pinterest.com
- spacebring.com
- ...

## Development 📌

```js
const developer = "yoanastamenova";

console.log("Developed by: " + developer);
```

## Contact 📤

<a href = "mailto:yoana.stamenovaa@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/yoanastamenova" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>

</p>