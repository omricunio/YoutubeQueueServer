import { IsString } from "class-validator";

export class QueueOpeationHeaders {
    @IsString()
    authorization: string;
}