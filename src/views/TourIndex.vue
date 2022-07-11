<script>
import axios from "axios";

export default {
  data: function () {
    return {
      tours: [],
    };
  },
  created: function () {
    this.indexTours();
  },
  methods: {
    indexTours: function () {
      axios.get("/tours.json").then((response) => {
        this.tours = response.data;
      });
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

<template>
  <h1>Buyer Tours</h1>
  <div v-for="tour in tours" v-bind:key="tour.id">
    <div v-if="getUserId() == tour.buyer.id">
      <p>{{ tour.property.address }}</p>
      <p>{{ tour.time }}</p>
    </div>
  </div>
  <h1>Seller Tours</h1>
  <div v-for="tour in tours" v-bind:key="tour.id">
    <div v-if="getUserId() == tour.seller.id">
      <p>{{ tour.property.address }}</p>
      <p>{{ tour.time }}</p>
    </div>
  </div>
</template>
