import crypto from 'crypto';
import bcrypt from 'bcrypt';

export default class User {
  constructor(
    public email: string,
    public passwordHash: string,
    public id_user?: string,
    public name?: string
  ) {}

  // Complexidade Ciclomática = 1 (sem estruturas de decisão)
  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  // Complexidade Ciclomática = 4

  // 1 (valor base) + 3 (ifs) = 4
  static create(email: string, password: string, name: string): User {
    if(password.length < 6) throw new Error('Password must be at least 6 characters long'); // +1

    if(name.length < 3) throw new Error('Name must be at least 3 characters long'); // +1

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) throw new Error('Invalid email format'); // +1

    const id_user = crypto.randomUUID();

    const passwordHash = this.hashPassword(password);

    return new User(email, passwordHash, id_user, name);
  }

  // Complexidade Ciclomática = 1 (sem estruturas de decisão)
  static hashPassword(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
}
