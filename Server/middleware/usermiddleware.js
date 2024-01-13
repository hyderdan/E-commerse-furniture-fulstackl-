const jwt = require('jsonwebtoken');
const cookieParser=require('cookie-parser')

const userMiddleware = (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.headers.authorization || req.cookies.token;
  // const secretKey = 'f1u2rr'; 

  

  console.log('Token in UserMiddleware:', token);

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }
  else{
  try {
    console.log("heee",token)
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true,
    });

    console.log('Decoded Token:', decoded);

    // Attach user information to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in userMiddleware:', error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}
};

module.exports = userMiddleware;