<script>
import axios from "axios";

export default {
  data: function () {
    return {
      properties: [],
      listings: [],
    };
  },
  created: function () {
    this.indexProperties();
  },
  computed: {
    saleListings() {
      var listings = this.properties.filter((property) => property.is_rent === false);
      return listings;
    },
    rentListings() {
      var listings = this.properties.filter((property) => property.is_rent === true);
      return listings;
    },
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
    <div class="row">
      <div class="col-sm-12">
        <div class="title-box-d section-t4">
          <h3 class="title-d">Property Listings</h3>
        </div>
      </div>
    </div>
    <p>
      <button v-on:click="listings = saleListings" class="btn btn-primary">For Sale</button>
      |
      <button v-on:click="listings = rentListings" class="btn btn-primary">For Rent</button>
    </p>
    <!-- <p>
      Search by title:
      <input type="text" v-model="titleFilter" list="titles" />
      <datalist id="titles">
        <option v-for="property in properties" v-bind:key="property.id">{{ property.address }}</option>
      </datalist> -->
    <!-- <button v-on:click="sortByTitle()">Sort By Title</button> -->
    <!-- </p> -->

    <!-- ======= Property Grid ======= -->
    <section class="property-grid grid">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="grid-option"></div>
          </div>
          <div class="col-md-12">
            <div class="card-box-a card-shadow" v-for="property in listings" v-bind:key="property.id">
              <div class="img-box-a">
                <img v-bind:src="property.images[0].image_url" v-bind:alt="property.address" class="img-a img-fluid" />
              </div>
              <div class="card-overlay">
                <div class="card-overlay-a-content">
                  <div class="card-header-a">
                    <h2 class="card-title-a">
                      <a href="#">
                        {{ property.address }}
                      </a>
                    </h2>
                  </div>
                  <div class="card-body-a">
                    <div class="price-box d-flex">
                      <span class="price-a" v-if="property.is_rent === false">$ {{ property.listed_price }}</span>
                      <span class="price-a" v-if="property.is_rent === true">$ {{ property.rent }}</span>
                    </div>
                    <button v-on:click="$router.push(`/properties/${property.id}`)" class="btn btn-primary">
                      Click here to view
                      <span class="bi bi-chevron-right"></span>
                    </button>
                  </div>
                  <div class="card-footer-a">
                    <ul class="card-info d-flex justify-content-around">
                      <li>
                        <h4 class="card-info-title">Area</h4>
                        <span>
                          {{ property.floor_space }} ft
                          <sup>2</sup>
                        </span>
                      </li>
                      <li>
                        <h4 class="card-info-title">Beds</h4>
                        <span>{{ property.bedrooms }}</span>
                      </li>
                      <li>
                        <h4 class="card-info-title">Baths</h4>
                        <span>{{ property.bathrooms }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Property Grid Single-->
    <!-- <div class="row">
      <div class="col-sm-6" v-for="property in listings" v-bind:key="property.id">
        <div class="card">
          <div class="card-body">
            <img v-bind:src="property.images[0].image_url" class="card-img-top" v-bind:alt="property.address" />
            <h5 class="card-title">{{ property.address }}</h5>
            <p class="card-text">{{ property.floor_space }} sq. ft</p>
            <button v-on:click="$router.push(`/properties/${property.id}`)" class="btn btn-primary">
              More Details
            </button>
            <p v-if="getUserId() == property.user_id">Your Property</p>
          </div>
        </div>
      </div>
    </div> -->
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
