import { v4 as uuidv4 } from "uuid";
export class User {
    constructor(map) {
        this.id = uuidv4();
        this.username = map.get("username");
        this.age = Number(map.get("age"));
        this.hobbies = JSON.parse(map.get("hobbies"));
    }
}
//# sourceMappingURL=types.js.map