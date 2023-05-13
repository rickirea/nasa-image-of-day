import axios from "axios";
import { nasaApiKey, nasaApiUrl } from "../config";

class HttpClient {
  constructor() {
    this.nasaApiUrl = nasaApiUrl;
    this.nasaApiKey = nasaApiKey;

    //Path for Nasa Astronomy Picture of the DAY (APOD)
    this.apodAPIPath = "/planetary/apod?";

    this.instance = axios.create({
      baseURL: this.nasaApiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getNasaImageOfDay(queryString) {
    const response = await this.instance.get(
      `${this.apodAPIPath}api_key=${this.nasaApiKey}&${queryString}`
    );

    return response.data;
  }
}

export default HttpClient;
