import { RentfrontPage } from './app.po';

describe('rentfront App', () => {
  let page: RentfrontPage;

  beforeEach(() => {
    page = new RentfrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
