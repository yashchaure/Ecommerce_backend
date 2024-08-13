const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    res.status(502).json({ message: error.message });
  });
};

export default asyncHandler;
