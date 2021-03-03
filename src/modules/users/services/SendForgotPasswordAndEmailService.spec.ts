import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordAndEmailService from './SendForgotPasswordAndEmailService';


let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordAndEmailService: SendForgotPasswordAndEmailService;

describe('SendForgotPasswordEmail', ()=>{

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider()
        fakeUserTokensRepository = new FakeUserTokensRepository();
        sendForgotPasswordAndEmailService = new SendForgotPasswordAndEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        );

    })
    it('should be able to recover the password using a valid email', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordAndEmailService.execute({
            email: 'johndoe@example.com'
        });

        expect(sendMail).toHaveBeenCalled();

    });

    it('should not be able to recover a non-existing password', async()=>{

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        
        await expect(sendForgotPasswordAndEmailService.execute({
            email: 'johndoe@example.com',
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should generate a forgot password token', async()=>{

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')
        
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
        await sendForgotPasswordAndEmailService.execute({
            email: 'johndoe@example.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)

    });

});