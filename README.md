# keyswig - Key.Switch.Ignition
**By: Kenneth Lin**
***********************

![](https://firebasestorage.googleapis.com/v0/b/ping-vs-pong.appspot.com/o/Screen%20Shot%202016-12-15%20at%202.23.34%20PM.png?alt=media&token=91ccdaaf-f85a-49d5-ad9c-f79371613e59) 

![](https://firebasestorage.googleapis.com/v0/b/ping-vs-pong.appspot.com/o/Screen%20Shot%202017-01-09%20at%209.00.52%20PM.png?alt=media&token=d8a7d3f3-0a11-4112-a53f-d59f9a9f7d31)

## Overview: 
Keyswig (Key.Switch.Ignition) is a social platform aiming to bring local auto communities closer together through driver meetups and car switching.

## Check it out here: 

https://keyswig.herokuapp.com/


## Current Features: 

* User Authentication (Sign up/Login) with encryption
* Add, Edit, or Remove cars to your Garage
* Add, Edit, or Remove user profile
* Browse for other users' submitted cars
* Contact users (show contact info)

## Planned Features:

* Field validation (server & client side) for all forms
* Upload user and vehicle images
* Breadcrumbs
* Confirmation email on signup
* 'Forgot my password' prompt & email
* User Profile (Change email + password)
* Messaging/Inbox
* Search & filter
* Geolocation

## Technologies Used: 

**Frameworks & Libraries:**
* Express.js
* Mongoose
* jQuery
* Materialize

**Server:**
* Node.js

**Database:**
* MongoDB

**Key Middleware**
* Passport
* Bcrypt
* Express-EJS-layouts
* Express-session

**Languages:** 
* Javascript
* HTML
* CSS

**Hosting:** 
* Heroku
* mlab

**Tools:** 
* Git/GitHub (https://github.com/Kenworthe/keyswig-Key-Switch-Ignition)
* Trello (https://trello.com/b/UBTnIL8v/ga-wdi-project-2)
* VS Code

## Notes: 

- Initially overloaded with features. Wasted a lot of time attempting to implement features that were eventually cut (due to time constraints).
- Lesson learned: before beginning project, research all technologies which need to be used, read documentation, and estimate how long it would take to implement.
- Mongoose documentation sucks.
- Implementing custom rules with Passport was difficult at first, but once you create one it was easy to add more.
- Materialize was simple to implement, but is very opinionated and difficult to customize once added to an element.
- Still need to create seeds.js file to create/reset initial db data.
