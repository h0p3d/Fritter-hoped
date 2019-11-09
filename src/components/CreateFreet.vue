<template>
  <div class="form-group">

  	<div v-if="errors.length" id="deliver-message" >
      <h3>Message:</h3>  
         <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
    </h3>
    </div>

  <b-card v-if="create" id="create-freet" title="Create Freet:" bg-variant="dark" text-variant="white">
    <b-form-textarea
            id="content-freet"
            v-model="content"
            required
            placeholder="..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
      <b-button-group>
         <b-button v-on:click="makeFreet" value = 'Make Freet'>Submit</b-button>
         <b-button v-on:click="cancelAction" value = 'Cancel Freet'>Cancel</b-button>
      </b-button-group>
  </b-card>
	

</div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "CreateFreet",
  data() {
  	return {
	    errors:[],
	    create: false,
	    content: "",
	    
	}
   },
   created: function() {
   	eventBus.$on("toggle-create-freet", res => {
       this.loadCreate();
    });
   },
   methods: {
    loadCreate: function(){
      console.log("toggle-create-freet "+this.create);
      this.create = !this.create;
    },
    makeFreet: function() {
      console.log("making a freet and I'm confused");
      this.errors = []
      const bodyContent = { content: this.content };
        axios.post("/freets/create", bodyContent)
          .then(() => {
            // handle success
            console.log("made freet: " + this.content );
            this.errors.push("User successfully made new freet!");
            this.create= false;
            eventBus.$emit('update-freet', true);
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
      this.create = false;
      this.clearMessages();
    },

    resetForm: function() {
      this.content = "";
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