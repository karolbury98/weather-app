import axios from "axios";

export class ResultService {
  static serverUrl = "http://localhost:9000";

  static getAllResults() {
    let url = `${this.serverUrl}/results`;
    return axios.get(url);
  }

  static addResult(result) {
    let url = `${this.serverUrl}/results/`;
    return axios.post(url, result);
  }

  static getResultsByCityId(cityId) {
    let url = `${this.serverUrl}/results?cityId=${cityId}`;
    return axios.get(url);
  }
}
