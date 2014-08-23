'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {
  describe('Phone list view', function() {
    beforeEach(function() {
      browser.get('app/index.html');
    });

    var phoneList = element.all(by.repeater('phone in phones')),
        query = element(by.model('query'));

    it('should filter the phone list as user types', function() {
      expect( phoneList.count() ).toBe(3);

      query.sendKeys('nexus');
      expect( phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect( phoneList.count()).toBe(2);
    });

    it('should display the current query in the title bar', function() {
      query.clear();
      expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

      query.sendKeys('nexus');
      expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/);
    });
  });
});
