import { load } from 'cheerio';
import * as iconv from 'iconv-lite';
import { transaction } from 'service/prismaClient';

export const novelUseCase = {
  scrape: (aozoraUrl: string): Promise<string> =>
    transaction('RepeatableRead', async (tx) => {
      const html = await fetch(aozoraUrl).then((b) => b.arrayBuffer());
      const $ = load(iconv.decode(Buffer.from(html), 'Shift_JIS'));
      const body = $('body');
      return body.text();
    }),
};
