import path from 'path';
import fs from 'fs';

import IUsersRepository from '../repositories/IUsersRepository';
import uploadConfig from '@config/upload';
import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/Users';

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProviders from '@shared/container/providers/StorageProvider/models/IStorageProvider';


interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProviders
    ){}

    public async execute({ user_id, avatarFilename}:IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);
        if (!user){
            throw new AppError('Only authenticated users can change avatar.', 401)
        }
        if (user.avatar){
            //deletar avatar anterior
            await this.storageProvider.deleteFile(user.avatar);
        }

        const filename = await this.storageProvider.saveFile(avatarFilename)

        user.avatar = avatarFilename;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;