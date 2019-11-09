<template>
  <div class="form-group">
  <div v-if="errors.length" id="deliver-message" >
      <h3>Message:</h3>  
         <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
    </h3>
  </div>

  <div v-if="freetRemove">
    <h3> Are you sure you want to remove {{freetToRemove}}? </h3>
    <b-button-group>
        <b-button id = "deletes" v-on:click='removeFreet' variant='danger' method = 'delete'> Yes </b-button>
        <b-button id = "cancels" v-on:click='cancelAction'> Cancel </b-button>
    </b-button-group>
  </div>

  <div v-if="freetEdit">
    <b-card id="edit-freet" title="Edit Freet:">
    <b-form-textarea
            id="content-freet"
            v-model="editContent"
            required
            placeholder="..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
      <b-button-group>
         <b-button v-on:click="editFreet" value = 'Edit Freet'>Submit</b-button>
         <b-button v-on:click="cancelAction" value = 'Cancel'>Cancel</b-button>
      </b-button-group>
    </b-card>
  </div>

  <div v-if="viewRefreet">
    <b-card id="refreet-freet" title="Refreet Freet:">
    <b-form-textarea
            id="content-freet"
            v-model="refreetContent"
            required
            placeholder="..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
      <b-button-group>
         <b-button v-on:click="refreetFreet" value = 'Refreet Freet'>Submit</b-button>
         <b-button v-on:click="cancelAction" value = 'Cancel'>Cancel</b-button>
      </b-button-group>
    </b-card>
  </div>


  <div v-if="viewAll || viewFeed || viewUser !=='' " class="box">
    <FreetItem
          v-for="freet in freets"
          v-bind:freet="freet"
          v-bind:key="freet.id"
        />
    </b-card-text>
  </b-card>
  </div>

  </div>

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import FreetItem from "./FreetItem";

