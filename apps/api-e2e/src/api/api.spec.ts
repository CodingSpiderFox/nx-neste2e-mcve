import { DEFAULT_DB_NAME } from 'apps/api/src/app/app.module';
import { MyData, MySchema } from 'apps/api/src/app/schema';
import axios from 'axios';
import { connect, connection } from 'mongoose';
import { DB_URI, resetDb, sleep } from '../support/helpers';

describe('Post twice, then get', () => {
  beforeEach(async () => {
    await resetDb();
    // let things settle
    await sleep(10000);
  });

  it('should return two messages', async () => {
    const deleteResult = await axios.delete('/');
    expect(deleteResult.status).toBe(200);

    const post1 = await axios.post('/', { message: 'Hello' });
    expect(post1.status).toBe(201);
    const post2 = await axios.post('/', { message: 'Hello2' });
    expect(post2.status).toBe(201);

    const res = await axios.get(`/`);
    expect(res.status).toBe(200);

    await connect(DB_URI);
    const apiDb = connection.useDb(DEFAULT_DB_NAME);
    const myModel = apiDb.model<MyData>('MyData', MySchema);
    const documents = await myModel.find({});
    expect(documents.length).toBe(2);
  });
});
