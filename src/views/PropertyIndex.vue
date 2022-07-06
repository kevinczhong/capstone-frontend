<script>
import axios from "axios";

export default {
  data: function () {
    return {
      properties: [],
      titleFilter: "",
    };
  },
  created: function () {
    this.indexProperties();
  },
  methods: {
    indexProperties: function () {
      axios.get("/properties.json").then((response) => {
        console.log(response.data);
        this.properties = response.data;
      });
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    // filterPosts: function () {
    //   return this.properties.filter((post) => {
    //     var lowerTitle = post.title.toLowerCase();
    //     var lowerTitleFilter = this.titleFilter.toLowerCase();
    //     return lowerTitle.includes(lowerTitleFilter);
    //   });
    // },
    // sortByTitle: function () {
    //   this.posts.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    // },
  },
};
</script>

<template>
  <div class="home container">
    <h1>Property Listings</h1>
    <!-- <p>
      Search by title:
      <input type="text" v-model="titleFilter" list="titles" />
      <datalist id="titles">
        <option v-for="property in properties" v-bind:key="property.id">{{ property.address }}</option>
      </datalist> -->
    <!-- <button v-on:click="sortByTitle()">Sort By Title</button> -->
    <!-- </p> -->
    <div class="row">
      <transition-group
        appear
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div class="col-sm-6" v-for="property in properties" v-bind:key="property.id">
          <div class="card">
            <div class="card-body">
              <img v-bind:src="property.image" class="card-img-top" v-bind:alt="property.address" />
              <h5 class="card-title">{{ property.address }}</h5>
              <p class="card-text">{{ property.floor_space }}</p>
              <a v-on:click="$router.push(`/properties/${property.id}`)" class="btn btn-primary">More Details</a>
              <p v-if="getUserId() == property.user_id">Your Property</p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <!-- <div v-for="property in properties" v-bind:key="property.id">
      <h2>{{ property.address }}</h2> -->
    <!-- <img v-bind:src="post.image" v-bind:alt="post.title" /> -->
    <!-- <p>{{ property.floor_space }} sq. ft</p>
      <p>${{ property.listed_price }}</p> -->
    <!-- <router-link v-bind:to="`/posts/${post.id}`">More Details</router-link>
      <button v-on:click="$router.push(`/posts/${post.id}`)">More Details</button> -->
    <!-- </div> -->
  </div>
</template>

<style></style>
