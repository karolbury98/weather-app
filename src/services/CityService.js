import axios from "axios";

export class CityService {
    static serverUrl = "http://localhost:9000";

    static getAllCities() {
        let url = `${this.serverUrl}/cities`
        return axios.get(url);
    }

    static getCity(cityId) {
        let url = `${this.serverUrl}/cities/${cityId}`;
        return axios.get(url);
    }

    static createCity(city) {
        let url = `${this.serverUrl}/cities/`;
        return axios.post(url, city);
    }
}