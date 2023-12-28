import { UserModel } from '../../models/usersModel';
import { User } from '../../entities/User'

const user: User = {
  id: -1,
  first_name: 'first_name_test',
  last_name: 'last_name_test',
  user_name: 'user_name_test',
  hashpassword: 'hashpassword_test'
}

describe('User model testing', () => {
  it('Should have create method', () => {
    expect(UserModel.create).toBeDefined();
  });
  it('Should have get all user method', () => {
    expect(UserModel.getAllUsers).toBeDefined();
  });
  it('Should have get user with userId method', () => {
    expect(UserModel.getUserWithUserId).toBeDefined();
  });
  it('Should have authentication method', () => {
    expect(UserModel.authentication).toBeDefined();
  });
  it('Create method should add a new user', async () => {
    const result = await UserModel.create(user);
    expect(result).not.toBeNull;
  });

  it('Index should show users with user id', async () => {
    const result = await UserModel.getUserWithUserId(1);
    expect(result).not.toBeNull();
  });

  it('Show should show user by id', async () => {
    const result = await UserModel.getAllUsers();
    expect(result).not.toBeNull();
  });

  it('Should show token when Authenticate', async () => {
    const result = await UserModel.authentication('user_name_test', 'hashpassword_test');
    expect(result).not.toBeNull();
  });  
});