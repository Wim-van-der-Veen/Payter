# Angular Sample Project

This project serves as a test project to evaluate job prospects technical skills and work habits.
It consists of a basic angular/bootstrap application where applicants will be asked to implement certain features.

## Getting started

### Technology

This project uses the following technologies:

* Angular 9 (https://angular.io/)
* Bootstrap 4 (https://getbootstrap.com/)
* RX JS (http://reactivex.io/)
* Node.js and NPM (Node package manager) (https://nodejs.org/en/)
* Git version control (https://git-scm.com/)
* Sass css pre-processor (https://sass-lang.com/)
* Font awesome icons (https://fontawesome.com/)

Before continuing please install a Git client, and Node.js (version 10 or higher) for your platform.

### Cloning the repository

Clone this repository using `git clone <url>` with the url specified at the top of this page.

Create a personal branch of the master branch where you can commit your code. Run `git checkout -b app-<your-name>` to create a local branch.

### Testing the application

First install all the npm packages using `npm install`. This will download all the required packages to the node_modules folder.

Secondly install the ng cli tool, using `npm install -g @angular/cli`. (https://www.npmjs.com/package/@angular/cli)

Run `ng serve` inside the project directory to start a development server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Committing your changes

For each assignment you will be asked for patch files. The patch files should contain only the changes relevant to the assignment.
Create a new branch from your personal branch for each assignment `git checkout -b assignment-<NR>`. When you are done, add and commit your changes to the assignment branch.

To create a patch use `git format-patch app-<name> -o patches/assignment-<NR>` which will create patch file for each commit with all the changes between your assignment branch, and the base branch, and place them in the directory patches/assignment-X.
Finally merge your changes into your personal branch by running `git checkout app-<name>` and  `git merge assignment-<NR>`. You are now free to create a new branch for the next assignment.

## Assignment

The task(s) specific assignment will be delivered to you separately. They can cover html & (s)css, javascript/typescipt or angular topics depending on your skills.

## Application

The application is a basic browser based application. It has a header bar, a side menu and a main content container. Pages will be loaded in the main container.
The following pages exist in the application:

* Dashboard (empty)
* Overview of items
* Details of single item
* Create new item page

### Directory structure

The application follows a common angular directory structure. The relevant files are all located in the /src directory.

* /src/app -> all the angular code
    * /src/app/components -> all the angular components (e.g. overview, header, menu, etc)
    * /src/app/services -> all the application services (e.g. data-service)
    * /src/app/model -> all the application data model (e.g. data-item)
* /src/assets -> images & icons
* /src/scss -> all the scss pre-processor files

### Data storage

The application contains a data service that stores entries in memory. This means new items are lost after every refresh. Please use the provisioned items for testing. The data service has a limit of 100 items, and applies a small delay on requests to simulate a real data service.
