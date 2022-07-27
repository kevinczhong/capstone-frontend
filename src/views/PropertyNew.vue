<script>
import axios from "axios";

export default {
  data: function () {
    return {
      properties: [],
      newPropParams: {},
      newImageParams: {},
      errors: [],
    };
  },
  created: function () {
    this.indexProperties();
  },
  methods: {
    finish: function () {
      this.$router.push("/properties/");
    },
    indexProperties: function () {
      axios.get("/properties.json").then((response) => {
        console.log(response.data);
        this.properties = response.data;
      });
    },
    submit: function () {
      axios
        .post("/properties.json", this.newPropParams)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("flashMessage", "Listing Successfully Created");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
    submitImage: function () {
      var last = Math.max.apply(
        Math,
        this.properties.map(function (property) {
          return property.id;
        })
      );
      this.newImageParams.property_id = last + 1;
      axios
        .post("/images.json", this.newImageParams)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("flashMessage", "Image Successfully Uploaded");
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
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>

<template>
  <div class="signup container">
    <div class="row">
      <div class="col-sm-12">
        <div class="title-box-d section-t4">
          <h3 class="title-d">Create A New Listing</h3>
        </div>
      </div>
    </div>
    <div>
      <label>Is this property for sale or for rent?</label>
      <p>
        <button v-on:click="isSale()" class="btn btn-primary">This property is for sale</button>
        |
        <button v-on:click="isRent()" class="btn btn-primary">This property is for rent</button>
      </p>
    </div>
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
      <!-- <p>
        <label>Balconies:</label>
        <input type="text" v-model.number="newPropParams.balconies" />
      </p> -->
      <!-- <p>
        <label>Floors:</label>
        <input type="text" v-model.number="newPropParams.floors" />
      </p> -->
      <!-- <p>
        <label>Year Built:</label>
        <input type="text" v-model.number="newPropParams.year_built" />
      </p> -->
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
        <input type="text" v-model="newPropParams.lease_type" />
      </p>
      <p>
        <label>Is this property pet-friendly?</label>
      </p>

      <p>
        <button v-on:click="petFriendly()" class="btn btn-primary">Yes</button>
        |
        <button v-on:click="notPetFriendly()" class="btn btn-primary">No</button>
      </p>
    </div>
    <p>
      <label>Are you satisfied with your listing information?</label>
    </p>
    <button v-on:click="submit()" class="btn btn-primary">Yes</button>
    <div class="row">
      <div class="col-sm-12">
        <div class="title-box-d section-t4">
          <h3 class="title-d">Upload Images</h3>
        </div>
      </div>
    </div>
    <div>
      <p>
        <label>Enter Image URLs Here:</label>
        <input type="text" v-model="newImageParams.image_url" />
        |
        <button v-on:click="submitImage()" class="btn btn-primary">Upload</button>
      </p>
    </div>
    <div>
      <p>
        <button v-on:click="finish()" class="btn btn-primary">Finish</button>
      </p>
    </div>

    <!-- <form v-on:submit.prevent="submit()">
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
          <input type="text" v-model="newPropParams.lease_type" />
        </p>
        <p>
          <label>Is this property pet-friendly?</label>
        </p>

        <p>
          <button v-on:click="petFriendly()">Yes</button>
          <button v-on:click="notPetFriendly()">No</button>
        </p>
      </div>
      <p>
        <label>Are you satisfied with your listing information?</label>
      </p> -->

    <!-- <p>
        <button v-on:click="newPropParams.user_id = getUserId()">Confirm</button>
      </p> -->
    <!-- <input type="submit" value="Submit" /> -->
    <!-- </form> -->
  </div>
</template>
