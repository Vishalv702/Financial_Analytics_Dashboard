import { UserType } from '../../models/User'; // Update path accordingly

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
