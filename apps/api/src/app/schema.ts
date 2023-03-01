import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MyDocument = MyData & Document;

@Schema({timestamps: true, autoIndex:false, collection: 'my_documents'})
export class MyData {
    @Prop({ required: true })
    message: string;
}

export const MySchema = SchemaFactory.createForClass(MyData);