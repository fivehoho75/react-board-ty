(require("dotenv") as any).config();

const Server = (require("./server") as any).default;

const server = new Server();
server.listen(4000);
