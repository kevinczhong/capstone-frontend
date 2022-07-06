<script>
import axios from "axios";

export default {
  data: function () {
    return {
      property: [],
    };
  },
  created: function () {
    axios.get("/properties/" + this.$route.params.id + ".json").then((response) => {
      this.property = response.data;
    });
  },
  methods: {
    deleteProperty: function () {
      axios.delete("/properties/" + this.$route.params.id + ".json").then((response) => {
        console.log("Successfully Deleted", response.data);
        localStorage.setItem("flashMessage", "Listing Successfully Deleted");
        this.$router.push("/properties/");
      });
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

<template>
  <div class="home container">
    <h2>{{ property.title }}</h2>
    <img v-bind:src="property.image" v-bind:alt="property.title" />
    <p>{{ property.description }}</p>
    <!-- <router-link to="/propertys/">Back to all propertys</router-link>
    <p><router-link v-bind:to="`/propertys/${property.id}/edit`">Edit property</router-link></p> -->
    <p><button v-on:click="$router.push('/properties/')">Return to Main Page</button></p>
    <div v-if="getUserId() == property.user_id">
      <p><button v-on:click="$router.push(`/properties/${property.id}/edit`)">Edit This Listing</button></p>
      <button v-on:click="deleteProperty">Delete This Listing</button>
    </div>
  </div>
</template>

<style></style>
