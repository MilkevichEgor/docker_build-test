import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const createValidatorMiddleware = (shape) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await shape.validate(req, {
        abortEarly: false,
        strict: true,
      });

      next();
    } catch (err) {
      const messages = [];
      err.inner.forEach((e) => {
        messages.push({
          path: e.path.split('.')[0] || e.path,
          field: e.path.split('.')[1] || 'general',
          name: e.name,
          message: e.message,
        });
      });
      res.status(StatusCodes.BAD_REQUEST).json(messages);
    }
  };
};

export default createValidatorMiddleware;
