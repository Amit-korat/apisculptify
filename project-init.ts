
import fs, { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { createSpinner } from 'nanospinner';
import path from "path";


const inquirer = require('inquirer');

inquirer.registerPrompt('directory', require('inquirer-select-directory'));
export function init() {

    inquirer.prompt([{
        type: 'directory',
        name: 'path',
        message: 'Where you like to make project directory(folder)?',
        options: {
            displayFiles: false
        },
        basePath: process.cwd()
    }]).then(async function (data: any) {
        let dirPath = data.path;
        getProjectName(dirPath);
    });
}

function getProjectName(dirPath: string) {
    inquirer.registerPrompt('directory', require('inquirer-select-directory'));
    inquirer.prompt([{
        type: 'input',
        name: 'dir',
        message: 'What is Your Project Name?',
        options: {
            displayFiles: false
        },

    }]).then(async function (data: any) {
        let dirName = data.dir;
        intializeProject(dirName, dirPath)
    });
}

function intializeProject(dirName: string, dirPath: string) {
    let destinationPath = dirPath + "/" + dirName
    console.log(destinationPath)
    var lastIndexBuild = __dirname.lastIndexOf("build");
    var basePath = path.resolve(__dirname.substring(0, lastIndexBuild))

    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath)
    }
    if (!fs.existsSync(destinationPath + "/src")) {
        fs.mkdirSync(destinationPath + "/src")
    }
    if (!fs.existsSync(destinationPath + "/src/model")) {
        fs.mkdirSync(destinationPath + "/src/model")
    }
    if (!fs.existsSync(destinationPath + "/src/controllers")) {
        fs.mkdirSync(destinationPath + "/src/controllers")
    }
    if (!fs.existsSync(destinationPath + "/src/router")) {
        fs.mkdirSync(destinationPath + "/src/router")
    }
    if (!fs.existsSync(destinationPath + "/src/service")) {
        fs.mkdirSync(destinationPath + "/src/service")
    }
    if (!fs.existsSync(destinationPath + "/src/db")) {
        fs.mkdirSync(destinationPath + "/src/db")
    }
    if (!fs.existsSync(destinationPath + "/src/util")) {
        fs.mkdirSync(destinationPath + "/src/util")
    }

    let templateTsoa = readFileSync(basePath + "/templates/generic.tsoa.txt").toString()
    writeFileSync(destinationPath + "/tsoa.json", templateTsoa)


    let templateIndex = readFileSync(basePath + "/templates/generic.index.txt").toString()
    writeFileSync(destinationPath + "/src/app.ts", templateIndex)


    let templateDb = readFileSync(basePath + "/templates/generic.db.config.txt").toString()
    writeFileSync(destinationPath + "/src/db/db.config.ts", templateDb)


    let templateBase = readFileSync(basePath + "/templates/generic.base-entity.model.txt").toString()
    writeFileSync(destinationPath + "/src/util/base-entity.model.ts", templateBase)



    let templateError = readFileSync(basePath + "/templates/generic.error-result.txt").toString()
    writeFileSync(destinationPath + "/src/util/error-result.ts", templateError)


    let templateSearch = readFileSync(basePath + "/templates/generic.search-result.txt").toString()
    writeFileSync(destinationPath + "/src/util/search-result.ts", templateSearch)


    let templateUtils = readFileSync(basePath + "/templates/generic.utils.txt").toString()
    writeFileSync(destinationPath + "/src/util/utils.ts", templateUtils)

    let templatePackage = readFileSync(basePath + "/templates/generic.package.txt").toString()
    writeFileSync(destinationPath + "/package.json", templatePackage)

    let templateTsCongig = readFileSync(basePath + "/templates/generic.tsconfig.txt").toString()
    writeFileSync(destinationPath + "/tsconfig.json", templateTsCongig)

    const spinner = createSpinner('running npm install....').start();
    execSync(`cd "${destinationPath}" && npm i`);
    spinner.success({ text: `execution complete` })
}