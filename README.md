# Eco-agric Project 
## The Evergreen Initiative

Welcome to The Evergreen Initiative, a web application designed to provide users with valuable information about soil types, climate conditions, and suitable plants for cultivation based on their location. Whether you're an experienced farmer, a gardening enthusiast, or simply love greenery, our app is here to help you make informed decisions and nurture your green spaces.

## Features

- **User Registration and Authentication**: Create an account and log in securely to access personalized information tailored to your location.
- **Location-Based Recommendations**: Discover soil types and climate conditions specific to your area, along with recommended plants that thrive in your environment.
- **Plant Care Tips**: Learn best practices for cultivating and caring for recommended plants, including watering schedules, sunlight requirements, and soil preferences.
- **Profile Management**: Update your profile information, change your password, and manage preferences to customize your experience.
- **Responsive Design**: Access the app seamlessly from any device, including desktop computers, tablets, and smartphones.

## Installation (For Developers)

Follow these steps to set up The Evergreen Initiative locally on your machine:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/nixxphi/Eco-agric.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd evergreen-initiative
   ```

3. **Install Dependencies**:
   ```bash
   npm install mongoose express node-fetch nodemon
   ```

4. **Set Up Environment Variables**:
   - Create a file named `.env` in the project directory.
   - Add the following lines to the `.env` file:
     ```plaintext
     MONGODB_URI=your_mongodb_uri
     API_KEY=your_openweathermap_api_key
     PORT: your_port
     dbname: your_dbname
     ```

5. **Start the Server**:
   ```bash
   npm start
   ```

## Usage

1. **Sign Up**:
   - Click on "Sign Up" and enter your username, password, and location.
   - Click "Register" to create your account.

2. **Log In**:
   - After signing up, log in with your username and password.

3. **Explore**:
   - Check out the "Soil Type" and "Climate" tabs to learn about your local conditions.
   - Visit the "Plants" tab to discover which plants thrive in your area.

4. **Profile Management**:
   - Update your profile information under the "Profile" section.
   - Change your password in the "Profile" section.
   - Customize your preferences, such as notification settings and preferred units, under the "Preferences" section.

## Support

If you encounter any issues or have questions about The Evergreen Initiative, please don't hesitate to contact our support team at support@________.com. We're here to help!

## Credits

- This project utilizes data from [OpenWeatherMap API](https://openweathermap.org/api) for climate information.
- Soil type data is sourced from [ISRIC - World Soil Information](https://www.isric.org/).
```

This README provides a professional and comprehensive overview of "The Evergreen Initiative," including installation instructions for developers and usage guidelines for users. Let me know if you need any further adjustments!
