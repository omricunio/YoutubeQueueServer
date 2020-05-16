import { HttpException, HttpStatus } from "@nestjs/common";

export class QueueNotFoundError extends HttpException {
    constructor() {
        super("The requested queue cannot be found", HttpStatus.NOT_FOUND);
    }
}

export class VideoNotFoundError extends HttpException {
    constructor() {
        super("Cannot find the requested video", HttpStatus.NOT_FOUND);
    }
}