import { FormEvent, useState } from "react";
import { Employee, Employees } from "../proto/employee";
import EmployeeList from "./EmployeeList";

export default function() {
    let [employees, setEmployees ] = useState([] as Employee[]);

    const margin = ".5rem"
    
    return <>
        <form action="javascript:void" onSubmit={ () => addEmployee(employees).then(emp => setEmployees([ ...employees, emp ])) }>
            <fieldset>
                <input type="text" name="username" id="username" placeholder="username" />
                <br style={{ margin }}/>
                <input type="text" name="password" id="password" placeholder="password" />
                <br style={{ margin }}/>
                <input type="text" name="profileImage" id="profileImage" placeholder="profile image link" />
                <br style={{ margin }}/>
                <input type="number" name="salary" id="salary" placeholder="salary" />
                <br style={{ margin }}/>
                <button type="submit">Add</button>
            </fieldset>
            <button
                type="button"
                onClick={ () => fetchEmployees().then(emps => setEmployees(emps)) }
            >Fetch</button>
        </form>

        <EmployeeList employees={ employees } />
    </>
}

async function fetchEmployees(): Promise<Employee[]> {
    // return fetch("/employee/1", {
    return fetch("http://localhost:8080/employee", {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: "application/octet-stream",
            // "Access-Control-Allow-Origin": "*"
        }
    }).then(res => {
        console.log(res);
        return res.arrayBuffer()
    })
    .then(res => {
        console.log(res);
        return Employees.deserialize(res)
    })
    .then(employees => {
        console.log(employees)
        console.log(employees.toObject())

        return employees.employees
    });
}

async function addEmployee(employees: Employee[]): Promise<Employee> {
    const id = employees.at(-1)?.id ?? 1
    const username = document.querySelector<HTMLInputElement>("#username")!.value
    const password = document.querySelector<HTMLInputElement>("#password")!.value
    const profileImage = document.querySelector<HTMLInputElement>("#profileImage")!.value
    const salary = +document.querySelector<HTMLInputElement>("#salary")!.value

    const employee = new Employee({
        id,
        username,
        password,
        profileImage,
        salary
    })
    
    return fetch("http://localhost:8080/employee", {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/octet-stream",
            // "Access-Control-Allow-Origin": "*"
        },
        body: employee.serializeBinary()
    }).then(res => {
        return res.arrayBuffer()
    }).then(res => {
        return Employee.deserialize(res)
    })
}