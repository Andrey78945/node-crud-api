import {v4 as uuidv4} from "uuid"

export class User {
    id: string
    username: string
    age: number
    hobbies: string[]

    constructor(newUser: NewUser) {
        this.id = uuidv4();
        this.username = newUser.username
        this.age = newUser.age
        this.hobbies = newUser.hobbies
    }
}

export type NewUser = Omit<User, 'id'>
