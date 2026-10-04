class Message {
    constructor() {
        this.greeting = 'Hello %1, What a beautiful day. Server current date and time is';
        this.fileWriteSuccess = 'File written successfully';
        this.fileWriteError = 'Error writing file';
        this.fileNotFound = '404 - %1 not found';
        this.notFound = '404 - Not Found';
    }
}

module.exports = Message;