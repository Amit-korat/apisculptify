import { Project, SourceFile } from "ts-morph";
import fs, { writeFileSync } from "fs";
import path from "path";

const inquirer = require("inquirer");
inquirer.registerPrompt("directory", require("inquirer-select-directory"));
export function bootstrap() {
    -inquirer
        .prompt([
            {
                type: "directory",
                name: "path",
                message: "Navigate to your initialized directory`s src folder?",
                options: {
                    displayFiles: false,
                },
                basePath: process.cwd(),
            },
        ])
        .then(async function (data: any) {
            let selectedpath = data.path;
            await run(selectedpath);
        });
}

async function run(selectedpath: string) {
    const project = new Project();
    let sources = [];

    sources.push(selectedpath + "/model/*.model.ts");

    const sourceFiles = project.addSourceFilesAtPaths(sources);

    let classMap = await createClassMap(sourceFiles);

    var lastIndexBuild = __dirname.lastIndexOf("build");
    var basePath = path.resolve(__dirname.substring(0, lastIndexBuild));
    for (let key of classMap.keys()) {
        let keywords = {
            MODEL_NAME: key,
            MODEL_NAME_WITHOUT_KEY: key.replace(/Model$/, ""),
            MODEL_NAME_WITH_DASH: convertWithDash(key.toString()),
            MODEL_NAME_WITHOUT_KEY_LOWER: key
                .replace(/Model$/, "")
                .toLowerCase(),
            DYNAMIC_IMPORTS: "",
            ENRICH: "",
        };
        console.log(key + " processed");
        generateController(keywords, selectedpath, basePath);
        generateRouter(keywords, selectedpath, basePath);
        generateService(keywords, classMap.get(key), selectedpath, basePath);
    }
}

function generateController(
    keywords: any,
    selectedpath: string,
    basePath: string
) {
    let template = fs
        .readFileSync(basePath + "/templates/generic.controller.txt")
        .toString();
    template = replaceVariable(template, keywords);
    writeFile(
        template,
        selectedpath + "/controllers/",
        keywords.MODEL_NAME_WITH_DASH + ".controller.ts"
    );
}
function generateRouter(keywords: any, selectedpath: string, basePath: string) {
    let template = fs
        .readFileSync(basePath + "/templates/generic.router.txt")
        .toString();
    template = replaceVariable(template, keywords);
    writeFile(
        template,
        selectedpath + "/router/",
        keywords.MODEL_NAME_WITH_DASH + ".router.ts"
    );
}

function generateService(
    keywords: any,
    properties: any,
    selectedpath: string,
    basePath: string
) {
    for (let prop of properties) {
        if (prop.isForeignKey) {
            keywords.DYNAMIC_IMPORTS =
                keywords.DYNAMIC_IMPORTS +
                `\nimport { ${prop.type.replace(
                    /Model$/,
                    ""
                )}Service } from "./${convertWithDash(prop.type)}.service";`;

            keywords.ENRICH =
                keywords.ENRICH +
                `\nif (model.${prop.property} && model.${prop.property}.uid) {
                    const ${prop.property} = await  ${prop.type.replace(
                    /Model$/,
                    ""
                )}Service.getByUid(model.${prop.property}.uid)
                    if (!${prop.property}) {
                       throw new Error("${prop.property} not found");
                    }
                    model.${prop.property} = ${prop.property}
                   }`;
        }
    }

    let template = fs
        .readFileSync(basePath + "/templates/generic.service.txt")
        .toString();
    template = replaceVariable(template, keywords);
    writeFile(
        template,
        selectedpath + "/service/",
        keywords.MODEL_NAME_WITH_DASH + ".service.ts"
    );
}

function writeFile(template: string, destination: string, fileName: string) {
    writeFileSync(destination + fileName, template);
}

function replaceVariable(template: string, keywords: any): string {
    for (let key in keywords) {
        template = template.replaceAll(`[[${key}]]`, keywords[key]);
    }
    return template;
}

function convertWithDash(input: string): string {
    let trimWord = input.replace(/Model$/, "");
    return trimWord.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

async function createClassMap(
    sourceFiles: SourceFile[]
): Promise<Map<any, any>> {
    let classMap = new Map();
    for (let sourceFile of sourceFiles) {
        let className = sourceFile.getClasses()[0].getName();
        let properties = [];
        if (!classMap.has(className)) {
            for (let prop of sourceFile.getClasses()[0].getProperties()) {
                var newObj = {
                    property: prop.getName(),
                    type: "",
                    isForeignKey: false,
                };
                if (prop.getType().getText().includes(".")) {
                    const importStatement = prop.getType().getText();
                    const lastDotIndex = importStatement.lastIndexOf(".");
                    const lastSubstring = importStatement.substring(
                        lastDotIndex + 1
                    );
                    newObj.type = lastSubstring;
                } else {
                    newObj.type = prop.getType().getText();
                }
                properties.push(newObj);
            }
            classMap.set(className, properties);
        }
    }
    for (let key of classMap.keys()) {
        for (let prop of classMap.get(key)) {
            if (classMap.has(prop.type)) {
                prop.isForeignKey = true;
            }
        }
    }
    return classMap;
}