export default {
  name: "FreetShow",
  components: { FreetItem },
  data() {
    return {
      errors: [],
      freets: [],
      user: "",
      followers: [],
      freetRemove: false,
      freetToRemove: undefined,
      freetEdit: false,
      freetToEdit: undefined,
      editContent: "",
      viewUser:"",
      viewAll: false,
      viewFeed: false,
      viewRefreet: false,
      refreetId: undefined,
      refreetContent: "",
      
    }
  },created: function() {
    eventBus.$on("update-freet", res => {
      console.log("update-freet");
      this.getFreets();
    });

    eventBus.$on("remove-freet", item => {
      console.log(item);
      this.freetToRemove = item.id;
      this.freetRemove = true;
    });

    eventBus.$on("edit-freet", item => {
      console.log(item);
      this.freetToEdit = item.id;
      this.freetEdit = true;
    });

    eventBus.$on("all-freet", item => {
      console.log(this.viewAll);
      this.viewAll = !this.viewAll;
      this.getFreets();
    });

    eventBus.$on("feed-freet", item => {
      console.log(this.viewFeed);
      this.viewFeed = !this.viewFeed;
      this.getFreets();
    });

    eventBus.$on("author-freet", item => {
      console.log(this.viewUser +" "+item);
      this.viewUser = item;
      this.getFreets();
    });

    eventBus.$on("refreet-freet", (item) => {
      this.viewRefreet = !this.viewRefreet;
      console.log(item);
      this.refreetId = item.id;
    });

    eventBus.$on("unvote-freet", (item) => {
      console.log(item);
      this.unvote(item.id);
    });

    eventBus.$on("vote-freet", (item, isUpvote) => {
      this.vote(item.id, isUpvote);
      console.log(item);
    });
  
  }, mounted: function() {
    this.getFreets();
  },

  methods: {
    getFreets: function() {
      console.log("get freets ");
      const bodyContent = { username: this.viewUser };
      if (this.viewAll){
        axios.get("/freets/all", bodyContent)
            .then(res => {
              console.log("got all freets");
              if (res.status === 200){ // success! get All freets
                this.freets = res.data.freets;
                this.user = res.data.user;
                this.updateFreets();
              }else{ //handle error
                this.errors.push(err.response.status);
                this.errors.push(err.response.data.error);
              }
            }).catch(err => { console.log(err); }).then(() => {
              // always executed
              this.resetForm();
              this.clearMessages();
            });
        }
        if (this.viewFeed){
        axios.get("/users/view/feed", {})
            .then(res => {
              console.log("got all freets");
               if (res.status === 200){ // success! get All freets
                this.freets = res.data.freets;
                this.user = res.data.user;
                this.updateFreets();
              }else{ //handle error
                this.errors.push(err.response.status);
                this.errors.push(err.response.data.error);
              }
            }).catch(err => { console.log(err); }).then(() => {
              // always executed
              this.resetForm();
              this.clearMessages();
            });
        } if (this.viewUser !== ''){
           axios.get("/freets/display/"+this.viewUser, {})
            .then(res => {
              console.log("got " + this.viewUser+" freets");
                if (res.status === 200){ // success! get All freets
                this.freets = res.data.freets;
                this.user = res.data.user;
                this.updateFreets();
              }else{ //handle error
                this.errors.push(err.response.status);
                this.errors.push(err.response.data.error);
              }
            }).catch(err => { console.log(err); }).then(() => {
              // always executed
              this.resetForm();
              this.clearMessages();
            });
        }
    },
    updateFreets: function(){
      //update freets based off of user data
        for (var i = 0; i < this.freets.length; i++) {
          let freet = this.freets[i];
          freet.user = this.user;
          if (this.user !== ""){
            freet.ownFreet = this.user.username === freet.author;
            freet.hasUpvote = this.user.upvotes.includes(freet.id);
            freet.hasDownvote = this.user.downvotes.includes(freet.id);
          }else{
            freet.ownFreet =  false;
            freet.hasUpvote =  false;
            freet.hasDownvote = false;
          }
        }
        console.log("new freets");
        console.log(this.freets);

    },
    removeFreet: function() {
      const bodyContent = { };
        axios.delete("/freets/delete/"+this.freetToRemove, bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('update-freet', true);
            this.errors.push("User successfully deleted freet " + this.freetToRemove+"!");
            this.freetToRemove = undefined;
            this.freetRemove= false;
          }).catch(err => { // handle error
            this.errors.push(err.response.status);
            this.errors.push(err.response.data.error);
          }).then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },
     editFreet: function() {
      console.log("edit freet " + this.freetToEdit + " content: "+this.editContent);
      const body = { id: this.freetToEdit, content: this.editContent };
        axios.put("/freets/edit", body)
          .then(() => {
            // handle success
            console.log("success!");
            eventBus.$emit('update-freet', true);
            this.errors.push("User successfully edited freet " + this.freetToEdit+"!");
            this.freetToEdit= undefined;
            this.freetEdit= false;
          }).catch(err => {// handle error
            this.errors.push(err.response.status);
            this.errors.push(err.response.data.error);
          }).then(() => {   // always executed
            this.resetForm();
            this.clearMessages();
          });
    },
    refreetFreet: function() {
      console.log(this.refreetId);
      this.errors = []
      const bodyContent = { content: this.refreetContent, id:this.refreetId };
        axios.post("/freets/create", bodyContent)
          .then(() => {
            // handle success
            console.log("made freet: " + this.content );
            this.errors.push("User successfully made new freet!");
            this.refreetFreet= false;
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
    unvote: function(id){
      console.log(id)
      this.errors = []
      const bodyContent = { id:id };
        axios.put("/freets/vote/remove", bodyContent)
          .then(() => {
            // handle success
            this.errors.push("User successfully unvoted!");
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
    vote: function(id, isUpvote){
      let command = isUpvote? "up":"down";
      this.errors = []
      const bodyContent = { id:id };
     
        axios.put("/freets/vote/"+command, bodyContent)
          .then(() => {
            // handle success
            this.errors.push("User successfully voted!");
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
    resetForm: function() {
      this.editContent = "";
      this.refreetContent = "";
    },
    cancelAction: function(){
      this.errors.push("Action Canceled...");
      this.freetToRemove = undefined;
      this.freetRemove= false;
      this.freetToEdit= undefined;
      this.freetEdit= false;
      this.viewRefreet = false;
      this.refreetId = undefined;
      this.resetForm();
      this.clearMessages();
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
}

</script>

<style scoped>
.box {
  display: flex;
  align-items: flex-start;
  justify-content: flex-center;
  flex-flow: row wrap;
  background-color: gray;
  width: 100;
}

</style>