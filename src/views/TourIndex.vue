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
    formattingDate: function (date) {
      const d = new Date(date);
      d.toLocaleString("en-us", {
        weekday: "short", // long, short, narrow
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "long", // numeric, 2-digit, long, short, narrow
        hour: "numeric", // numeric, 2-digit
        minute: "numeric", // numeric, 2-digit
        second: "numeric", // numeric, 2-digit
      });
      return d;
    },
  },
};
</script>

<template>
  <h1>Buyer Tours</h1>
  <div v-for="tour in tours" v-bind:key="tour.id">
    <div v-if="getUserId() == tour.buyer.id">
      <p>{{ tour.property.address }}</p>
      <p>{{ formattingDate(tour.time) }}</p>
      <button v-on:click="$router.push(`/tours/${tour.id}`)" class="btn-btn-primary">More Details</button>
    </div>
  </div>
  <h1>Seller Tours</h1>
  <div v-for="tour in tours" v-bind:key="tour.id">
    <div v-if="getUserId() == tour.seller.id">
      <p>{{ tour.property.address }}</p>
      <p>{{ formattingDate(tour.time) }}</p>
      <button v-on:click="$router.push(`/tours/${tour.id}`)" class="btn-btn-primary">More Details</button>
    </div>
  </div>
</template>
