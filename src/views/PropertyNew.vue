<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newPropParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/properties", this.newPropParams)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("flashMessage", "Listing Successfully Created");
          this.$router.push("/properties/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
    isSale: function () {
      this.newPropParams.is_rent = false;
      console.log("This works");
    },
    isRent: function () {
      this.newPropParams.is_rent = true;
      console.log("This works");
    },
    petFriendly: function () {
      this.newPropParams.pet_friendly = true;
    },
    notPetFriendly: function () {
      this.newPropParams.pet_friendly = false;
    },
  },
};
</script>

<template>
  <div class="signup container">
    <form v-on:submit.prevent="submit()">
      <h1>Create a listing</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <p><label>Description:</label></p>
        <p>
          <textarea v-model="newPropParams.description"></textarea>
        </p>
        <p>
          <label>Address:</label>
          <input type="text" v-model="newPropParams.address" />
        </p>
        <p>
          <label>Floor Space:</label>
          <input type="text" v-model.number="newPropParams.floor_space" />
        </p>
        <p>
          <label>Bedrooms:</label>
          <input type="text" v-model.number="newPropParams.bedrooms" />
        </p>
        <p>
          <label>Bathrooms:</label>
          <input type="text" v-model.number="newPropParams.bathrooms" />
        </p>
        <p>
          <label>Balconies:</label>
          <input type="text" v-model.number="newPropParams.balconies" />
        </p>
        <p>
          <label>Floors:</label>
          <input type="text" v-model.number="newPropParams.floors" />
        </p>
        <p>
          <label>Year Built:</label>
          <input type="text" v-model.number="newPropParams.year_built" />
        </p>
      </div>
      <div>
        <label>Is this property for sale or for rent?</label>
        <p>
          <button v-on:click="isSale()">This property is for sale</button>
          <button v-on:click="isRent()">This property is for rent</button>
        </p>
      </div>
      <div v-if="newPropParams.is_rent === false">
        <label>Listing Price:</label>
        <input type="text" v-model.number="newPropParams.listed_price" />
      </div>
      <div v-if="newPropParams.is_rent === true">
        <p>
          <label>Monthly Rent:</label>
          <input type="text" v-model.number="newPropParams.rent" />
        </p>
        <p>
          <label>Lease Type:</label>
          <input type="text" v-model="newPropParams.rent" />
        </p>
        <p>
          <label>Is this property pet-friendly?</label>
        </p>

        <p>
          <button v-on:click="petFriendly()">Yes</button>
          <button v-on:click="notPetFriendly()">No</button>
        </p>
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
