# TimeToWork
## Introduction
TimeToWork is a chrome extension that allows you to gather data over time about a particular journey, and will then graph that information to help you choose the best time of day to take the journey. The main application is expected to be journeys made regularly to and from a place of work. Please note, this is a personal project, and it is still in its early stages.

## Overview
When you select a journey via google maps, the extension will record the amount of time that journey takes. It will then refresh the page at thirty second intervals and record the amount of time. This allows the application to build up data about travel time. The user can then graph this information by day or overall.

### A graph of all the data
![alt text](https://github.com/Graeme-Miller/TimeToWork/blob/master/img/graph_all.png "A graph of all the data")
### A graph of data by day
![alt text](https://github.com/Graeme-Miller/TimeToWork/blob/master/img/graph_day.png "A graph of data by day")

## How to use
After checking out the source, in a chrome browser, go to "chrome://extensions/". Ensure that "Developer mode" is selected. Select "Load unpacked extensions" and select the base folder for TimeToWork. This completes the installation. You will now notice a blue circle with the letters "GM" on the top right of the chrome browser. This is how you access the main menu and any data you have saved.

To start recording data, go to google maps and select some directions. The extension will kick in, record some data and then refresh the page. To access you data, select the main menu by pressing the blue "GM" button.

## Known Issues
* Can only record time in minutes
* Can be memory hungry
* Relies on google structuring their maps page in a particular fashion. This application will break if this is changed

## Screen Shots
### Selecting a new journey (1) - user selects journey
![alt text](https://github.com/Graeme-Miller/TimeToWork/blob/master/img/choose_new.png "Selecting a new journey")
### Selecting a new journey (2) - after data is saved
![alt text](https://github.com/Graeme-Miller/TimeToWork/blob/master/img/choose_after.png "Selecting a new journey")
### Main menu
![alt text](https://github.com/Graeme-Miller/TimeToWork/blob/master/img/main_menu.png "Main menu")
