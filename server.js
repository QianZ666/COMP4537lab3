
const http = require('http');
const url = require('url');
const Utils = require('./modules/utils');
const Message = require('./lang/en/en');
const fs = require('fs');

class Server {
    constructor() {
        this.utils = new Utils();
        this.message = new Message();
        this.server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);

            if (req.method === 'GET' && parsedUrl.pathname === '/getDate/') {
                const name = parsedUrl.query.name;
                const currentTime = this.utils.getDate();

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<p style="color: blue;">${this.message.greeting.replace('%1', name)} ${currentTime}</p>`);
            } else if (req.method === 'GET' && parsedUrl.pathname === '/writeFile/') {
                const rawQuery = req.url.split('?text=')[1];
                const text = decodeURIComponent(rawQuery);
                fs.appendFile('file.txt', text + '\n', 'utf8', (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end(this.message.fileWriteError);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(this.message.fileWriteSuccess);
                    }
                });
            } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/readFile/')) {
                const fileName = parsedUrl.pathname.replace('/readFile/', '');
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end(this.message.fileNotFound.replace('%1', fileName));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(data);
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(this.message.notFound);
            }
        });
    }

    start(port) {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
const PORT = process.env.PORT || 3000;
const server = new Server();
server.start(PORT);
