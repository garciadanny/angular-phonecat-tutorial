'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  beforeEach(module('phonecatServices'));

  it('check the existence of Phone factory', inject(function(Phone) {
    expect(Phone).toBeDefined();
  }));
});
