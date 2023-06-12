

import { NextFunction } from "express"
import { userService } from "../services/userService"
import { UserSignUpResponse } from "../shared/dto/UserDto";
import { UserRepository } from "../repository/userRepository";


export class UserController {
    private userService: userService = new userService(UserRepository);


    public signUp = async (req: Request, res: Response, next:NextFunction) => {
        const userInfo = req.body;


        const response: any = await this.userService.createUser(userInfo);
        return 0
    }
}
