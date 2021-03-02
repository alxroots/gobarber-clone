import { uuid } from 'uuidv4';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';
import { UpdateQueryBuilder } from 'typeorm';



class FakeUserTokensRepository implements IUserTokensRepository {

    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign({
            id: uuid(),
            token: uuid(),
            user_id
        })
        this.userTokens.push(userToken)
        
        return userToken;
    }
  
}

export default FakeUserTokensRepository;