import puppeteer from 'puppeteer';

jest.setTimeout(30000);
describe('Credit Card Validator form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: [
        '--start-maximized',
      ],
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('Check entering a valid card number', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.waitForSelector('.input');
    const button = await page.waitForSelector('.button');
    await page.waitForSelector('.inform');

    await input.type('4716370423950637');
    await button.click();

    await page.waitForSelector('.valid');
  });

  test('Check entering an invalid multiple number', async () => {
    await page.goto('http://localhost:9000');

    const input = await page.waitForSelector('.input');
    const button = await page.waitForSelector('.button');

    await input.type('4716370423950630');
    await button.click();

    await page.waitForSelector('.inform');
  });

  afterEach(async () => {
    await browser.close();
  });
});
