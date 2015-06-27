// spec.js
describe('A suite of stories about the credit feature', function() {
  var creditModalBtn = element(by.id('creditModalBtn')),
  creditName = element(by.model('creditName')),
  creditScore = element(by.model('creditScore')),
  updateDataBtn = element(by.id('update_data')),
  closeBtn = element(by.id('close'));

  beforeEach(function() {
    browser.get('http://localhost/projects/angular_firebase/#/');
  });
  it('should add a new credit profile to the chart', function() {

    // Open modal
    creditModalBtn.click();

    //Populate name and credit score
    creditName.sendKeys("David"); 
    creditScore.sendKeys(600); 

    //Save data
    updateDataBtn.click();
  });

  it('should add a new credit profile details and close the modal without saving', function() {

    // Open modal
    creditModalBtn.click();

    //Populate name and credit score
    creditName.sendKeys("David"); 
    creditScore.sendKeys(600); 

    //Save data
    closeBtn.click();
  });
});
