import mongoose from 'mongoose';

import IToken from '../interfaces/models/Token';

export interface ITokenModel extends IToken, mongoose.Document {}

export const TokenSchema = new mongoose.Schema<ITokenModel>({
  cookie: { type: String },
  csrfToken: { type: String },
});

const Token = mongoose.model<ITokenModel>('token', TokenSchema);

export default Token;
