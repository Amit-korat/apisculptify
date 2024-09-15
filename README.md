
**Fast, unopinionated, minimalist web back-end tool for [Node.js](http://nodejs.org).**

## Table of contents

* [Installation](#Installation)
* [Quick Start](#Quick-Start)
* [Convention Rules](#Naming-convention-rules-for-models)
* [Examples](#full-model-example-useraddressmodelts)
* [Supported Operators](#Supported-Operators)
* [Automatic Swagger Documentation](#Automatic-Swagger-Documentation)
* [Project Structure](#Project-Structure)
* [Contributing](#Contributing)
* [License](#license)
* [Acknowledgments](#Acknowledgments)

[![NPM Version](https://img.shields.io/badge/npm-v1.0.2-blue)](https://www.npmjs.com/package/apisculptify)
[![NPM Install Size](https://img.shields.io/badge/Install_size-59.8kB-green)](https://www.npmjs.com/package/apisculptify)


# Apisculptify - Automated REST API Generator for TypeORM Models 
Apisculptify is a powerful Node.js tool designed to automate the process of generating RESTful APIs for your TypeORM models. With Apisculptify, you can quickly create a new project, define your TypeORM models, and effortlessly generate CRUD (Create, Read, Update, Delete) APIs for them and also swagger documentation.

## Installation
To use Apisculptify in your Node.js project, you can install it via npm:
```bash
npm install -g apisculptify
```

## Quick Start
Follow the steps below to quick started with Apisculptify:

#### 1. Create a new project using the `apisculptify new` command:

```bash
apisculptify new
```
```bash
apisculptify -n
```
```bash
apisculptify --new
```

#### 2. Apisculptify will ask for folder path up to 'src' directory or folder. you need to choose 'src' directory of you project.

```bash
apisculptify generate:api
```
```bash
apisculptify -g:api
```
```bash
apisculptify --generate:api
```

Apisculptify will automatically scan the `model` folder, detect your TypeORM models, and generate CRUD APIs for each model. The generated APIs will be placed in the `src` folder of your project.
after that you need import routes from controller in `src/app.ts`

### Naming convention rules for models
```
Rules & Behavior
    - model names shold be in lowerCase
    - append .model.ts after your model name (e.x. [model-name].model.ts)
    - your model name may contain more then one word,To separate your word in your model name use "-"(desh) (e.x. user-address.model.ts)
    - and inside model file class name follow title case with model keyword at last(e.x. export class UserAddressModel {...})
```
### Full model example `user.address.model.ts`
```
import { Entity, Column, ManyToOne, JoinColumn, } from "typeorm";
import { BaseEntity } from '../util/base-entity.model'
import { UserModel } from "./user.model";
import { IsInt, IsString, Max, Min } from "class-validator";

@Entity("address")
export class UserAddressModel extends BaseEntity {

    @Column({ name: "pincode", nullable: false })
    @IsInt()
    @Min(99999)
    @Max(999999)
    pincode: number;

    @Column({ name: "city" })
    @IsString()
    city: String;

    @Column({ nullable: false })
    @IsString()
    state: String;

    @IsString()
    @Column({ name: "address" })
    address: string;

    @ManyToOne(type => UserModel, { eager: true })
    @JoinColumn({ name: "user" })
    user: UserModel;
}
```

### Using the `find` Function
The `find` function allows you to retrieve records based on specific criteria by using query parameters. You can apply various filtering and pagination options to tailor your result set.
Here's an example of how to use the `find` function to retrieve a list of users with specific filters:
```http
 GET /user/search?name=John&age=30&isActive=true
```

In this example, the API will return a list of users named "John," aged 30, and who are marked as active.
#### Supported Operators
Apiscuptor supports a range of operators that you can use with the `find` function. These operators enable you to apply specific filtering conditions to your queries. For instance:
* `name:eq=John`: Retrieve records where the "name" attribute is equal to "John".
* `age:gt=25`: Retrieve records where the "age" attribute is greater than 25.* `isActive:eq=true`: Retrieve records where the "isActive" attribute is equal to true.You can combine multiple operators to create complex queries. Additionally, you can filter by parent details by using dot notation. For example:
```http
GET /user/search?department.name:eq=Engineering
```

This query retrieves users who belong to the "Engineering" department.
* you can also pass start and limit in the query string for pagination
```http
GET /user/search?start=0&limit=10
```
* you can also pass sorting details with column name
```http
GET user/search?sort={"firstName":1}
```
* you can perform all of above operation in single request
```http
GET /user/search?sort={"firstName":1}&start=0&limit=10&firstName:lk=venish
```

### Supported Operators
Apiscuptor supports a wide range of operators that can be used in your query parameters to customize your API responses:
* `nt`: Not
* `lt`: LessThan
* `lte`: LessThanOrEqual
* `mt`: MoreThan
* `mte`: MoreThanOrEqual
* `eq`: Equal
* `lk`: Like
* `ilk`: ILike
* `btw`: Between
* `in`: In
* `any`: Any
* `inl`: IsNull
* `ac`: ArrayContains
* `acb`: ArrayContainedBy
* `aol`: ArrayOverlap
* `raw`: Raw

## Automatic Swagger Documentation
Apiscuptor generated project also provides a convenient way to automatically generate Swagger documentation for all your generated API routes. To generate the Swagger documentation, simply run the following command:
```
npm run swagger
```
This command will automatically generate the Swagger documentation based on the routes defined in your generated APIs. You can access the Swagger documentation by navigating to the specified URL in your browser. We have used [tsoa](https://tsoa-community.github.io/docs/getting-started.html). you can use tsoa decorator for your custom api

Swagger UI
Swagger UI provides an interactive and user-friendly interface for exploring and testing your API endpoints. With the automatically generated Swagger documentation, you can easily visualize your API structure, request/response formats, and even execute API calls directly from the Swagger UI interface.

## Project Structure
Apisculptify follows a specific project structure to organize your code effectively. Here's how your project structure should look like:
```go
myproject/
  ├── src/
  │   ├── controllers/
  │   ├── models/
  │   ├── services/
  │   ├── utils/
  │   ├── app.ts
  │   └── ...
  ├── node_modules/
  ├── package.json
  ├── tsconfig.json
  └── ...
```

The `src` folder will contain the generated REST API files for your models.

## Contributing
We welcome contributions from the community! If you find any issues or have ideas for improvements, please open an issue or submit a pull request on the GitHub repository.
## License
Apisculptify is licensed under the MIT License.
## Acknowledgments
We would like to express our gratitude to the TypeORM and Node.js communities for their invaluable contributions, without which this project would not have been possible.
##
Thank you for using Apisculptify! If you encounter any problems or have any questions, don't hesitate to reach out.
### mail: amit.korat@outlook.com
#### Happy coding!

------------------
