import mongoose from 'mongoose';

import { IHouse } from '../interfaces/models/House';

export interface IHouseModel extends IHouse, mongoose.Document {}

export const HouseSchema = new mongoose.Schema<IHouseModel>({
  title: { type: String },
  houseId: { type: Number },
  kindName: { type: String },
  room: { type: String },
  floor: { type: String },
  unitPrice: { type: String },
  totalPrice: { type: String },
  address: { type: String },
  area: { type: String },
});

const House = mongoose.model<IHouseModel>('house', HouseSchema);

export default House;
