const UserModel = require('../models/UserModel');
const generateAuthToken = require('../utils/generateAuthToken');
const { comparePassoword } = require('../Utils/hashPassword');
// LoGIN USER
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send('All Inputs are Required');
        }

        const emailExist = await UserModel.findOne({ email });
        if (emailExist && comparePassoword(password, emailExist.password)) {
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            };

            global.encryption_key = generateAuthToken(
                emailExist.name,
                emailExist.email
            );

            return res
                .cookie(
                    'encryption_token',
                    generateAuthToken(emailExist.name, emailExist.email),
                    cookieParams
                )
                .json({
                    success: 'User Logged In',
                    userLoggedIn: {
                        email: emailExist.email,
                        name: emailExist.name
                    },
                    cookie: generateAuthToken(emailExist.name, emailExist.email)
                });
        } else {
            return res.status(401).send('Wrong Credentials');
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    loginUser
};
