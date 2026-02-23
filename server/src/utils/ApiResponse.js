class ApiResponse {
  constructor(statusCode, message = null, data = null) {
    this.statusCode = statusCode;
    this.success = true;
    if (message !== null) {
      this.message = message;
    }
    if (data !== null) {
      this.data = data;
    }
  }
}

export default ApiResponse;
