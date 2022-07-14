<script>
import axios from "axios";
import VueMeetingSelector from "vue-meeting-selector";
import slotsGenerator from "@/helpers/slotsGenerator";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "SimpleExample",
  components: {
    VueMeetingSelector,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data: function () {
    return {
      property: [],
      data: [],
      assessment: [],
      isLoggedIn: false,
      flashMessage: "",
      errors: [],
      newTourParams: {},
      newFavParams: {},
      date: new Date(),
      meetingsDays: [],
      meeting: null,
      loading: true,
      nbDaysToDisplay: 7,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.flashMessage = localStorage.getItem("flashMessage");
      localStorage.removeItem("flashMessage");
    },
  },
  async created() {
    axios.get("/properties/" + this.$route.params.id + ".json").then((response) => {
      this.property = response.data;
    });
    axios.get("/properties/" + this.$route.params.id + "/data.json").then((response) => {
      this.data = response.data;
      console.log(response.data);
    });
    axios.get("/properties/" + this.$route.params.id + "/assessment.json").then((response) => {
      this.assessment = response.data;
      console.log(response.data);
    });
    const start = {
      hours: 8,
      minutes: 0,
    };
    const end = {
      hours: 16,
      minutes: 0,
    };
    this.meetingsDays = await this.slotsGeneratorAsync(this.date, this.nbDaysToDisplay, start, end, 30);
    this.loading = false;
  },
  computed: {
    classNames() {
      // because of line-height, font-type you might need to change top value
      return {
        tabLoading: "loading-div",
      };
    },
  },
  methods: {
    deleteProperty: function () {
      axios.delete("/properties/" + this.$route.params.id + ".json").then((response) => {
        console.log("Successfully Deleted", response.data);
        localStorage.setItem("flashMessage", "Listing Successfully Deleted");
        this.$router.push("/properties/");
      });
    },
    createFavorite: function () {
      this.newFavParams.user_id = this.getUserId();
      this.newFavParams.property_id = this.property.id;
      axios
        .post("/favorites.json", this.newFavParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
    scheduleTour: function () {
      this.newTourParams.seller_id = this.property.user_id;
      this.newTourParams.property_id = this.property.id;
      this.newTourParams.time = this.meeting.date;
      axios
        .post("/tours.json", this.newTourParams)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("flashMessage", "Tour Successfully Scheduled");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    slotsGeneratorAsync(...args) {
      // juste set async the gettings of meeting to display loading
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(slotsGenerator(...args));
        }, 1000);
      });
    },
    async nextDate() {
      this.loading = true;
      const start = {
        hours: 8,
        minutes: 0,
      };
      const end = {
        hours: 16,
        minutes: 0,
      };
      const date = new Date(this.date);
      const newDate = new Date(date.setDate(date.getDate() + 7));
      this.date = newDate;
      this.meetingsDays = await this.slotsGeneratorAsync(newDate, 7, start, end, 30);
      this.loading = false;
    },
    async previousDate() {
      this.loading = true;
      const start = {
        hours: 8,
        minutes: 0,
      };
      const end = {
        hours: 16,
        minutes: 0,
      };
      // logic to get previous date, don't display date older than today
      const date = new Date(this.date);
      date.setDate(date.getDate() - 7);
      const formatingDate = (dateToFormat) => {
        const d = new Date(dateToFormat);
        const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
        const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
      };
      const newDate = formatingDate(new Date()) >= formatingDate(date) ? new Date() : new Date(date);
      this.date = newDate;
      this.meetingsDays = await this.slotsGeneratorAsync(newDate, this.nbDaysToDisplay, start, end, 30);
      this.loading = false;
    },
  },
};
</script>

