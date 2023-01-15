import { DataBase } from "./databse.js";

class AppController {
    db: DataBase

    constructor() {
        this.db = new DataBase();
    }
}

export default AppController;