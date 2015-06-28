CreditFeatureModule.controller('CreditFeatureCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

    $('#newCreditModal').on('shown.bs.modal', function (e) {
        $('input[type="text"],input[type="number"]').val('');
        $('#creditName').focus();
    });

    $('#update_data').click(function(){

        if ( $('input[type="text"]').val() != "" && $('input[type="number"]').val() != ""  ) {
            var refUpdate = new Firebase("https://angularjg.firebaseio.com/credit");
            refUpdate.once("value", function(data) {  
                    this.data = data;
                    refUpdate.child(data.val().length ).set([$scope.creditName,$scope.creditScore]);
                    $scope.creditName = "";
                    $scope.creditScore = "";
                    $('#newCreditModal').modal('hide');
          });
        };
    });

var ref = new Firebase("https://angularjg.firebaseio.com/credit");

    $('#removeCreditModal').on('shown.bs.modal', function (e) {
        $('select').val('');
        $('#selectRemoveCreditProfile').focus();  
        var ref = new Firebase("https://angularjg.firebaseio.com/credit");  
        ref.once("value", function(data) {  
            this.data = data;
            var creditData = data.val(); 
            $scope.creditData = creditData;   
            $('#selectRemoveCreditProfile').empty();  
            $('#selectRemoveCreditProfile').append("<option value='' selected>--- Select a pofile to delete ---</option>" );
            for (var i = creditData.length - 1; i >= 0; i--) {
                if ( creditData[i] != undefined ) {
                    $('#selectRemoveCreditProfile').append("<option value=" + i + ">" + creditData[i][0] + ' - ' + creditData[i][1] + "</option>" );
                };
            };
        });
    });

    
    $scope.creditRemove = "";

    $scope.removeData = function (index) {

        if ( $('select').val() != ""  ) {
            this.index = index;
            console.log(index);
            var refRemove = new Firebase("https://angularjg.firebaseio.com/credit");
            refRemove.once("value", function(data) {      

                this.data = data;
                var indexNumber = parseInt(index);
                var number = indexNumber;
                var credArray = [];

                if ( data.val().length > 1  ) {

                    for (var i = 0; i < data.val().length; i++) {
                        if ( i != number ) {
                            credArray.push([ data.val()[i][0],data.val()[i][1] ]);
                        };
                    };
                    var refSet = new  Firebase("https://angularjg.firebaseio.com");
                    refSet.once("value", function(data) {  
                        this.data = data;
                        refSet.child('credit').set(credArray);        
                    });   

                    console.log(credArray);
                    $('#removeCreditModal').modal('hide');
                    
                } else {

                }        
            });
        };
    }

    $scope.creditUpdateData = "";

    $('#updateCreditModal').on('shown.bs.modal', function (e) {
        $('select,input[type="text"],input[type="number"]').val('');
        $('#selectUpdateCreditProfile').focus();  
        var ref = new Firebase("https://angularjg.firebaseio.com/credit");  
        ref.once("value", function(data) {  
            this.data = data;
            var creditUpdateData = data.val(); 
            $scope.creditUpdateData = creditUpdateData;   
            $('#selectUpdateCreditProfile').empty();  
            $('#selectUpdateCreditProfile').append("<option value='' selected>--- Select a pofile to edit ---</option>" );
            for (var i = creditUpdateData.length - 1; i >= 0; i--) {
                if ( creditUpdateData[i] != undefined ) {
                    $('#selectUpdateCreditProfile').append("<option value=" + i + ">" + creditUpdateData[i][0] + ' - ' + creditUpdateData[i][1] + "</option>" );
                };
            };
        });
    });


    $scope.updateData = function (index,score,name) {


        if ( $('input[type="text"]').val() != "" && $('input[type="number"]').val() != "" && $('select').val() != ""  ) {
        
            this.index = index;
            this.score = score;
            this.name = name;
            console.log(index + ' ' + score + ' ' + name);
            var refUpdate = new Firebase("https://angularjg.firebaseio.com/credit");
            refUpdate.once("value", function(data) {      

                this.data = data;
                var indexNumber = parseInt(index);
                var number = indexNumber;
                var credArray = [];

                if ( data.val().length > 0  ) {

                    for (var i = 0; i < data.val().length; i++) {
                        if ( i == number ) {
                            credArray.push([ name,score ]);
                        } else {
                            credArray.push([ data.val()[i][0],data.val()[i][1] ]);
                        }
                    };
                    var refSet = new  Firebase("https://angularjg.firebaseio.com");
                    refSet.once("value", function(data) {  
                        this.data = data;
                        refSet.child('credit').set(credArray);        
                    });   

                    console.log(credArray);
                    $('#updateCreditModal').modal('hide');
                    
                } else {

                }        
            });
        };

    }


    ref.on("value", function(data) {   

    // Good code:
    var options = {
            chart: {
                renderTo: 'creditfeature',
                type: 'column'
            },
            title: {
                text: 'Credit scores'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                max: 999,
                title: {
                    text: 'Experian credit score'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Credit score in 2015: <b>{point.y:.1f}</b>'
            },
            series: [{
                name: 'Population',
                data: data.val(),
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
    };

    var chart = new Highcharts.Chart(options);

    });


}]);