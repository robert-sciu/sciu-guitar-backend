/**
 * Sends a JSON error response with the specified status code and message.
 *
 * @param {Object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code to be sent.
 * @param {string} message - The error message or object to include in the response.
 * @returns {Object} The response object from the server.
 */
function handleErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ success: false, message: message });
}

/**
 * Handles a successful response by sending a JSON object with a success status
 * and either a message or data property based on the type of the response.
 *
 * @param {Object} res - The response object from the server.
 * @param {number} statusCode - The HTTP status code to send in the response.
 * @param {string|Object} response - The response data to send in the response.
 * @return {Object} The response object from the server.
 */
function handleSuccessResponse(res, statusCode, response) {
  if (typeof response === "string") {
    return res.status(statusCode).json({ success: true, message: response });
  }
  return res.status(statusCode).json({ success: true, data: response });
}

module.exports = {
  handleErrorResponse,
  handleSuccessResponse,
};
