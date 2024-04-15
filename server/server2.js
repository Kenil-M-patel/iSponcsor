const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Consider using CORS for cross-origin requests
const bcrypt = require('bcrypt'); // For secure password hashing
const mongoose = require('mongoose'); // For MongoDB integration
const jwt = require('jsonwebtoken'); // For JSON Web Tokens

const app = express();
const port = 5000; // Use environment variable or default to 5000

app.use(bodyParser.json());
app.use(cors()); // Enable CORS if needed

// Database Connection (replace with your MongoDB connection string):
mongoose.connect('mongodb://localhost:27017/event-sponsorship', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB database'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// User Schema (Mongoose Model):
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: String, // Optional: Add user type (e.g., organizer, sponsor)
  organization: String,
  events: [
    {
      eventName: String,
      eventDescription: String,
      eventCategory: String,
      targetAudience: String,
      sponsorshipNeeds: String,
      startDate: String,
      endDate: String,
      location: String,
      // Placeholder for mission-related fields (e.g., missionStatement, socialImpact)
    },
  ],
});

const User = mongoose.model('User', userSchema);

// Function to generate a secure JWT token
function generateAuthToken(user) {
  const secretKey = 'your_secret_key'; // Replace with a strong secret key
  const token = jwt.sign({ _id: user._id }, secretKey);
  return token;
}

// Middleware to check for valid user token
async function authorizeUser(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with same secret key
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

// User Registration (with Mongoose):
app.post('/users', async (req, res) => {
  const { userType, firstName, lastName, email, password, organization, events } = req.body;

  // Validate user data
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    userType,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    organization,
    events,
  });

  try {
    const savedUser = await newUser.save();
    res.json({ message: 'User created successfully!', token: generateAuthToken(savedUser) });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// User Login (with Mongoose):
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user){
    return res.status(404).json({ message: 'User not found' })}});

  // Compare incoming password with stored hashed password
  const validPass = await bcrypt.compare(password, user.password);
  if(!validPass) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Return auth token upon successful login
  res.json({ token: generateAuthToken(user) });

function generateAuthToken(user) {
  const secretKey = 'your_secret_key'; // Replace with a strong secret key in production
  const expirationTime = '3600s'; // 1 hour in seconds
  const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: expirationTime });
  return token;
}

app.listen(5000, () => {
  console.log('Server started on port 5000');
})