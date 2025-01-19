import Joi from 'joi';

const userSignUp = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'author', 'reader').required(),
})

const loginUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$#!%*?&.]{8,40}/
      ),
      {
        name: 'At least one uppercase, one lowercase, one special character, and minimum of 8 and maximum of 40 characters',
      }
    )
    .required(),
})

const validateUserSignup = async (data) => {
  try {
    const { err, value } = await userSignUp.validateAsync(data)
    return { err: err, value }
  } catch (err) {
    return {err};
  }
}

const validateUserLogin = async (data) => {
  try { 
    const { err, value } = await loginUser.validateAsync(data)
    return { err: err, value }
  } catch(err) {
    return { err };
  }
}

export default { validateUserSignup, validateUserLogin };
