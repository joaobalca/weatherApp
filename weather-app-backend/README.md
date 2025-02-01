## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```
## Development Server
```bash
# run backend
npm run start
```
## Testing
```bash
# npm
npm test
```
## Note:

To provide a personalized experience, a plugin was implemented to generate a unique ID for each user. This ensures that saved cities are tied to individual users, allowing each person to see only their saved cities.

## Challenges Faced and Solutions

### 1. Duplicate City Prevention
Saved cities were being duplicated in the list.  
**Solution:** Added backend validation to block duplicates and provided appropriate feedback in the UI.

### 2. Error Handling
Errors, such as searching for a non-existent city, were not displayed.  
**Solution:** Implemented proper error propagation from the backend and displayed error messages conditionally in the UI.

## Dependencies

- **axios**: Used for making HTTP requests to external APIs like OpenWeatherMap.
- **cors**: Enables Cross-Origin Resource Sharing, allowing your backend to handle requests from different origins.
- **dotenv**: Loads environment variables from a `.env` file, keeping sensitive data secure.
- **express**: A lightweight web framework for building the REST API of the application.
- **jest-mock**: Provides utilities for mocking during tests, allowing for isolated unit testing.
- **mongoose**: A library for MongoDB object modeling, used for schema-based data interactions.

## DevDependencies

- **jest**: A testing framework for running unit and integration tests in your backend.
- **supertest**: Used for testing HTTP endpoints by simulating requests to your API.

