# About RatingShift

This app was developed for the Business Professionals of America Mobile Application competition. The purpose of this app is to rate other mobile applications. This app was created with the JavaScript framework, [React Native](https://reactnative.dev/)

## Description

### Home Page
When you open the app, you are presented with a landing page of the top apps in different categories where you can scroll through each category and click on an image to see a list of the top ten apps of that category. You will also see on this page the top free and paid apps. Top applications are determined from [the fnd.io website](https://fnd.io/).

### Search Page
When you select the search button in the bottom navigation bar (the left icon), you are presented with a blank screen with a search bar at the top of the screen. Here you can search any app to be presented underneath the search bar.

### Account Page
When you select the account button in the bottom navigation bar (the right icon), you are presented with the ability to either create or log into an account. Accounts are managed with [firebase](https://firebase.google.com/)'s authentication module. You can upload an image to be your profile picture and set your username in the app. You can also see all the apps you have rated and reviewed. The apps you have rated can be filtered by the number of stars selected at the top of the page. Any app you have rated will appear filtered by the number of stars selected and below.

### Single App Page
When you select an app you want to view, you are first presented with the image, title, and subtitle of the app. Underneath you can horizontally scroll through basic information about the app such as the rating, developer, language, etc. Below that is an expandable description of the app. Then you'll see a preview of the app provided by the developer. The preview is a horizontal list showcasing the app with images. Finally, you have the reviews for the app. You can see the number of reviews, the average rating, and a few reviews at the bottom. You can create your own review by pressing the *Write a review* button and you can see more reviews by pressing the *See all* button. Reviews and ratings are saved in [firebase](https://firebase.google.com/).

## Express Server
The server is where this app gets all its information about apps from. The server scrapes data from [fnd.io](https://fnd.io/) and [the appstore](https://www.apple.com/app-store/).   The app then caches information about the app whenever needed. 
