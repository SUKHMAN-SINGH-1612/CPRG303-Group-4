# Expo Sign-In and Navigation Assignment

## Assignment Description  
This assignment involves creating an Expo application with a sign-in form, input validation, navigation, and dynamic content display. Key tasks include:  
- Setting up Expo navigation.  
- Validating username/password using regex.  
- Storing and checking credentials from `credentials.json`.  
- Implementing a welcome screen with tabs for Calgary and Edmonton.  
- Using reusable components for city links and styled information sections.  

## Team Members  
- **Member 1:** [Sukhman](https://github.com/SUKHMAN-SINGH-1612)  
- **Member 2:** [Aleena](https://github.com/Aleenaali24)  
- **Member 3:** [Zarish](https://github.com/zarishbilal)  

## Features Implemented  
- **Sign-In Form**:  
  - Input fields for username and password with real-time validation.  
  - Regex checks for username (≥5 characters) and password complexity (≥8 chars, uppercase, lowercase, number, special character).  
  - Error messages for invalid inputs or mismatched credentials.  

- **Navigation**:  
  - Redirect to a welcome screen on successful sign-in.  
  - Tabs for Calgary and Edmonton, each displaying city images, information, and clickable links.   

- **Styling**:  
  - Clean and responsive UI for forms and welcome screens.  

## Setup and Installation  
1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/SUKHMAN-SINGH-1612/cprg303-assignment02  
   cd cprg303-assignment02
2. **Installing the dependencies**:
   ```bash
   npm install
3. **Start the expo server**:
   ```bash
   npm start
4. **Credentials Setup**:
   Ensure ```credentials.json``` is placed in the project root with username-password pairs.

## Navigation and Components
1. Welcome Screen:
    - Tabs switch between Calgary and Edmonton content dynamically.

2. CityLink Component:
    - Props: url (city webpage) and label ("go to city page").
    - Opens the URL in a browser on click.

3. CityInfo Component:
    - Consistently styled layout for city details.

## GitHub Repository
- Link: [GitHub Repository](https://github.com/SUKHMAN-SINGH-1612/CPRG303-Group-4/edit/main/Assignments/assignment-2)
- Commits: Each team member contributed with at least 2 commits.
- Collaboration: Code reviewed and merged via pull requests.

## Submission
- The GitHub repository link has been submitted via D2L.
- This project adheres to SAIT’s Academic Conduct policies (A.C.3.4.3).
