import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  login(email: string, password: string) {
    // In dev, accept any credentials and return a token
    const secret = process.env.JWT_SECRET || 'dev_jwt_secret';
    const payload = { sub: email || 'dev-user', email: email || 'dev@example.com', role: 'admin' };
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return { token };
  }
}
