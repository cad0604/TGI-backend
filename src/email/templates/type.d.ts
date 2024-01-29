import { Types } from 'mongoose';

namespace Type {
  interface ITemplate {
    to?: string;
    username?: string;
    email?: string;
    passwordSessionURL?: string;
    subject?: string;
    html?: string;
    text?: string;
    userId?: Types.ObjectId | null | undefined;
  }
}
