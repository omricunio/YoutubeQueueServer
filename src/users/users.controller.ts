import { Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './interfaces/interfaces';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    createUser(): string {
        return this.usersService.createUser();
    }

    @Get()
    getAllUsers(): Users {
        return this.usersService.getAllUsers();
    }
}
