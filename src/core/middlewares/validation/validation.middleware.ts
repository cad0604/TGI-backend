import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export class ValidationMiddleware {
  static request =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      try {
        await schema.parseAsync(
          {
            body: req.body,
            query: req.query,
            params: req.params,
          },
          {
            async: true,
          },
        );
        return next();
        // @ts-ignore
      } catch (error: ZodError) {
        console.log(error);
        return res.status(412).json({
          meta: {
            success: false,
            code: 'validation_error',
            Message: 'AuthenticationValidation failed',
            form: error?.issues[0].path[0],
          },
          error: error?.issues,
        });
      }
    };
}
