
import User from '../models/user.model.js';

class UserService {
  // Method to register a new user
  static async registerUser(username, password, location) {
    try {
      const newUser = new User(false, username, password, location);
      const createdUser = await newUser.createUser(process.env.MONGODB_URI, process.env.dbName);
      return createdUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }

  // Method to authenticate a user
  static async authenticateUser(username, password) {
    try {
      // Assuming you have a method to find a user by username
      const user = await User.findByUsername(username);
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return user;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw new Error('Failed to authenticate user');
    }
  }

  // Method to update user profile
  static async updateUserProfile(userId, newProfileData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, newProfileData, { new: true });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
    }
  }

  // Method to delete user account
  static async deleteUserAccount(userId) {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error) {
      console.error('Error deleting user account:', error);
      throw new Error('Failed to delete user account');
    }
  }

  // Method to reset user password
  static async resetPassword(username, newPassword) {
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        throw new Error('User not found');
      }
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Failed to reset password');
    }
  }

  // Method to search for users
  static async searchUsers(query) {
    try {
      const users = await User.find({ $text: { $search: query } });
      return users;
    } catch (error) {
      console.error('Error searching for users:', error);
      throw new Error('Failed to search for users');
    }
  }

  // Method to save user data/preferences
  static async saveUserData(userId, data) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.data = data;
      await user.save();
    } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
    }
  }

  // Method to track user activity
  static async trackUserActivity(userId, activity) {
    try {
      // I should use pino logger here but theres no time.
      console.log(`User ${userId} performed activity: ${activity}`);
    } catch (error) {
      console.error('Error tracking user activity:', error);
     
    }
  }
}

export default UserService;
