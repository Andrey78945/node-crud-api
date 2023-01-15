import 'dotenv/config';
import http from "node:http";
class App {
    start() {
        const PORT = process.env.PORT || 4000;
        const server = http.createServer();
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }
}
export default App;
//# sourceMappingURL=app.js.map