export default class ErrorHandler {
  static validationError(res, result) {
    return res.status(400).json({
      status: 'error',
      error: {
        message: result.error.details[0].message,
      },
    });
  }

  static tryCatchError(res, error) {
    /* istanbul ignore next */
    return res.status(500).json({
      status: 500,
      error,
    });
  }
}
