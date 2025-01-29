# weatherApp

## Notes
**Node version:** 18.20.5

## About this Project
This is an application built using **Nuxt 3**, **Express.js**, and **MongoDB**. The app allows users to:

- Search for a city to view its weather information.
- Save or remove cities from their saved list.

To provide a personalized experience, a plugin was implemented to generate a unique ID for each user. This ensures that saved cities are tied to individual users, allowing each person to see only their saved cities.

## Challenges Faced and Solutions
### 1. Error Handling
Errors, such as searching for a non-existent city, were not displayed.  
**Solution:** Implemented proper error propagation from the backend and displayed error messages conditionally in the UI.

### 2. City Save State
The "Save Location" button didn’t update its state when a city was already saved.  
**Solution:** Added a computed property to check if the city exists in the saved cities list, ensuring the button state updated reactively.

### 3. Duplicate City Prevention
Saved cities were being duplicated in the list.  
**Solution:** Added backend validation to block duplicates and provided appropriate feedback in the UI.

These solutions improved the app’s user experience, responsiveness, and ensured functionality tailored to individual users.