<template>
  <section class="intro-single">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-8">
          <div class="title-single-box">
            <h1 class="title-single">{{ property.address }}</h1>
            <div v-if="property.is_rent === false">
              <h2>${{ property.listed_price }}</h2>
              <h3 style="color: grey">Market Estimate: ${{ assessment.bundle[0].zestimate }}</h3>
            </div>
            <div v-if="property.is_rent === true">
              <h2>${{ property.rent }} per month</h2>
              <h3 style="color: grey">Market Estimate: ${{ assessment.bundle[0].rentalZestimate }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="home container">
    <carousel :items-to-show="0.5">
      <slide v-for="image in property.images" :key="image">
        <img v-bind:src="image.image_url" v-bind:alt="property.title" />
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
    <div class="property-summary">
      <div class="row">
        <div class="col-sm-12">
          <div class="title-box-d section-t4">
            <h3 class="title-d">Quick Summary</h3>
          </div>
        </div>
      </div>
      <div class="summary-list">
        <ul class="list">
          <li class="d-flex justify-content-between">
            <strong>Status:</strong>
            <span v-if="property.is_rent == false">Sale</span>
            <span v-if="property.is_rent == true">Rent</span>
          </li>
          <li class="d-flex justify-content-between" v-if="property.is_rent == false">
            <strong>Area:</strong>
            <span>
              {{ data.bundle[0].areas[3].areaSquareFeet }}ft
              <sup>2</sup>
            </span>
          </li>
          <li class="d-flex justify-content-between" v-if="property.is_rent == true">
            <strong>Area:</strong>
            <span>
              {{ property.floor_space }}ft
              <sup>2</sup>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Year Built:</strong>
            <span>{{ data.bundle[0].building[0].yearBuilt }}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Beds:</strong>
            <span>{{ data.bundle[0].building[0].bedrooms }}</span>
          </li>
          <li class="d-flex justify-content-between">
            <strong>Baths:</strong>
            <span>{{ data.bundle[0].building[0].fullBaths }}</span>
          </li>
          <!-- <li class="d-flex justify-content-between">
            <strong>Floors:</strong>
            <span>{{ property.floors }}</span>
          </li> -->
          <li class="d-flex justify-content-between" v-if="property.is_rent == false">
            <strong>Type:</strong>
            <span>{{ data.bundle[0].landUseDescription }}</span>
          </li>
          <li class="d-flex justify-content-between" v-if="property.is_rent == false">
            <strong>Heating:</strong>
            <span>{{ data.bundle[0].building[0].heating }}</span>
          </li>
          <li class="d-flex justify-content-between" v-if="property.is_rent == false">
            <strong>Sewage:</strong>
            <span>{{ data.bundle[0].building[0].sewer }}</span>
          </li>
          <li class="d-flex justify-content-between" v-if="property.is_rent == false">
            <strong>Lot Size:</strong>
            <span>
              {{ data.bundle[0].lotSizeSquareFeet }}ft
              <sup>2</sup>
            </span>
          </li>
          <div v-if="property.is_rent === true">
            <li class="d-flex justify-content-between">
              <strong>Lease Type:</strong>
              <span>{{ property.lease_type }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <strong>Pet Friendly:</strong>
              <span>{{ property.pet_friendly }}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div class="col-md-7 col-lg-7 section-md-t3">
      <div class="row">
        <div class="col-sm-12">
          <div class="title-box-d">
            <h3 class="title-d">Property Description</h3>
          </div>
        </div>
      </div>
      <div class="property-description">
        <p class="description color-text-a">
          {{ property.description }}
        </p>
      </div>
    </div>
    <div class="row section-t3" v-if="getUserId() != null">
      <div class="col-sm-12">
        <div class="title-box-d">
          <h3 class="title-d">Tours</h3>
        </div>
      </div>
    </div>
    <!-- <h1>{{ property.address }}</h1>
    <p>{{ property.description }}</p>
    <div v-if="property.is_rent === false">
      <h1>${{ property.listed_price }}</h1>
    </div>
    <div v-if="property.is_rent === true">
      <h1>${{ property.rent }}</h1>
      <p>{{ property.lease_type }}</p>
      <div v-if="property.pet_friendly === true">This is a pet-friendly property</div>
      <div v-if="property.pet_friendly === false">This is not a pet-friendly property</div>
    </div>
    <p>{{ property.floor_space }} sq. ft</p>
    <p>Bedrooms: {{ property.bedrooms }}</p>
    <p>Bathrooms: {{ property.bathrooms }}</p>
    <p>Balconies: {{ property.balconies }}</p>
    <p>Floors: {{ property.floors }}</p> -->
    <!-- <router-link to="/propertys/">Back to all propertys</router-link>
    <p><router-link v-bind:to="`/propertys/${property.id}/edit`">Edit property</router-link></p> -->
    <!-- <p><button v-on:click="$router.push('/properties/')">Return to Main Page</button></p>
    <div v-if="getUserId() == property.user_id">
      <p><button v-on:click="$router.push(`/properties/${property.id}/edit`)">Edit This Listing</button></p>
      <p><button v-on:click="deleteProperty">Delete This Listing</button></p>
    </div>
    <p><button v-on:click="createFavorite">Favorite This Listing</button></p> -->
  </div>
  <div class="simple-example container" v-if="getUserId() != null">
    <p>
      <vue-meeting-selector
        class="simple-example__meeting-selector"
        v-model="meeting"
        :date="date"
        :loading="loading"
        :class-names="classNames"
        :meetings-days="meetingsDays"
        @next-date="nextDate"
        @previous-date="previousDate"
      />
    </p>
    <!-- <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p> -->
    <div v-if="meeting != null">
      <p>{{ meeting.date }}</p>
      <button v-on:click="scheduleTour()" class="btn btn-primary">Schedule Tour</button>
    </div>
    <div class="row section-t3">
      <div class="col-sm-12">
        <div class="title-box-d">
          <h3 class="title-d">Other Options</h3>
        </div>
      </div>
    </div>
    <p><button v-on:click="$router.push('/properties/')" class="btn btn-primary">Return to Main Page</button></p>
    <div v-if="getUserId() == property.user_id">
      <p>
        <button v-on:click="$router.push(`/properties/${property.id}/edit`)" class="btn btn-primary">
          Edit This Listing
        </button>
      </p>
      <p><button v-on:click="deleteProperty" class="btn btn-primary">Delete This Listing</button></p>
    </div>
    <div v-if="getUserId() != property.user_id">
      <p><button v-on:click="createFavorite" class="btn btn-primary">Favorite This Listing</button></p>
    </div>
  </div>
</template>

<style></style>
