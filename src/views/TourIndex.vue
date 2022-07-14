<script>
import axios from "axios";
var moment = require("moment"); // require
moment().format();

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
      var d = new Date(date);
      d = moment(d).format("llll");
      return d;
    },
  },
};
</script>

<template>
  <div class="home container">
    <div class="row">
      <div class="col-sm-12">
        <div class="title-box-d section-t4">
          <h3 class="title-d">Your Tours</h3>
        </div>
      </div>
    </div>
    <div class="col-sm-6" v-for="tour in tours" v-bind:key="tour.id">
      <div class="card" v-if="getUserId() == tour.buyer.id">
        <div class="card-body">
          <h5 class="card-title">{{ tour.property.address }}</h5>
          <p class="card-text">{{ formattingDate(tour.time) }}</p>
          <a v-on:click="$router.push(`/tours/${tour.id}`)" class="btn btn-primary">More Details</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="title-box-d section-t4">
          <h3 class="title-d">Upcoming Tours on Your Listings</h3>
        </div>
      </div>
    </div>
    <div class="col-sm-6" v-for="tour in tours" v-bind:key="tour.id">
      <div class="card" v-if="getUserId() == tour.seller.id">
        <div class="card-body">
          <h5 class="card-title">{{ tour.property.address }}</h5>
          <p class="card-text">{{ formattingDate(tour.time) }}</p>
          <a v-on:click="$router.push(`/tours/${tour.id}`)" class="btn btn-primary">More Details</a>
        </div>
      </div>
    </div>
    <!-- <h1>Buyer Tours</h1>
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
  </div> -->
  </div>
</template>
