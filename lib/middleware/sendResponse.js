export default function sendResponse(req, res, next) {
  if (req.articlesToSend) {
    res.send(req.articlesToSend);
  } else {
    next();
  }
}
