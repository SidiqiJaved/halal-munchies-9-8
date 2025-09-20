import type { UserRole } from "../models/user.model";

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Request {
      user?: AuthenticatedUser;
    }
    interface Response {
      locals: Record<string, unknown> & {
        responsePayload?: unknown;
        errorMessage?: string;
      };
    }
  }
}

export {};
