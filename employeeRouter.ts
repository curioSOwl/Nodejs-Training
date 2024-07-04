// import express from "express";
// import Employee from "./src/entity/employee.entity";
// import dataSource from "./src/db/data-source.db";

// const employeeRouter = express.Router();

// // const employees: Employee[] = [
// //   {
// //     id: 1,
// //     email: "abc@gmail.com",
// //     name: "Emp1",
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //     deletedAt: new Date()
// //   },
// //   {
// //     id: 2,
// //     email: "yes@gmail.com",
// //     name: "Emp2",
// //     createdAt: new Date(),
// //     updatedAt: new Date(),
// //     deletedAt: new Date()
// //   },
// // ];

// employeeRouter.get("/", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employees = await employeeRepository.find();
//   res.status(200).send(employees);
// });

// employeeRouter.get("/:id", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employees = await employeeRepository.findOneBy({
//     id: Number(req.params.id),
//   });
//   res.status(200).send(employees);
// });

// employeeRouter.post("/", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const newEmployee = new Employee();
//   newEmployee.email = req.body.email;
//   newEmployee.name = req.body.name;
//   const savedEmployee = await employeeRepository.save(newEmployee);
//   res.status(200).send(savedEmployee);
// });

// employeeRouter.put("/:id", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employee = await employeeRepository.findOneBy({
//     id: Number(req.params.id),
//   });
//   employee.email = req.body.email;
//   employee.name = req.body.name;
//   const savedEmployee = await employeeRepository.save(employee);
//   res.status(200).send(savedEmployee);
// });

// employeeRouter.delete("/:id", async (req, res) => {
//   const employeeRepository = dataSource.getRepository(Employee);
//   const employee = await employeeRepository.softDelete({
//     id: Number(req.params.id),
//   });
//   res.status(200).send(employee);
// });

// // employeeRouter.get("/:id", (req, res) => {
// //   console.log(req.params["id"]);
// //   const employee = employees.find(
// //     (record) => record.id == Number(req.params.id)
// //   );
// //   res.status(200).send(employee);
// // });

// // employeeRouter.post("/", (req, res) => {
// //   console.log(req.body);
// //   const employee = new Employee();
// //   employee.id = employees.length + 1;
// //   employee.name = req.body.name;
// //   employee.createdAt = new Date();
// //   employee.updatedAt = new Date();
// //   employees.push(employee);
// //   res.status(201).send("post");
// // });

// // employeeRouter.put("/:id", (req, res) => {
// //   const employee = employees.find(
// //     (record) => record.id == Number(req.params.id)
// //   );
// //   employee.name = req.body.name;
// //   employee.email = req.body.email;
// //   employee.updatedAt = new Date();
// //   res.status(200).send(employee);
// // });

// // employeeRouter.delete("/:id", (req, res) => {
// //   console.log(req.url);
// //   const employeeIndex = employees.findIndex(
// //     (record) => record.id == Number(req.params.id)
// //   );
// //   employees.splice(employeeIndex, 1);
// //   res.status(200).send("delete request");
// // });

// export default employeeRouter;
