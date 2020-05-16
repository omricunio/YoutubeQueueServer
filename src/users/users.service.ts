import { Injectable } from '@nestjs/common';
import { Users } from './interfaces/interfaces';
import * as randomize from 'randomatic';

@Injectable()
export class UsersService {
    private readonly users: Users  = [];

    /**
     * @returns the user id
     */
    createUser(): string {
        const userId = randomize('aA0', 8);
        this.users.push(userId);
        return userId;
    }

    /**
     * @returns all the users
     */
    getAllUsers(): Users {
        return this.users
    }
}
