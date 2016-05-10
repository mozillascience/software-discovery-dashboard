export default function serverError(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.stack);
}
