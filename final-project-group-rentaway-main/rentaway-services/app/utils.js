import jwt from 'jsonwebtoken';

// Creates a response with a status code and an object
const setSuccessfulResponse = (obj, response, code) => {
    response.status(code);
    response.json(obj);
}

// Creates an error response with an error message and status code
const setErrorResponse = (errorMessage, response, code) => {
    response.status(code);
    response.json({
        error: {
            message: errorMessage
        }
    });
}

// Authentication middleware that ensures a user is authorized to make a request
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

export {setSuccessfulResponse, setErrorResponse, authMiddleware};