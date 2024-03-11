/**@description: For getting home page */
exports.getLoginForm = (req, res, next) => {
  res.render('register', { title: 'Fill Form' });
};
