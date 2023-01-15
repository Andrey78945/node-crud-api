import { IncomingMessage, ServerResponse } from "node:http";
import { NewUser, User } from "../types.js";
import { DataBase } from "./databse.js";
import getJSONDataFromRequestStream, { isUuid, parseUrl } from "./parser.js";
// import { getJSONDataFromRequestStream } from "./parser.js";

class AppController {
    db: DataBase

    constructor() {
        this.db = new DataBase();
    }

    resolveRequest(request: IncomingMessage, response: ServerResponse): string {
        let result = ''
        switch (request.method) {
            case 'GET': {
                if (request.url === '/api/users') {
                    const users: User[] = this.db.getUsers()
                    result = JSON.stringify(users)
                } else if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        const user: User | undefined = this.db.getUser(inputId)
                        result = JSON.stringify(user)
                    }
                }
                break;
            }
            case 'POST': {
                if (request.url === '/api/users') {
                    getJSONDataFromRequestStream<NewUser>(request)
                    .then(user => {
                      const newUser = this.db.addUser(user);
                      result = JSON.stringify(newUser)
                    })
                }
                break;
            }
            case 'DELETE': {
                if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        this.db.deleteUser(inputId)
                        result = JSON.stringify({})
                    }
                }
                break;
            }
            case 'PUT': {
                if (request.url?.startsWith('/api/users/')) {
                    const inputId: string = parseUrl(request.url)
                    if (isUuid(inputId)) {
                        const user: User | undefined = this.db.getUser(inputId)
                        if (user) {
                            getJSONDataFromRequestStream<{username?: string, age?: number, hobbies?: string[]}>(request)
                                .then(userUpdate => {
                                    if (userUpdate.username) user.username = userUpdate.username
                                    if (userUpdate.age) user.age = userUpdate.age
                                    if (userUpdate.hobbies) user.hobbies = userUpdate.hobbies
                                    result = JSON.stringify(user)
                                })
                        }
                    }
                }
                break;
            }
        }
        return result
    }
}

export default AppController;