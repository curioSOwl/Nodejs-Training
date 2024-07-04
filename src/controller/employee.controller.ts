import express from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", this.getAllEmployees);
    this.router.get("/:id", this.getEmployeeById);
    this.router.post("/", this.createEmployee);
    this.router.put("/:id", this.updateEmployee);
    this.router.delete("/:id", this.deleteEmployee);
  }

  public getAllEmployees = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeById(
        Number(req.params.id)
      );

      if (!employee) {
        const error = new HttpException(
          404,
          `NO employee found with id: ${req.params.id}`
        );
        throw error;
      }

      res.status(200).send(employee.name);
    } catch (err) {
      next(err);
    }
  };

  public createEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const employees = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address
      );
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public updateEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.updateEmployee(
      Number(req.params.id),
      req.body.name,
      req.body.email
    );
    res.status(200).send(employees);
  };

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.delete(Number(req.params.id));
    res.status(200).send(employees);
  };
}

export default EmployeeController;
