import { User } from "../types.js";

export class DataBase {
    private users: User[]

    constructor() {
        this.users = new Array();
    }

    getUsers(): User[] {
        return this.users
    }

    getUser(id: string): User | undefined {
        if (this.users.length > 0) {
            return this.users.find((user: User): boolean => user.id === id)
        }
    }

    addUser(map: Map<string, string>): void {
        const user = new User(map)
        this.users.push(user)
    }

    updateUser(id: string, map: Map<string, string>): void {
        const user = this.getUser(id)
        if (user) {
            if (map.has("username")) user.username = map.get("username") as string
            if (map.has("age"))user.age = Number(map.get("age"))
            if (map.has("hobbies"))user.hobbies = JSON.parse(map.get("hobbies") as string)
        }
    }

    deleteUser(id: string) {
        const user = this.getUser(id)
        if (user) {
            const index: number = this.users.indexOf(user)
            this.users = [...this.users.splice(0, index), ...this.users.splice(index + 1)]
        }
    }
}