import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import CityDetails from "../components/CityDetails.vue";

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: HomePage,
      },
      {
        path: "/city/:cityId",
        name: "CityDetails",
        component: CityDetails,
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router;
