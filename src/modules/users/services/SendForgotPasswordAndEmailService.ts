import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';


interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordAndEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokensRepository,

    ){}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exist')
        }

        await this.userTokenRepository.generate(user.id);
        
        this.mailProvider.sendMail(email, "pedido de recuperação de senha recebido")
    }
}

export default SendForgotPasswordAndEmailService;