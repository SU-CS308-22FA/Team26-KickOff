# Team26-KickOff
  KickOff is a platform that aims people to access Turkish Football League information in an easier way with a good user experience. There are a lot of platforms that shares football league information with users; however, these platforms provide information either in an unorganized way or with a bad UX. Our main objective is displaying all necessary information about the league that football fans want to reach in a web platform in which users can interact with each other and easily find the information that they desire.
<p align="center">
  <a href="https://kickoff-26.herokuapp.com/" alt="Deploy to Heroku">
     <img width="150" alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>

</p>

# Table of Contents

- [1. Description](#1-description)
	- [1.1 Pages](#11-pages)
	- [1.2 Features](#12-features)
- [2. User Documentation](#2-user-documentation)
	- [2.1 Istalling and Running the Software](#21-istalling-and-running-the-software)
	- [2.2 Reporting and Issue](#22-reporting-and-issue)
  - [2.3 Known Issues](#23-known-issues)
- [3. Developer Documentation](#3-developer-documentation)
  - [3.1 Obtaining the Source Code](#31-obtaining-the-source-code)
  - [3.2 Layout of the Directory](#32-layout-of-the-directory)
  - [3.3 Building and Deploying the Project](#33-building-and-deploying-the-project)
- [4. Information](#4-information)
	- [4.1 Authors](#41-authors)
   
# 1. Description

## 1.1 Pages

Platform consists of following pages:

- **Homepage**: Displaying contact information.
- **Players**: Displaying current players in the league and their information such as team number and their positions with filtering feature with respect to their team names.
- **Teams**: Displaying current teams in the league and their information such as their technical director, and stadium name.
- **League**: Displaying the league rankings with team statistics such as number of games played, won, drawn, lost; goals scored, conceded; difference and league points.
- **Referees**: Displaying the current referees in the league and their regions, class, and the matches they monitored.
- **Matches**: Displaying matches of the week and related matches’ statistics.
- **Upcoming Matches**: Displaying upcoming matches.
- **Compare Teams**: Displaying statistical comparison of selected two teams in a table.
- **News**: Displaying league related selected news.

## 1.2 Features

- **Comment**: Users can comment on matches and review the comment of others.
- **Comparing Teams**: Users can perform team comparisons by selecting the desired teams, the objective is ease of comparison.

# 2. User Documentation
    
## 2.1 Istalling and Running the Software 

You can start to use the software by clikcing the Heroku button below.

<p align="center">
  <a href="https://kickoff-26.herokuapp.com/" alt="Deploy to Heroku">
     <img width="150" alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
</p>

## 2.2 Reporting and Issue

If you need help or report any platform related problems, you can reach us from the contact information in the bottom line of the home page.

## 2.3 Known Issues

So far we did not encounter any bugs that will affect the user experience. 
If you find any don't hesitate to contact us.

# 3. Developer Documentation

## 3.1 Obtaining the Source Code

You can obtain the source code in two ways:

### 3.1 a) Downloading the ZIP file
Navigate to the main page of the repository on GitHub.com.
Above the list of files, click ‘Code’.
Click on ‘Download ZIP’ in the bottom.
Extract the ZIP archive and open the directory in you preferred compiler.

### 3.2 b) From Git Bash
Copy the URL for the repository:
- To clone the repository using HTTPS, under "HTTPS", click.
- To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click.
- To clone a repository using GitHub CLI, click GitHub CLI, then click.

Change the current working directory to the location where you want the cloned directory.

Type git clone, and then paste the URL you copied earlier.

`$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY`

Press Enter to create your local clone.

For more detailed information you can refer to:

https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

## 3.2 Layout of the Directory

**client**: Frontend directory (source file is located here).
- **client/src/actions**: Contains functions for adding comment on matches and user actions functions.
- **client/src/components**: Contains functions that are used widely such as commenting feature, error message, getting input, loading, and  main screen layout.
- **client/src/constants**: Contains user related constants used in login, sign up operations.
- **client/src/navigationbar**: Contains navigation bar properties and style.
- **client/src/pages**: Contains the page files of the application (each page’s UI, and functionalities such as mapping).
- **client/src/reducers**: Contains reducers.
- **client/src/styles**: Contains .CSS files of the pages.

**middleware**: Contains functions of asyncHandler.js, isValidObjectId.js (for checking whether the object with that Id exists or not), and verifyJWT.js (for verifying JWT token for authentication).

**models**: Contains MongoDB dataset creating of the objects.

**routes**: Contains routers (APIs) that perform CRUD operations of the database.

## 3.3 Building and Deploying the Project

After installing the software successfully, from the compiler you have to install some packages from the terminal:

- Firstly, you have to enter to client directory by writing ‘cd client’, then you have installed npm package by writing ‘npm install’. After you can look at ‘package.json’ file in this directory to install required packages by writing ‘npm install package_name’.
- Secondly, you have to install required packages which can be found in ‘package.json’ in the main directory by writing ‘npm install’.

After installing the required packages:

- Firstly, connect the backend by writing ‘node index.js’ into the terminal of the main directory.
- Secondly, enter to the client directory by ’cd client’, then execute the code ‘npm start’ to start React application.

Every time, when you want the run the application, execute above two commands.

# 4. Information

This is a project designed for CS308 (Software Engineering) course of Sabancı University.

## 4.1 Authors

Ali Özgün Akyüz: akyuz@sabanciuniv.edu

Berkay Barış Turan: bturan@sabanciuniv.edu

Sermet Özgü: sermetozgu@sabanciuniv.edu
