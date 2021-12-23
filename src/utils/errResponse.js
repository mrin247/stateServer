// Error Class
class ErrorResponse extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

// Exports
module.exports= ErrorResponse;