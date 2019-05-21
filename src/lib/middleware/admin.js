const isAdmin = (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res.status(400).send('You are not an admin');
  }
  return next();
};
export default isAdmin;
