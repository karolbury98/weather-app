<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <form @submit.prevent="addCity()">
          <input type="text" v-model="inputValue" placeholder="Add new place" />
          <button type="submit" class="btn btn-success">Add city</button>
        </form>
      </div>
    </div>

    <div class="row title">
      <div class="col-lg-4 col-md-12">
        <h2>Weather Forecast</h2>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div
        class="card col-lg-4 col-md-6 col-12"
        v-for="city in cities"
        :key="city.id"
      >
        <div class="card-body"><router-link :to="`/city/${city.id}`">{{ city.name }}</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { CityService } from "@/services/CityService";
import { ResultService } from "@/services/ResultService";
import axios from "axios";
import json from "../json/city.list.json";

//  przyklad polaczenia api
// https://api.openweathermap.org/data/2.5/weather?id=759734&units=metric&appid=55e5032c4098f9c1de2776417bfcf1c3
export default {
  name: "HomePage",
  data() {
    return {
      cities: [],
      errorMessage: null,
      myJson: json,
      api_url: "https://api.openweathermap.org/data/2.5",
      api_key: "55e5032c4098f9c1de2776417bfcf1c3",
      city: {
        name: "",
        id: "",
      },
      results: [],
      date: null
    };
  },
  async created() {
    try {
      let res = await CityService.getAllCities();
      this.cities = res.data;
    } catch (error) {
      this.errorMessage = error;
    }

    this.currentDate();
 
  },
  mounted() {
     //gets current weather every 1 minute
    this.interval = setInterval(
      this.getCurrentWeatherForAllCitiesFromList,
      60000
    );
  },
  methods: {
    currentDate() {
      const current = new Date();
      this.date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return this.date;
    },
    async addCity() {
      try {
        let result = this.myJson.filter((x) => x.name === this.inputValue);
        console.log(result);
        if (result.length > 0) {
          let res = await CityService.createCity({
            name: this.inputValue,
            id: result[0].id,
          });
          if (res) {
            console.log(result);
            console.log("city added id " + result[0].id); //some cities have few records on the same city so I get only first id
            this.inputValue = "";

            try {
              let res = await CityService.getAllCities();
              this.cities = res.data;
            } catch (error) {
              this.errorMessage = error;
            }
          }
        } else {
          console.log("we do not have this city on the list");
          alert("Sorry, We do not have this city on the list.");
        }
      } catch (error) {
        console.log(error);
      }
    },
    getCurrentWeather(id) {
      axios
        .get(
          `${this.api_url}/weather?id=${id}&units=metric&appid=${this.api_key}`
        )
        .then((res) => {
          console.log(res.data);
          this.results.push({
            cityId: id,
            humidity: res.data.main.humidity,
            temp: res.data.main.temp,
            date: this.date
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCurrentWeatherForAllCitiesFromList() {
      for (let i = 0; i < this.cities.length; i++) {
        this.getCurrentWeather(this.cities[i].id);

        let res = await ResultService.addResult(this.results[i]);
        if (res) {
          console.log(res.data); 
        } else {
          console.log("getCurrentWeatherForAllCitiesFromList problem");
        }
      }

      this.results = [];
    },
  },
};
</script>


<style scoped>
.title {
  margin-top: 5%;
}

.card {
  background: -webkit-linear-gradient(
    90deg,
    hsla(217, 100%, 50%, 1) 0%,
    rgb(57, 200, 216) 100%
  );
  border: 1px black;
  border-radius: 15%;
  font-size: 25px;
  text-align: center;
  margin: 1%;
  height: 100px;
  width: 250px;
  display: flex;
}

button {
  margin: auto;
}

a {
  text-decoration: none;
  color: black;
}

input {
  background-color: #afe4ed;
}
</style>
