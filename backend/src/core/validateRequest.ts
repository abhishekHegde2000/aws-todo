import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError, ZodTypeAny } from "zod";

/**
 * Middleware to validate incoming request data using a Zod schema.
 * Works with body, query, and params.
 */
export const validateRequest = (schema: ZodObject<any> | ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // .parse() throws a ZodError if validation fails
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // ✅ Validation passed, move to the next middleware
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // ❌ Validation failed, send detailed 400 response
        return res.status(400).json({
          error: "Validation failed",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      // ⚙️ Any other (non-Zod) error
      next(error);
    }
  };
};
