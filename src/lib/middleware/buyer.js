const isBuyer = (req, res, next) => {
  if (req.user.role !== 'BUYER') {
    return res.status(401).json({
      status: 401,
      message: 'You cannot make this call',
    });
  }
  return next();
};
export default isBuyer;