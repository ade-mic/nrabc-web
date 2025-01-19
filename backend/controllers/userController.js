import User from "../models/User.js";
import validators from "../validator/validator.js";

const { validateUserSignup, validateUserLogin } =  validators;

class UserController {
  // Create a new user
  static async createUser(req, res) {
    try {
      // validate user data
      const { err } = validateUserSignup(req.body);
      if (err){
        return res.status(400).json({message: err.message})
      }

      // Check if user exist before
      const userExist = await User.findOne({
        email: req.body.email,
      })
      if (userExist) {
        // console.log(userExist)
        return res.status(400).json({
          message: 'User exist'
        })
      }

      //  create User
      const { name, email, role, password } = req.body;
      const user = await User.create({ name, email, role, password });

      //  Check if user is succesfully created
      if (!user) {
        return res.status(400).json({
          message: 'Cannot create user'
        })
      }
      //  Return success message if user
      const token = await user.jwtToken()
      const options = {
        expiresIn: 3000,
        httpOnly: true,
      }
      return res.status(200).cookie('token', token, options).json({
        message: 'Signup succesful',
        token,
      })
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
  }

    // User Login
  static async userLogin(req, res) {
    try {
      // validate user
      const { err } = validateUserLogin(req.body);

      if (err) {
        return res.status(400).jsonn({
          message: err.message
        });
      }

      // find user by email
      const user = await User.findOne({ email: req.body.email })

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }

      // check if password matched
      const isMatched = await user.comparePassword(req.body.password)

      if (!isMatched) {
        return res.status(400).json({
          message: 'Incorrect password or email'
        })
      }

      const token = await user.jwtToken()

        
      const options = {
        httpOnly: true,
      }

      return res.status(200).cookie('token', token, options).json({
        message: 'Login successful',
        id: user._id,
        token,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // Get me, Userprofile
  static async getMe(req, res, next) {
    const user = await User.findOne({ _id: req.user._id }).select('-password');
    if (!user) {
      return res.status(200).json({
        message: 'User not found'
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: user
    })
}

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
    }
  }


  // Get a single user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching user", error: error.message });
    }
  }
  

  // Update user details
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating user", error: error.message });
    }
  }

  // Delete a user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
    }
  }
    // logout a user
    static async logout(req, res) {
      try {
        res.cookie('token', 'none', {
          expires: new Date(Date.now()),
        })
        return res
          .status(200)
          .json({
            success: true,
            message: 'User is logout successfully'
          })
      } catch (error) {
        console.log(error.message)
      }
  }
}

export default UserController;
