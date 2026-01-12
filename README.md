# Focus: Web Extension
Customizable Web Extension to block websites, avoiding distractions and helping productivity

## What is focus?
Nowadays, technology is very prevalent in all aspects of life, including at work, study and entertainment. That fact, along with the rise of highly-engaging content in social media represents a challenge for many people's concentration. For that reason, I decided to develop a Web extension that aimed to help in that matter. Providing its users with a tool to boost their productivity, and keeping more control on the entertainment they consume on the internet.

**Focus** is a highly customizable Web extension that allows users to block websites, following different patterns, in order to prevent getting distracted from doing important matters. The objective of this project is to help people's productivity by encouraging them to avoid getting their attention taken away by entertainment or social media.

## Features
This extension enables users to fully tailor the way in which they prevent getting distracted on the internet. Its main features are: 

1. Block a list of websites by inputting the websites' full URLs
2. Block a list of websites by inputting a specific pattern to be followed, such as URLs starting in a particular way, URLs ending with a specific pattern, or URLs containing particular keywords or structures.
3. Customizable block page. Allowing users to decide what to show when they try to access a blocked website
4. Statistics, allowing users to know how many websites they are blocking, and how many times **Focus** has helped them at staying concentrated.
5. Privacy. **Focus** runs fully locally; the data needed for the extension to work is only kept in the browser's local storage.

## How does Focus work?
This section will delve into the technical details that define the working of Focus, thoroughly documenting each part of the project's directory tree, so that any developer can understand the way the extension achieves its different functionalities.

### manifest.json
This file describes important information on the web extension. Including elements like the extension's name, description, icons, permissions and resources. This file corresponds to a ManifestV3 for a Web extension. [See more at](https://developer.chrome.com/docs/extensions/reference/manifest)

### /templates folder
Includes the html templates used within the extension.
1. **blocked-page.html:** Represents the html template shown when the user tries to access a blocked website
2. **home.html:** Represents the html template shown in the extension's main menu, allowing users to access statistics, set blocked sites, and customize the blocked page.
3. **popup.html:** Represents the html template loaded when the user clicks the extension icon. It opens a new window rendering home.html

### /static folder
Includes the extension's static files, such as the css stylesheet used in the HTML templates and the icons used in the extension.

### /js folder
Includes the javascript files used by the extension:
1. **block-page.js:** Sets the user's custom subtitle and image on the page shown when trying to access a blocked website
2. **form-helper.js:** File that contains helper functions used to manage the forms in the extension's main menu. Including a function to set values to textAreas, converting comma separated strings to an array of strings. A function to update the local storage upon clicking update buttons. And a function to calculate the number of blocked websites.
3. **home-page-variables.js:** File executed by the home.html file. It handles the variables displayed and forms handled on that template.
4. **home-redirect.js:** File executed by popup.html. It opens a new tab on the home.html file.
5. **storage-helper.js:** File that contains helper functions to handle the extension's local storage. Managing the setting and retrieval of key-values, and the establishment of Variables to refer to the keys used by the extension.
6. **str-helper.js:** File that contains helper functions to handle conversions from strings of comma separated values to arrays of strings, and vice-versa.

### /content-script folder
In the context of Chrome Extensions, content scripts are scripts executed on every page navigated through the browser. This folder contains a single file: **redirect-blocked.js**, which gets the current URL, and checks whether or not it should be blocked by the policies set by the user. If so, it redirects the user to the block page. [See more at](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts)

## Attributions
The default image for the block page features the 401 response status image from [http.cat](https://http.cat/status/401).
Credits to: 
1. Developer of http.cat: [@rogeriopvl](https://twitter.com/rogeriopvl).
2. Original images shown on http.cat: [@girlie_mac](https://twitter.com/girlie_mac).