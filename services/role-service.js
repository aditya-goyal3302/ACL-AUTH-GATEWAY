const { acl_repository } = require("../repositories");

exports.get_roles = async (req) => {
    const roles = await acl_repository.model.findAll({attributes: ['title', 'uuid']});
    return roles;
}