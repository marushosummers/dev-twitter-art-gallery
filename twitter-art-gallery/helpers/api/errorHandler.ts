

const errorHandler = (err, res) => {
  if (typeof (err) === 'string') {
    // custom application error
    const is404 = err.toLowerCase().endsWith('not found');
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  if (err.code === 404 || err.status === 404) {
    // custom application error
    return res.status(404).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
}

export default errorHandler;
