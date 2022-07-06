<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
      errorStatus: null,
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("flashMessage", "User Successfully Created");
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.errorStatus = error.response.status;
        });
    },
    isError: function () {
      if (
        this.newUserParams.password?.length < 6 ||
        this.newUserParams.password_confirmation !== this.newUserParams.password ||
        this.newUserParams.name?.length > 20
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<template>
  <div class="signup container">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <img v-if="errorStatus" v-bind:src="`https://http.cat/${errorStatus}`" />
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Username:</label>
        <input type="text" v-model="newUserParams.username" />
        <p v-if="newUserParams.username && newUserParams.username.length <= 20">
          {{ 20 - newUserParams.username.length }} characters remaining
        </p>
        <p v-if="newUserParams.username && newUserParams.username.length > 20">
          You have exceeded the character limit for your username!
        </p>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
        <p v-if="newUserParams.password && newUserParams.password.length < 6">
          Password must be six characters in length or greater
        </p>
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
        <p
          v-if="
            newUserParams.password &&
            newUserParams.password_confirmation &&
            newUserParams.password_confirmation !== newUserParams.password
          "
        >
          Please make sure you are typing in the same password!
        </p>
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" v-model="newUserParams.phone_number" />
      </div>
      <input type="submit" value="Submit" v-bind:disabled="isError()" />
    </form>
  </div>
</template>
