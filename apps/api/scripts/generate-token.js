const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev_jwt_secret';
const payload = {
  sub: 'dev-user',
  email: 'dev@example.com',
  role: 'admin'
};

const token = jwt.sign(payload, secret, { expiresIn: '7d' });
console.log(token);
