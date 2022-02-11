(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "label",
            alias: "Country",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "status_url",
            alias: "Status URL",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "join_date",
            alias: "Join Date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "leave_date",
            alias: "Leave Date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "latest_validation_date",
            alias: "Latest Validation Date",
            dataType: tableau.dataTypeEnum.date
        }];
    
        var tableSchema = {
            id: "eiti_table",
            alias: "EITI Implementing Countries Summary",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    var headers = {
        'Accept':'application/json'  
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://eiti.org/api/v2.0/implementing_country", function(resp) {
            var countries = resp.data,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = countries.length; i < len; i++) {
                tableData.push({
                    "id": countries[i].id,
                    "label": countries[i].label,
                    "status_url": countries[i].status,
                    "join_date": countries[i].join_date,
                    "leave_date": countries[i].leave_date,
                    "latest_validation_date": countries[i].latest_validation_date
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "EITI Implementing Countries Summary";
            tableau.submit();
        });
    });

})();