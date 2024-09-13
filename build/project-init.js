"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const fs_1 = __importStar(require("fs"));
const child_process_1 = require("child_process");
const nanospinner_1 = require("nanospinner");
const path_1 = __importDefault(require("path"));
const inquirer = require('inquirer');
inquirer.registerPrompt('directory', require('inquirer-select-directory'));
function init() {
    inquirer.prompt([{
            type: 'directory',
            name: 'path',
            message: 'Where you like to make project directory(folder)?',
            options: {
                displayFiles: false
            },
            basePath: process.cwd()
        }]).then(async function (data) {
        let dirPath = data.path;
        getProjectName(dirPath);
    });
}
function getProjectName(dirPath) {
    inquirer.registerPrompt('directory', require('inquirer-select-directory'));
    inquirer.prompt([{
            type: 'input',
            name: 'dir',
            message: 'What is Your Project Name?',
            options: {
                displayFiles: false
            },
        }]).then(async function (data) {
        let dirName = data.dir;
        intializeProject(dirName, dirPath);
    });
}
function intializeProject(dirName, dirPath) {
    let destinationPath = dirPath + "/" + dirName;
    console.log(destinationPath);
    var lastIndexBuild = __dirname.lastIndexOf("build");
    var basePath = path_1.default.resolve(__dirname.substring(0, lastIndexBuild));
    if (!fs_1.default.existsSync(destinationPath)) {
        fs_1.default.mkdirSync(destinationPath);
    }
    if (!fs_1.default.existsSync(destinationPath + "/src")) {
        fs_1.default.mkdirSync(destinationPath + "/src");
    }
    if (!fs_1.default.existsSync(destinationPath + "/src/model")) {
        fs_1.default.mkdirSync(destinationPath + "/src/model");
    }
    if (!fs_1.default.existsSync(destinationPath + "/src/controllers")) {
        fs_1.default.mkdirSync(destinationPath + "/src/controllers");
    }
    if (!fs_1.default.existsSync(destinationPath + "/src/router")) {
        fs_1.default.mkdirSync(destinationPath + "/src/router");
    }
    if (!fs_1.default.existsSync(destinationPath + "/src/service")) {
        fs_1.default.mkdirSync(destinationPath + "/src/service");
    }
    if (!fs_1.default.existsSync(destinationPath + "/src/db")) {
        fs_1.default.mkdirSync(destinationPath + "/src/db");
    }
    if (!fs_1.default.existsSync(destinationPath + "/src/util")) {
        fs_1.default.mkdirSync(destinationPath + "/src/util");
    }
    let templateTsoa = (0, fs_1.readFileSync)(basePath + "/templates/generic.tsoa.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/tsoa.json", templateTsoa);
    let templateIndex = (0, fs_1.readFileSync)(basePath + "/templates/generic.index.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/src/app.ts", templateIndex);
    let templateDb = (0, fs_1.readFileSync)(basePath + "/templates/generic.db.config.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/src/db/db.config.ts", templateDb);
    let templateBase = (0, fs_1.readFileSync)(basePath + "/templates/generic.base-entity.model.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/src/util/base-entity.model.ts", templateBase);
    let templateError = (0, fs_1.readFileSync)(basePath + "/templates/generic.error-result.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/src/util/error-result.ts", templateError);
    let templateSearch = (0, fs_1.readFileSync)(basePath + "/templates/generic.search-result.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/src/util/search-result.ts", templateSearch);
    let templateUtils = (0, fs_1.readFileSync)(basePath + "/templates/generic.utils.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/src/util/utils.ts", templateUtils);
    let templatePackage = (0, fs_1.readFileSync)(basePath + "/templates/generic.package.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/package.json", templatePackage);
    let templateTsCongig = (0, fs_1.readFileSync)(basePath + "/templates/generic.tsconfig.txt").toString();
    (0, fs_1.writeFileSync)(destinationPath + "/tsconfig.json", templateTsCongig);
    const spinner = (0, nanospinner_1.createSpinner)('running npm install....').start();
    (0, child_process_1.execSync)(`cd "${destinationPath}" && npm i`);
    spinner.success({ text: `execution complete` });
}
