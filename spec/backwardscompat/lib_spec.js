var util = require('util');

describe('no ptor at all', function() {
  it('should still do normal tests', function() {
    expect(true).toBe(true);
  });
});

describe('protractor library', function() {
  var ptor = protractor.getInstance();

  it('should wrap webdriver', function() {
    ptor.get('index.html');
    expect(ptor.getTitle()).toEqual('My AngularJS App');
  });

  it('should export custom parameters to the protractor instance', function() {
    expect(ptor.params.login).toBeDefined();
    expect(ptor.params.login.user).toEqual('Jane');
    expect(ptor.params.login.password).toEqual('1234');
  });

  it('should allow a mix of using protractor and using the driver directly',
    function() {
      ptor.get('index.html');
      expect(ptor.getCurrentUrl()).
          toEqual('http://localhost:8000/index.html#/http')

      ptor.driver.findElement(protractor.By.linkText('repeater')).click();
      expect(ptor.driver.getCurrentUrl()).
          toEqual('http://localhost:8000/index.html#/repeater');

      ptor.navigate().back();
      expect(ptor.driver.getCurrentUrl()).
          toEqual('http://localhost:8000/index.html#/http');
    });

  it('should export other webdriver classes onto the global protractor',
      function() {
        expect(protractor.ActionSequence).toBeDefined();
        expect(protractor.Key.RETURN).toEqual('\uE006');
    });
});
