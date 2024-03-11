const User = require('./../models/user-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const errorMessage = (res, message) => {
  res.render('error', {
    title: `${message}`,
  });
};

/**@description: For creating new users */
exports.signUp = async (req, res, next) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      cpassword: cpassword,

      number: number,
    });

    res.render('register', {
      title: `Sign Up Successfully`,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.render('error', {
        title: 'Email already exist. Try another one!',
      });
    } else if (err._message === 'User validation failed') {
      if (String(err.errors.number) === 'Number')
        return errorMessage(res, 'Go back and enter phone number');
      if (String(err.errors.email) === 'Email')
        return errorMessage(res, 'Go back and enter email');
      if (String(err.errors.name) === 'Name')
        return errorMessage(res, 'Go back and enter name');
      if (String(err.errors.cpassword) === 'Password' || 'undefined')
        return errorMessage(res, 'Password are not same');
    } else {
      console.log(err);
      res.render('error', {
        title: 'Something went wrong ',
      });
    }
  }
};

/**@description: For login new users */
exports.getLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const useremail = await User.findOne({ email });
    if (!useremail)
      return res.render('register', {
        title: 'Email not register. Please Sign Up',
      });
    const isPasswordValid = await bcrypt.compare(password, useremail.password);

    const token = jwt.sign({ userId: useremail._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });

    if (email === useremail.email && isPasswordValid) {
      res.render('register', { title: 'Login Success' });
    } else {
      return errorMessage(
        res,
        'Email or password is incorrect!. Please go back and enter correct ceredentials'
      );
    }
  } catch (error) {
    console.log(error);
    res.render('register', { title: 'Something went wrong' });
  }
};
