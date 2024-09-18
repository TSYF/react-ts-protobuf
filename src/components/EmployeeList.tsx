import { Employee } from "../proto/employee";

interface Props {
    employees: Employee[]
}

export default function EmployeeList({ employees }: Props) {
    
    return <ul>
        {employees.map((employee: Employee) => <>
            <li key={ `employee_${employee.id}` }>
                <article>
                    <img src={employee.profileImage} />
                    <ul>
                        <li key={ `id_${employee.id}` }>Id: { employee.id }</li>
                        <li key={ `username_${employee.id}` }>Username: { employee.username }</li>
                        <li key={ `salary_${employee.id}` }>Salary: { Math.round(employee.salary) }</li>
                    </ul>
                </article>
            </li>
        </>)}
    </ul>
}