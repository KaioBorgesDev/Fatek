import crypto from 'crypto';
import bcrypt from 'bcrypt';
export default class User {
  constructor(public email: string, public passwordHash: string, public id_user?: string, public name?: string) {}

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }


  static create(email: string, password: string, name: string): User {
    if(password.length < 6) throw new Error('Password must be at least 6 characters long');
    if(name.length < 3) throw new Error('Name must be at least 3 characters long');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('Invalid email format');
    const id_user = crypto.randomUUID()
    const passwordHash = this.hashPassword(password);
    return new User(email, passwordHash, id_user, name,);
  }


  static hashPassword(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
}
