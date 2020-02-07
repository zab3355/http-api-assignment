const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

/* const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    // connect all pages with json handlers
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
  },
}; */

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  //  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  console.dir(parsedUrl);

  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/styles.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/success':
      jsonHandler.success(request, response, acceptedTypes);
      break;
    case '/badRequest':
      console.dir(`params ${params.valid}`);
      jsonHandler.badRequest(request, response, acceptedTypes, params);
      break;
    case '/unauthorized':
      jsonHandler.unauthorized(request, response, acceptedTypes, params);
      break;
    case '/forbidden':
      jsonHandler.forbidden(request, response, acceptedTypes);
      break;
    case '/internal':
      jsonHandler.forbidden(request, response, acceptedTypes);
      break;
    case '/notImplemented':
      jsonHandler.notImplemented(request, response, acceptedTypes);
      break;
    case '/notFound':
      jsonHandler.notFound(request, response, acceptedTypes);
      break;
    default:
      htmlHandler.getIndex(request, response, acceptedTypes);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
