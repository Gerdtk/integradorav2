// index.d.ts
import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      uid: string;
      email?: string;
      [key: string]: any;
    };
  }
}
