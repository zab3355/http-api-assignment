const respondType = (request, response, status, content, acceptedTypes) => {
  // adjusted for all types
  if (acceptedTypes[0] === 'text/xml') {
    // if XML response, else JSON response
    const responseXML = 'text/xml';

    response.writeHead(status, { 'Content-Type': acceptedTypes });
    response.write(responseXML);
    response.end();
  } else {
    const objJSON = JSON.stringify(content);
    response.writeHead(status, { 'Content-Type': acceptedTypes });
    response.write(JSON.stringify(objJSON));
    response.end();
  }
};

// respond code behavior
// success
const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };

  // return a passing status code 200
  return respondType(request, response, 200, responseJSON, acceptedTypes[0]);
};

// bad request
const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'successParamsBadRequest',
  };
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    // 400 bad request error
    return respondType(request, response, 400, responseJSON, acceptedTypes[0]);
  }

  // return a passing status code 200
  return respondType(request, response, 200, responseJSON, acceptedTypes[0]);
};

// unauthorized
const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Successful response with parameters.',
    id: 'successParamsUnauthorized',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    // 401 unauthorized access error
    return respondType(request, response, 401, responseJSON, acceptedTypes[0]);
  }
  // if authorized, return this
  return respondType(request, response, 200, responseJSON, acceptedTypes[0]);
};

// forbidden
const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not has access to this content.',
    id: 'forbidden',
  };

  // return a status code of 403
  return respondType(request, response, 403, responseJSON, acceptedTypes[0]);
};

// not Found
const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a status code of 404
  return respondType(request, response, 404, responseJSON, acceptedTypes[0]);
};

// internal
const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  // return a status code of 500
  return respondType(request, response, 500, responseJSON, acceptedTypes[0]);
};

// not Implemented
const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // Not implemented - 501 error
  return respondType(request, response, 501, responseJSON, acceptedTypes[0]);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internal,
  notImplemented,

};
