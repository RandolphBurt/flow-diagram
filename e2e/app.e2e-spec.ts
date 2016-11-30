import { FlowDiagramPage } from './app.po';

describe('flow-diagram App', function() {
  let page: FlowDiagramPage;

  beforeEach(() => {
    page = new FlowDiagramPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
