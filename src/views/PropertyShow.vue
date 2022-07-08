<script>
import axios from "axios";
import VueMeetingSelector from "vue-meeting-selector";
import slotsGenerator from "@/helpers/slotsGenerator";

export default {
  name: "SimpleExample",
  components: {
    VueMeetingSelector,
  },
  data: function () {
    return {
      property: [],
      errors: [],
      newTourParams: {},
      date: new Date(),
      meetingsDays: [],
      meeting: null,
      loading: true,
      nbDaysToDisplay: 7,
    };
  },
  async created() {
    axios.get("/properties/" + this.$route.params.id + ".json").then((response) => {
      this.property = response.data;
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
  <div class="home container">
    <h2>{{ property.title }}</h2>
    <img v-bind:src="property.images[0].image_url" v-bind:alt="property.title" />
    <p>{{ property.description }}</p>
    <!-- <router-link to="/propertys/">Back to all propertys</router-link>
    <p><router-link v-bind:to="`/propertys/${property.id}/edit`">Edit property</router-link></p> -->
    <p><button v-on:click="$router.push('/properties/')">Return to Main Page</button></p>
    <div v-if="getUserId() == property.user_id">
      <p><button v-on:click="$router.push(`/properties/${property.id}/edit`)">Edit This Listing</button></p>
      <button v-on:click="deleteProperty">Delete This Listing</button>
    </div>
  </div>
  <div class="simple-example container">
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
    <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p>
    <div v-if="meeting != null">
      <button v-on:click="scheduleTour()">Schedule Tour</button>
    </div>
  </div>
</template>

<style></style>
