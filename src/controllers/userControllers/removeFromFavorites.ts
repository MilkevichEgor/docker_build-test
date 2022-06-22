import { Handler, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import constants from '../../utils/constants';
import createCustomError from '../../utils/createCustomError';
import db from '../../db';

type ReqBody = {
  book_id: number,
}

type ExtendedRequest = Request<unknown, unknown, ReqBody>

export const removeFromFavorites: Handler = async (req: ExtendedRequest, res, next) => {
  try {
    const user = req.user;

    user.favorites = user.favorites.filter((book) => {
      return book.bookId !== +req.body.book_id;
    });

    const result = await db.user.save(user);

    if (!result) {
      throw createCustomError(StatusCodes.INTERNAL_SERVER_ERROR, constants.COMMON_ERROR_MESSAGE);
    }

    res.status(StatusCodes.ACCEPTED).json(result);
  } catch (err) {
    next(err);
  }
};

export default removeFromFavorites;
