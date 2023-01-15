import { NewUser, User } from '../types.js';

export class DataBase {
  private users: User[];

  constructor() {
    this.users = new Array();
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User | undefined {
    if (this.users.length > 0) {
      return this.users.find((user: User): boolean => user.id === id);
    }
  }

  addUser(newUser: NewUser): User {
    const user = new User(newUser);
    this.users.push({ ...user });
    return user;
  }

  deleteUser(id: string): void {
    const user = this.getUser(id);
    if (user) {
      const index: number = this.users.indexOf(user);
      this.users = [...this.users.splice(0, index), ...this.users.splice(index + 1)];
    }
  }
}
