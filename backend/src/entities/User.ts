import crypto from 'crypto';

export default class User {
  constructor(public email: string, public passwordHash: string) {}

  validatePassword(password: string): boolean {
    const hashedPassword = User.hashPassword(password);
    return hashedPassword === this.passwordHash;
  }


  static create(email: string, password: string): User {
    const passwordHash = this.hashPassword(password);
    return new User(email, passwordHash);
  }

  
  private static hashPassword(password: string): string {
    return crypto.createHash('sha512').update(password).digest('hex');
  }
}
