import { RocketiumPortableFormat } from '../src';
import { readFile } from 'fs/promises';

describe('rpf', () => {
  it('works', async () => {
    const rpfFile = JSON.parse((await readFile('./test/test.json')).toString());
    expect(() => {
      RocketiumPortableFormat.parse(rpfFile);
    }).not.toThrowError();
  });
});
