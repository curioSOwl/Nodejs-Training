import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto, UpdateEmployeeDto } from "../dto/employee.dto";
import { validate } from "class-validator";
import { RequestWithUser } from "../utils/requestwithuser";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllEmployees);
    this.router.get("/:id", authorize, this.getEmployeeById);
    this.router.post("/login", this.loginEmployee);
    this.router.put("/:id", authorize, this.updateEmployee);
    this.router.delete("/:id", authorize, this.deleteEmployee);
    this.router.post("/", authorize, this.createEmployee);
  }

  public getAllEmployees = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (!role) {
        throw new HttpException(400, "validation error");
      }
      const employees = await this.employeeService.getAllEmployees();
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public getEmployeeById = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (!role) {
        throw new HttpException(400, "validation error");
      }
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

      res.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  };

  public loginEmployee = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.employeeService.loginEmployee(email, password);
      res.status(200).send({ data: token });
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(400, "validation error");
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        console.log(errors);
        throw new HttpException(400, "validation error", errors);
      }

      const employees = await this.employeeService.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.password,
        employeeDto.role,
        employeeDto.address,
        employeeDto.department
      );
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public updateEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(400, "validation error");
      }
      const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        throw new HttpException(400, "validation error", errors);
      }
      const employees = await this.employeeService.updateEmployee(
        Number(req.params.id),
        req.body.name,
        req.body.email,
        req.body.department
      );
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };

  public deleteEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(400, "validation error");
      }
      const employeeID = Number(req.params.id);
      if (!employeeID) {
        throw new HttpException(400, "ID is not an integer");
      }
      const employees = await this.employeeService.delete(
        Number(req.params.id)
      );
      res.status(200).send(employees);
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
