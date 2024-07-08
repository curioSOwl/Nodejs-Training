import express, { NextFunction } from "express";
import HttpException from "../../exceptions/http.exceptions";
import { plainToInstance } from "class-transformer";
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
} from "../dto/department.dto";
import { validate } from "class-validator";
import { RequestWithUser } from "../utils/requestwithuser";
import DepartmentService from "../service/department.service";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../utils/role.enum";

class DepartmentController {
  public router: express.Router;

  constructor(private departmentService: DepartmentService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllDepartments);
    this.router.get("/:id", authorize, this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.put("/:id", authorize, this.updateDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
  }

  public getAllDepartments = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (!role) {
        throw new HttpException(400, "Please Login");
      }
      const departments = await this.departmentService.getAllDepartments();
      res.status(200).send(departments);
    } catch (err) {
      next(err);
    }
  };

  public getDepartmentById = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (!role) {
        throw new HttpException(400, "Please Login");
      }
      const department = await this.departmentService.getDepartmentById(
        Number(req.params.id)
      );

      if (!department) {
        const error = new HttpException(
          404,
          `NO department found with id: ${req.params.id}`
        );
        throw error;
      }

      res.status(200).send(department.name);
    } catch (err) {
      next(err);
    }
  };

  public createDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(400, "validation error");
      }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        console.log(errors);
        throw new HttpException(400, "validation error", errors);
      }

      const department = await this.departmentService.createDepartment(
        departmentDto.name
      );
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };

  public updateDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(400, "validation error");
      }
      const departmentDto = plainToInstance(UpdateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        throw new HttpException(400, "validation error", errors);
      }

      const department = await this.departmentService.updateDepartment(
        Number(req.params.id),
        req.body.name
      );
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };

  public deleteDepartment = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;

      if (role !== Role.HR) {
        throw new HttpException(400, "validation error");
      }
      const departmentID = Number(req.params.id);
      if (!Number.isInteger(departmentID)) {
        throw new HttpException(400, "ID is not an integer");
      }
      const department = await this.departmentService.delete(
        Number(req.params.id)
      );
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;
