const fs = require('fs');
const path = require('path');

/**
 * getSqlFiles
 * @param dir
 * @param sqlFiles
 * @returns {Array}
 */
function getSqlFiles(dir, sqlFiles = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const currentFile = path.join(dir, file);
        const stat = fs.statSync(currentFile);
        let currentPath = dir;
        if (stat.isDirectory()) {
            currentPath = path.join(dir, file);
            getSqlFiles(currentPath, sqlFiles);
        } else if (stat.isFile()) {
            const sqlFile = path.join(currentPath, file);
            sqlFiles.push({ name: file, path: sqlFile });
        }
    });
    return sqlFiles;
}
/**
 * load
 * @param dir
 * @returns {{}}
 */
function load(dir) {
    const queries = {};
    const SQL_DIR = `${process.cwd()}${dir}`;
    const files = getSqlFiles(SQL_DIR);
    files.forEach((file) => {
        if ((file.name.indexOf('.sql') !== -1) || (file.name.indexOf('.SQL') !== -1)) {
        // Convert to camelCase
            const queryName = file.name.split('.')[0].replace(/((\-|\_)[a-z0-9])/g, $1 => $1.toUpperCase().replace($1[0], ''));
            queries[queryName] = fs.readFileSync(file.path, 'utf8');
        }
    });
    return queries;
}

module.exports = {
    load,
};
