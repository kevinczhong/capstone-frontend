<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    localStorage.setItem("flashMessage", "Logout Successful");
    this.$router.push("/");
    console.log("Logged Out!");
  },
};
</script>

<template>
  <div class="logout"></div>
</template>
