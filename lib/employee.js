class Employee {
    constructor(first_name, last_name, role, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.manager_id = manager_id;
         }

    getFirstname() {
        return this.first_name;
    }

    getLastname() {
        return this.last_name;
    }

    getRole() {
        return this.role;
    }

    getManagerId() {
        return this.manager_id;
    }

  
}




module.exports = Employee;