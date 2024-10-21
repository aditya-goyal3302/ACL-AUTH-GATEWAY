const { unauthorized } = require("../libs/error");
const { user_repository } = require("../repositories");

exports.get_all_user_for_admin = async (req) => {
  const { } = req.query;
  const response = await user_repository.findAll({ order: "DESC", limit, offset });
  response.password = undefined
  return response
}

exports.get_user_data = async req => {
  const { user_id } = req.body.user;
  const response = await user_repository.findUser({ criteria: { uuid: user_id } });
  if (!response) new unauthorized("User not found");
  delete response.password;
  delete response.role_id;
  delete response.id;
  response.role_data = { ...response.role_data.toJSON(), access: undefined, id: undefined };
  return response;
}

exports.patch_user_details = async ({
  user: { user_id },
  name,
  phone_no,
  email,
  pincode,
  address,
  city,
  country,
  state,
  fax,
}) => {
  const response = await user_repository.update({
    criteria: { uuid: user_id },
    payload: { name, phone_no, email, pincode, address, city, country, state, fax },
    options: { returning: true, plain: true },
  });
  if (!response[1]) new unauthorized("User not found");
  const user = response[1];
  delete user.password;
  delete user.role_id;
  delete user.id;
  return user;
};

exports.set_user_inactive = async req => {
  const { user } = req.body;
  const { user_id } = user;
  const response = await user_repository.update({
    criteria: { uuid: user_id },
    payload: { status: "inactive" },
    options: { returning: true, plain: true },
  });
  if (!response[1]) new unauthorized("User not found");

  delete response[1].password;
  delete response[1].role_id;
  delete response[1].id;
  return response[1];
};

exports.set_user_active = async req => {
  const { user: { user_id } } = req.body;
  const response = await user_repository.update({
    criteria: { uuid: user_id },
    payload: { status: "active" },
    options: { returning: true, plain: true },
  });
  if (!response[1]) new unauthorized("User not found");

  response.password = undefined;
  delete response[1].role_id;
  delete response[1].id;
  return response[1];
};

exports.set_user_image = async req => {
  const { user_id } = req.body.user;
  const { image } = req.files;
  const response = await user_repository.update({
    criteria: { uuid: user_id },
    payload: { image: image[0].destination + image[0].filename },
    options: { returning: true, plain: true }
  });
  if (!response[1]) new unauthorized("User not found");

  delete response[1].password;
  delete response[1].role_id;
  delete response[1].id;
  return response[1];
};

exports.delete_user_image = async req => {
  const { user_id } = req.body.user;
  const response = await user_repository.update({
    criteria: { uuid: user_id },
    payload: { image: null },
    options: { returning: true, plain: true }
  });
  if (!response[1]) new unauthorized("User not found");

  delete response[1].password;
  delete response[1].role_id;
  delete response[1].id;
  return response[1];
};
