const isAdmin = (req, res, next) => {
  if (req.user.isAdmin === false) {
    /* istanbul ignore next */
    return res.status(401).json({
      status: 401,
      message: 'You cannot make this call',
    });
  }
  return next();
};
export default isAdmin;
