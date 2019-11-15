class APIHandler {
  constructor(baseUrl) {
    this.service = axios.create({
      baseURL: baseUrl
    });
  }
}
