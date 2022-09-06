<template>
  <h2>{{ name }}</h2>
  <div class="container">
    <div class="row mt-3">
      <div class="col">
        <router-link to="/" class="btn btn-success">Back</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <canvas id="myChart" width="300" height="150"></canvas>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Humidity</th>
              <th scope="col">Temperature</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index">
              <td>{{ result.date }}</td>
              <td>{{ result.humidity }}</td>
              <td>{{ result.temp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { CityService } from "@/services/CityService";
import { ResultService } from "@/services/ResultService";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      cityId: this.$route.params.cityId,
      name: "",
      results: [],
    };
  },
  async created() {
    try {
      let res = await CityService.getCity(this.cityId);
      this.city = res.data;
      this.name = res.data.name;

      this.getResultsByCityId(this.cityId);
    } catch (error) {
      this.errorMessage = error;
    }
  },
  mounted() {},
  methods: {
    async getResultsByCityId(cityId) {
      try {
        let res = await ResultService.getResultsByCityId(cityId);
        this.results = res.data;
      } catch (error) {
        this.errorMessage = error;
      }
      console.log(this.results);

      let plotData = [];
      for (let i = 0; i < this.results.length; i++) {
        plotData.push({ x: this.results[i].date, y: this.results[i].temp });
      }
      console.log(plotData);
      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: plotData.x,
          datasets: [
            {
              label: "Temperature",
              data: plotData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      myChart;
    },
  },
};
</script>

<style scoped>
</style>