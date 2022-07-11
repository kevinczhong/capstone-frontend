<script>
import axios from "axios";

export default {
  data: function () {
    return {
      tour: [],
    };
  },
  created: function () {
    axios.get("/tours/" + this.$route.params.id + ".json").then((response) => {
      this.tour = response.data;
    });
  },
  methods: {
    deleteTour: function () {
      axios.delete("/tours/" + this.$route.params.id + ".json").then((response) => {
        console.log("Successfully Deleted", response.data);
        localStorage.setItem("flashMessage", "Tour Unscheduled");
        this.$router.push("/tours/");
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
  <div class="home container">
    <!-- <router-link to="/posts/">Back to all posts</router-link>
    <p><router-link v-bind:to="`/posts/${post.id}/edit`">Edit post</router-link></p> -->
    <h2>You have a tour at:</h2>
    <h3>{{ tour.property.address }} at {{ formattingDate(tour.time) }}</h3>
    <div v-if="getUserId() == tour.buyer_id">
      <h2>Your Contact:</h2>
      <h3>{{ tour.seller.username }}</h3>
      <h3>{{ tour.seller.email }}</h3>
      <h3>{{ tour.seller.phone_number }}</h3>
      <button v-on:click="deleteTour">Unschedule This Tour</button>
    </div>
    <div v-if="getUserId() == tour.seller_id">
      <h2>Your Contact:</h2>
      <h3>{{ tour.buyer.username }}</h3>
      <h3>{{ tour.buyer.email }}</h3>
      <h3>{{ tour.buyer.phone_number }}</h3>
      <button v-on:click="deleteTour">Unschedule This Tour</button>
    </div>
    <p><button v-on:click="$router.push('/tours/')">Return to Tours</button></p>
    <!-- <div v-if="getUserId() == tour.buyer.id">
      <button v-on:click="deleteTour">Unschedule This Tour</button>
    </div> -->
  </div>
</template>

<style></style>
