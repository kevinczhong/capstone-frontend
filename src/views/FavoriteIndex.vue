<script>
import axios from "axios";

export default {
  data: function () {
    return {
      favorites: [],
    };
  },
  created: function () {
    this.indexFavorites();
  },
  methods: {
    indexFavorites: function () {
      axios.get("/favorites.json").then((response) => {
        this.favorites = response.data;
        console.log(response.data);
      });
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    deleteFavorite: function (favorite) {
      axios.delete("/favorites/" + favorite.id + ".json").then((response) => {
        console.log("Successfully Deleted", response.data);
      });
    },
  },
};
</script>

<template>
  <div class="home container">
    <div class="row">
      <div class="col-sm-12">
        <div class="title-box-d section-t4">
          <h3 class="title-d">Your Favorite Listings</h3>
        </div>
      </div>
    </div>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <div v-if="getUserId() == favorite.user.id">
        <h3>{{ favorite.property.address }}</h3>
        <button v-on:click="$router.push(`/properties/${favorite.property.id}`)" class="btn btn-primary">
          More Details
        </button>
        |
        <button v-on:click="deleteFavorite(favorite)" class="btn btn-primary">Remove this Favorite</button>
      </div>
    </div>
    <!-- <div v-for="tour in tours" v-bind:key="tour.id">
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
