import puppeteer from "puppeteer";

const url = "http://localhost:8080";
let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
});

afterAll(() => {
  browser.close();
});

describe("Home page e2e test", () => {
  test("Search bar should be loaded", async () => {
    await page.waitForSelector(".searchBar__outercontainer");
  });

  test("Categories cards should be loaded", async () => {
    await page.waitForSelector(".categories__container");
    const title = await page.$eval(".categories__title", (e) => e.innerHTML);
    const linkCards = await page.$$(".category__container");

    expect(title).toContain("Categories");
    expect(linkCards.length).toBe(3);
  });

  test("New games container should be loaded", async () => {
    await page.waitForSelector(".newGame__container");

    const titles = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".newGame__title"), (element) => element.textContent)
    );
    const cards = await page.$$(".newGame__content-container");

    expect(titles[0]).toContain("New games");
    expect(cards.length).toBe(1);
  });
});
