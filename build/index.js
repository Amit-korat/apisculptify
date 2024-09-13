#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_init_1 = require("./project-init");
const rest_api_generate_1 = require("./rest-api-generate");
const args = process.argv;
console.log(args);
if (args.length == 3) {
    args[2] = args[2].toLowerCase();
}
if (args.length == 3 &&
    (args[2] == "--generate:api" ||
        args[2] == "-g:api" ||
        args[2] == "generate:api")) {
    (0, rest_api_generate_1.bootstrap)();
}
else if (args.length == 3 &&
    (args[2] == "--new" || args[2] == "-n" || args[2] == "new")) {
    (0, project_init_1.init)();
}
else if (args[2] == "-help" || args[2] == "-h") {
    console.log(`apisculptify [spec..]

Create your CRUD api with apisculptify

Commands
  apisculptify --new | -n |new                                  To initialize your CRUD api stucture                   
  apisculptify --generate:api | -g:api | generate:api           To create Controllers and Service[make sure to privide models in your dictory /src/model folder ]
  apisculptify -help | -h                                       To identify commands and rules

Rules & Behavior
    - model names shold be in lowerCase
    - append .model.ts after your model name (e.x. [model-name].model.ts)
    -separate your word in your model name with only "-"(desh)
     `);
}
else {
    console.log(`apisculptify [spec..]

Create your CRUD api with apisculptify

Commands
  apisculptify --new | -n |new                                  To initialize your CRUD api stucture                   
  apisculptify --generate:api | -g:api | generate:api           To create Controllers and Service[make sure to privide models in your dictory /src/model folder ]
  apisculptify -help | -h                                       To identify commands and rules

Rules & Behavior
    - model names shold be in lowerCase
    - append .model.ts after your model name (e.x. [model-name].model.ts)
    -separate your word in your model name with only "-"(desh)
     `);
}
