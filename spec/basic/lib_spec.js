var util = require('util');

describe('no protractor at all', function() {
  it('should still do normal tests', function() {
    expect(true).toBe(true);
  });
});

describe('protractor library', function() {
  it('should expose the correct global variables', function() {
    expect(protractor).toBeDefined();
    expect(browser).toBeDefined();
    expect(by).toBeDefined();
    expect(element).toBeDefined();
    expect($).toBeDefined();
  });

  it('should wrap webdriver', function() {
    browser.get('index.html');
    expect(browser.getTitle()).toEqual('My AngularJS App');
  });

  it('should export custom parameters to the protractor instance', function() {
    expect(browser.params.login).toBeDefined();
    expect(browser.params.login.user).toEqual('Jane');
    expect(browser.params.login.password).toEqual('1234');
  });

  it('should allow a mix of using protractor and using the driver directly',
    function() {
      browser.get('index.html');
      expect(browser.getCurrentUrl()).
          toEqual('http://localhost:8000/index.html#/http')

      browser.driver.findElement(protractor.By.linkText('repeater')).click();
      expect(browser.driver.getCurrentUrl()).
          toEqual('http://localhost:8000/index.html#/repeater');

      browser.navigate().back();
      expect(browser.driver.getCurrentUrl()).
          toEqual('http://localhost:8000/index.html#/http');
    });

  it('should export other webdriver classes onto the global protractor',
      function() {
        expect(protractor.ActionSequence).toBeDefined();
        expect(protractor.Key.RETURN).toEqual('\uE006');
    });
});
