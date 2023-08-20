# Fasion Digital
Recruitment Exercise Node.js

## Introduction
This application an ExpressJS based NodeJS application developed for Node.js Recruitment Exercise.

## Features
Consumes multiple urls to csv files and processes the downloaded csv data to provide answers to the following questions:
* Name of the politician that gave the most speeches in a given year
* name of the politician that gave the most speeches on a given topic
* name of the politician that used the fewest words (in total) 

## Installation
* Clone the repository
* npm install

## Usage
* Using curl or postman make a Get request to http://localhost:5000/evaluation?url=url1&url=url2&url=url3
* Inside app.ts change values to the variables Year and/or Topic for testing