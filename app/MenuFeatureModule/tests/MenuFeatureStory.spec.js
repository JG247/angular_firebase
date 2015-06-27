// spec.js
describe('A suite of stories about the menu', function() {
  var credit = element(by.id('credit_score'))
  var risk = element(by.id('risk_score'));

  beforeEach(function() {
    browser.get('http://localhost/projects/angular_firebase/#/');
  });
  it('should contain a button with the id credit_score containing the text credit score', function() {
    expect(credit.getText()).toContain('Credit Score');
  });
  it('should contain a button with the id risk_score containing the text risk score', function() {
    expect(risk.getText()).toContain('Risk Score');
  });
});

