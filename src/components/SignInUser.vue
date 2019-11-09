<template>
  <div class="form-group">

  	<div v-if="errors.length" id="deliver-message" >
      <h3>Message:</h3>  
         <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
    </h3>
    </div>

	<b-form v-if="loggingIn" id="login-user"  v-on:submit.prevent="signInUser"  method="post">
	    <h3>User Login</h3>

	    <b-form-group id="username" label="Username:" label-for="username">
	        <b-form-input
	          id="username"
	          v-model="username"
	          required
	          placeholder="Enter username"
	        ></b-form-input>
	    </b-form-group>
	    <b-form-group id="password" label="Password:" label-for="password">
	        <b-form-input
	          id="password"
	          v-model="password"
	          required
	          placeholder="Enter password"
	        ></b-form-input>
	    </b-form-group>

	    <b-button type="submit" value = 'Signin User'>Submit</b-button>
	</b-form>

	<div v-if="loggingOut">
    <h3> Are you sure you want to log out of your account? </h3>
    <b-button-group>
        <b-button id = "deletes" v-on:click='logOutUser' method = 'post'> Yes </b-button>
        <b-button id = "cancels" v-on:click='cancelAction'> No </b-button>
    </b-button-group>
  </div>

</div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignIn",
  data() {
  	return {
	    errors:[],
	    loggingIn: false,
	    loggingOut: false,
	    username: "",
	    password: "",
	    
	}
   },
   created: function() {
   	eventBus.$on("toggle-signin", res => {
      this.loadLogin();
    });

    eventBus.$on("toggle-logout", res => {
      this.loadLogout();
    });
   },
   methods: {
   	loadLogin: function(){
   		this.loggingIn = !this.loggingIn;
   	},
   	loadLogout: function(){
   		this.loggingOut = !this.loggingOut;
   	},
    signInUser: function() {
      this.errors = []
      const bodyContent = { username: this.username, password: this.password };
        axios.post("/users/logging/in", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('signin-success', bodyContent);
            this.errors.push("User "+ this.username + " successfully logged in!");
            this.loggingIn = false;
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.status);
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },
    logOutUser: function() {
      const bodyContent = {  };
        axios.post("/users/logging/out", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('logout-success', true);
            eventBus.$emit('update-follow', true);
            this.errors.push("User "+ this.username + " successfully logged out!");
            this.loggingOut = false;
          })
          .catch(err => {
            // handle error
            this.errors.push(err.response.status);
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },
    cancelAction: function(){
      this.errors.push("Action Canceled...");
      this.loggingOut = false;
      this.clearMessages();
    },

    resetForm: function() {
      this.username = "";
      this.password = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    },
  }
};
</script>

<style scoped>
.form-group {
  display: flex;
  align-items: flex-start;
  justify-content: flex-center;
  flex-flow: row wrap;
  background-color: gray;
  width: 100;
}

label {
  margin-right: 0.5rem;
}

form {
  width: fit-content;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>