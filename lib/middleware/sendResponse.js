export default function sendResponse(req, res, next) {
  if (req.articlesToSend) {
    res.send({
      parsedArticles: req.articlesToSend,
      responseHeader: {
        lastPage: req.lastPage,
        currentPage: req.page,
      },
    });
  } else {
    next();
  }
}
