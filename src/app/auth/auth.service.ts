import { IUser } from './auth.interface';
import { User } from './auth.model';

//Always All business logic We must write in service pages
const createUser = async (UserData: IUser): Promise<IUser | null> => {
  const { id, role, password } = UserData;

  // Create a new user
  const newUser = new User({ id, role, password });
  await newUser.save();

  return newUser;
};

export const UserService = {
  createUser,
};
