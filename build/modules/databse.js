import { User } from "../types.js";
export class DataBase {
    constructor() {
        this.users = new Array();
    }
    getUsers() {
        return this.users;
    }
    getUser(id) {
        if (this.users.length > 0) {
            return this.users.find((user) => user.id === id);
        }
    }
    addUser(map) {
        const user = new User(map);
        this.users.push(user);
    }
    updateUser(id, map) {
        const user = this.getUser(id);
        if (user) {
            if (map.has("username"))
                user.username = map.get("username");
            if (map.has("age"))
                user.age = Number(map.get("age"));
            if (map.has("hobbies"))
                user.hobbies = JSON.parse(map.get("hobbies"));
        }
    }
    deleteUser(id) {
        const user = this.getUser(id);
        if (user) {
            const index = this.users.indexOf(user);
            this.users = [...this.users.splice(0, index), ...this.users.splice(index + 1)];
        }
    }
}
//# sourceMappingURL=databse.js.map