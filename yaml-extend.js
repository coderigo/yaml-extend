const YAML = require('js-yaml');
const fs = require('fs');
const _ = require('underscore');
const mergeDeep = require('deepmerge');
const path = require('path');

main();

function main() {
    if (process.argv.length !== 3) {
      console.error('yaml-extends takes a single argument: path to file to extend.');
      process.exit(1);
    }

    const opts = { targetFilePath: path.resolve(process.argv[2]) };

    if (!fs.existsSync(opts.targetFilePath)) {
        console.error(`File not found: ${opts.targetFilePath}`);
        process.exit(1);
    }
    if (!opts.targetFilePath.endsWith('.extends.yml')) {
      console.error(
        `File cannot be extended if it does not end in .extends.yml: ${opts.targetFilePath}`
      );
      process.exit(1);
    }

    console.log(`Extending file at ${opts.targetFilePath}`);
    opts.targetFile = path.basename(opts.targetFilePath);
    opts.targetFileDir = path.dirname(opts.targetFilePath);
    opts.extendedFilePath = opts.targetFilePath.replace('.extends.yml', '.yml');

    const json = fillExtends({
        json: load(opts.targetFilePath),
        baseDir: opts.targetFileDir,
    });

    fs.writeFileSync(opts.extendedFilePath, YAML.safeDump(json));
    console.log(`Extended file at ${opts.extendedFilePath}\ndone.`);
}

function fillExtends({ json, baseDir }) {
    for (let [key, value] of Object.entries(json)) {
        if (!_.isObject(value)) {
            json[key] = value;
            continue;
        }

        if (_.isObject(value)) {
            if (!!value.extends) {
                if (!_.isArray(value.extends)) {
                    value.extends = [value.extends];
                }
                value.extends.forEach((extension) => {
                    const extensionFilePath = path.resolve(baseDir, extension);
                    console.log(`Extending from ${extensionFilePath}`);
                    value = mergeDeep(load(extensionFilePath), value);
                });
                delete value['extends'];
            }
            json[key] = fillExtends({ json: value, baseDir });
            if (_.isArray(json[key])) {
                json[key] = json[key].sort();
            }
            continue;
        }
  }
  return json;
}

function load(path) {
    try {
        let yaml = YAML.safeLoad(fs.readFileSync(path, 'utf8'));
        return yaml;
    } catch (error) {
        throw error;
    }
}

