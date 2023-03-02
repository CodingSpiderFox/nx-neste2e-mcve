import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MyData, MyDocument } from './schema';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';

type ObjectId = Types.ObjectId;

@Injectable()
export class AppService {
  constructor(
    @InjectModel(MyData.name) private readonly dataModel: Model<MyDocument>
  ) {}

  async getData(): Promise<{ message: string }[]> {
    return await this.dataModel.find();
  }

  async addData(item: { message: string }) {
    await this.dataModel.create({ message: item.message });
  }

  async deleteAll() {
    await this.dataModel.deleteMany({});
  }
}
