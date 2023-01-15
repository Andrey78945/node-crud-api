import {v4 as uuidv4} from "uuid"

export class User {
    id: string
    username: string
    age: number
    hobbies: string[]

    constructor(map: Map<string, string>) {
        this.id = uuidv4();
        this.username = map.get("username") as string
        this.age = Number(map.get("age"))
        this.hobbies = JSON.parse(map.get("hobbies") as string)
    }
}

export type NewUser = Omit<User, 'id'>

export const enum Method {
    GET,
    POST,
    PUT,
    DELETE
}

// export const enum StatusCode {
//     "200",
//     "400",
// }