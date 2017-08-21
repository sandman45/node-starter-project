
const routes = require('../../routes/routes');

const tagsRoles = {
    Admin: {
        POST: [
            routes.login,
        ],
        GET: [
            routes.home,
            routes.test,
            routes.test2,
            routes.test3,
            routes.test4,
        ],
    },
};

module.exports = tagsRoles;
