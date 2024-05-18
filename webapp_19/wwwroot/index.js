//Define application
function webapp_19() {
    //Get elements
    var button01 = document.getElementById("button-01");
    var employeeTable = document.getElementById("employee-table");

    //Add event listeners
    button01.addEventListener("click", handleButton01Click);

    //Functions
    function handleButton01Click() {

        var url = "http://localhost:5293/employees";  //Use the port your webapi is running on!
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterSearchEmployees;
        xhr.open("GET", url);
        xhr.send(null);

        function doAfterSearchEmployees() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var responseAsJsonString = xhr.responseText;
                    //alert(responseAsJsonString);

                    var responseAsJavascriptObject = JSON.parse(xhr.responseText);
                    makeEmployeeTable(responseAsJavascriptObject);

                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }
    }


    function makeEmployeeTable(employees) {

        //Create table top boilerplate
        var empString = '<table class="table">';
        empString += '<thead><tr><th scope="col">Employee ID</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Salary</th></tr></thead>';
        empString += '<tbody>';

        //Loop over employees array and build the table rows
        for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];
            empString += '<tr><td scope="row">' + employee.employeeId + '</td> <td>' + employee.firstName + '</td><td>' + employee.lastName + '</td><td>' + employee.salary + '</td></tr>';
        }

        //Create table bottom boilerplate
        empString += '</tbody>';
        empString += '</table>';

        //Check our progress (use either one of these if needed for debugging)
        //alert(empString);
        //console.log(empString);

        //Inject the table string
        employeeTable.innerHTML = empString;
    }


}

//Run application
webapp_19();