<script>
import axios from "axios";

export default {
  data: function () {
    return {
      propParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/properties/" + this.$route.params.id + ".json").then((response) => {
      this.propParams = response.data;
      console.log(response.data);
    });
  },
  methods: {
    submit: function () {
      axios
        .patch("/properties/" + this.$route.params.id + ".json", this.propParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/properties/" + this.$route.params.id);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup container">
    <h1>Edit Listing</h1>
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <div v-if="propParams.is_rent === false">
      <label>New Listing Price:</label>
      <input type="text" v-model.number="propParams.listed_price" />
    </div>
    <div v-if="propParams.is_rent === true">
      <p>
        <label>New Rent:</label>
        <input type="text" v-model.number="propParams.rent" />
      </p>
      <p>
        <label>New Lease Type:</label>
        <input type="text" v-model.number="propParams.lease_type" />
      </p>
    </div>
    <button v-on:click="submit()">Submit</button>
  </div>
</template>
