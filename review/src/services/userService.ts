import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import { generateHash, comparePassword } from "../utils/hash";
import { UserSignUpRequest, UserSignUpResponse } from "../shared/dto/UserDto";
import { error } from "console";
import { UserRepository } from "../repository/userRepository";


export class userService {

    constructor(private userRepository:UserRepository) {}


  async createUser( req : UserSignUpRequest) {
    const { accountId, password, username } = req;
    const hashedpass = generateHash(password);
    
    this.userRepository.createUser(accountId, hashedpass, username);
  }



}
