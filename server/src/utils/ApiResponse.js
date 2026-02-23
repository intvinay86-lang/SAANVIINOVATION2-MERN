class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.success = true;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }

  send(res) {
    const response = {
      success: this.success,
      message: this.message,
    };

    if (this.data !== null) {
      response.data = this.data;
    }

    return res.status(this.statusCode).json(response);
  }
}

export default ApiResponse;
