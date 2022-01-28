class Request {
  constructor() {
    this.API_URL = "http://localhost:3000";
  }

  async post(
    url,
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) {
    const ENDPOINT = this.API_URL + url;
    const apiResponse = await fetch(ENDPOINT, options);
    const result = await apiResponse.json();

    return {
      ...result,
      status: apiResponse.status,
    };
  }

  async get(
    url,
    options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) {
    try {
      const ENDPOINT = this.API_URL + url;
      const apiResponse = await fetch(ENDPOINT, options);
      const result = await apiResponse.json();

      return {
        ...result,
        status: apiResponse.status,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new Request();
