'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {
  describe('Phone list view', function() {
    beforeEach(function() {
      browser.get('app/index.html');
      query.clear();
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
      expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

      query.sendKeys('nexus');
      expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/);
    });

    it('should be able to control phone order via drop down box', function() {
      var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));

      function getNames() {
        return phoneNameColumn.map( function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet');
      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"

      ]);
    });
  });
});
