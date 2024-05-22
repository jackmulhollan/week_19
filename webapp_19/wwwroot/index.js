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
        empString += '<thead><tr><th scope="col">Employee ID</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Salary</th><th scope="col"></th></tr></thead>';
        empString += '<tbody>';

        //Loop over employees array and build the table rows
        for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];
            empString += '<tr>';
            empString += '<td scope="row">' + employee.employeeId + '</td><td>' + employee.firstName + '</td><td>' + employee.lastName + '</td><td>' + employee.salary + '</td>';

            empString += '<td>';
            empString += '<button type="button" class="btn btn-outline-secondary btn-sm employee-table-update_button" data-employee-id="' + employee.employeeId + '">Update</button>';
            empString += '<button type="button" class="btn btn-outline-secondary btn-sm employee-table-delete_button" data-employee-id="' + employee.employeeId + '">Delete</button>';
            empString += '</td>';

            empString += '</tr>';
        }

        //Create table bottom boilerplate
        empString += '</tbody>';
        empString += '</table>';

        //Check our progress (use either one of these if needed for debugging)
        //alert(empString);
        //console.log(empString);

        //Inject the table string
        employeeTable.innerHTML = empString;

        var updateButtons = document.getElementsByClassName("employee-table-update_button");
        var deleteButtons = document.getElementsByClassName("employee-table-delete_button");

        for (var i = 0; i < updateButtons.length; i++) {
            var updateButton = updateButtons[i];
            updateButton.addEventListener("click", handleEmployeeTableUpdateClick);
        }

        for (var i = 0; i < deleteButtons.length; i++) {
            var deleteButton = deleteButtons[i];
            deleteButton.addEventListener("click", handleEmployeeTableDeleteClick);
        }

    }

    function handleEmployeeTableUpdateClick(event) {
        var employeeId = event.target.getAttribute("data-employee-id");
        alert("Your are wanting to update EmployeID " + employeeId);
    }

    function handleEmployeeTableDeleteClick(event) {
        var employeeId = event.target.getAttribute("data-employee-id");
        alert("Your are wanting to delete EmployeID " + employeeId);
    }

}

//Run application
webapp_19();