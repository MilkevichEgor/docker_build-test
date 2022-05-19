import { StatusCodes } from 'http-status-codes';
import { Handler, Request } from 'express';
import tokenUtils from '../../utils/tokenUtils';
import userRepository from '../../services/getRepository';

type ReqBody = {
  email: string;
  password: string;
  name: string;
  dob: string;
}
type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const signUp: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const userData = userRepository.create(req.body);
    const user = await userRepository.save(userData);

    delete user.password;
    const token = tokenUtils.create(user.id);

    return res.status(StatusCodes.CREATED).json({ data: { message: 'User created!', user, token } });
  } catch (err) {
    next(err);
  }
};

export default signUp;
