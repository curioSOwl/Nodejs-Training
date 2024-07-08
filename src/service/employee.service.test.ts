import { when } from "jest-when";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "./employee.service";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "./department.service";
import Department from "../entity/department.entity";
import Address from "../entity/address.entity";

describe("Employee service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;
  let departmentService: DepartmentService;
  let departmentRepository: DepartmentRepository;
  let addressTestCase: Address[];
  let employeeTestCase: Employee[];
  let departmentTestCase: Department[];

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };

    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    ) as jest.Mocked<DepartmentRepository>;

    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;

    employeeService = new EmployeeService(
      employeeRepository,
      new DepartmentService(departmentRepository)
    );

    addressTestCase = [
      {
        id: 1,
        createdAt: new Date("2024-07-04T08:16:43.123Z"),
        updatedAt: new Date("2024-07-04T08:16:43.123Z"),
        deletedAt: null,
        line1: "Canada",
        pincode: "34245",
        employee: new Employee(),
      },
      {
        id: 2,
        createdAt: new Date("2024-07-04T08:16:43.123Z"),
        updatedAt: new Date("2024-07-04T08:16:43.123Z"),
        deletedAt: null,
        line1: "New York",
        pincode: "84245",
        employee: new Employee(),
      },
    ];

    employeeTestCase = [
      {
        id: 1,
        createdAt: new Date("2024-07-04T08:16:43.123Z"),
        updatedAt: new Date("2024-07-04T08:16:43.123Z"),
        deletedAt: null,
        name: "george",
        age: 27,
        email: "george@gmail.com",
        password: null,
        role: null,
        address: new Address(),
        department: new Department(),
      },
      {
        id: 2,
        createdAt: new Date("2024-07-04T08:16:43.123Z"),
        updatedAt: new Date("2024-07-04T08:16:43.123Z"),
        deletedAt: null,
        name: "serah",
        age: 22,
        email: "serah@gmail.com",
        password: null,
        role: null,
        address: new Address(),
        department: new Department(),
      },
    ];

    departmentTestCase = [
      {
        id: 1,
        createdAt: new Date("2024-07-07T22:35:27.883Z"),
        updatedAt: new Date("2024-07-07T22:35:44.608Z"),
        deletedAt: null,
        name: "UI",
        employees: [],
      },
      {
        id: 2,
        createdAt: new Date("2024-07-07T22:35:27.883Z"),
        updatedAt: new Date("2024-07-07T22:35:44.608Z"),
        deletedAt: null,
        name: "UX",
        employees: [],
      },
    ];
  });

  it("should return allEmployees", async () => {
    const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mock;

    const users = await employeeService.getAllEmployees();
    expect(users).toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should return Employees with id", async () => {
    const mock = jest.fn();
    when(mock)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, name: "as" } as Employee);
    employeeRepository.findOneBy = mock;

    const users = await employeeService.getEmployeeById(1);
    expect(users.name).toEqual("as");
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should create a newEmployee", async () => {
    const mockSave = jest.fn(employeeRepository.save);
    when(mockSave)
      .calledWith(employeeTestCase[0])
      .mockResolvedValue(employeeTestCase[0])
      .calledWith(employeeTestCase[1])
      .mockResolvedValue(employeeTestCase[1]);
    employeeRepository.save = mockSave;

    const mockDepartment = jest.fn(departmentRepository.findOneBy);
    when(mockDepartment)
      .calledWith({ name: "HR" })
      .mockResolvedValue(departmentTestCase[0]);
    when(mockDepartment)
      .calledWith({ name: departmentTestCase[0].name })
      .mockResolvedValue(departmentTestCase[0]);
    departmentRepository.findOneBy = mockDepartment;
    const users = await employeeService.createEmployee(
      employeeTestCase[0].name,
      employeeTestCase[0].email,
      employeeTestCase[0].age,
      employeeTestCase[0].password,
      employeeTestCase[0].role,
      addressTestCase[0],
      departmentTestCase[0].name
    );
    expect(users.name).toEqual("as");
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
