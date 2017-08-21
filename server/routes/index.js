const fs = require('fs');
const path = require('path');

/**
 *getRouteFiles
 * @param dir
 * @param routeFiles
 * @returns {Array}
 */
function getRouteFiles(dir, routeFiles = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const currentFile = path.join(dir, file);
        const stat = fs.statSync(currentFile);
        let currentPath = dir;
        if (stat.isDirectory()) {
            currentPath = path.join(dir, file);
            getRouteFiles(currentPath, routeFiles);
        } else if (stat.isFile()) {
            const routeFile = path.join(currentPath, file);
            routeFiles.push(routeFile);
        }
    });
    return routeFiles;
}

module.exports = (app) => {
    const files = getRouteFiles(`${__dirname}/main`);

    files.forEach((file) => {
        require(file)(app);
    });
};
