'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/phones', function() {
    browser.get('app/index.html');

    browser.getLocationAbsUrl().then(function(url) {
      expect(url.split('#')[1]).toBe('/phones');
    });
  });

  describe('Phone list view', function() {
    beforeEach(function() {
      browser.get('app/index.html#/phones');
      query.clear();
    });

    var phoneList = element.all(by.repeater('phone in phones')),
        query = element(by.model('query'));

    it('should filter the phone list as user types', function() {
      expect( phoneList.count() ).toBe(20);

      query.sendKeys('nexus');
      expect( phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect( phoneList.count()).toBe(8);
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

    it('should render phone specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element(by.css('.phones li a')).click();

      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/phones/nexus-s');
      });
    });
  });

  describe('Phone detail view', function() {
    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });

    it('should display palceholder page with phoneId', function() {
      var phoneId = element(by.binding('phoneId')).getText();
      expect(phoneId).toBe('nexus-s');
    });
  });
});
