const timeout = 5000;

describe(
  '/ (Home Page)',
  () => {
    let page;
    beforeAll(async () => {
      page = await globalThis.__BROWSER_GLOBAL__.newPage();
      await page.goto('https://github.com');
    }, timeout);

    it('Browser Should be connected', async () => {
      const connection = await globalThis.__BROWSER_GLOBAL__.isConnected();
      expect(connection).toBeTruthy();
    });
  },
  timeout,
);