<template>
  <div class="box">
  <b-card bg-variant="dark" text-variant="white">
    <b-card-text text-variant="info"> {{freet.author}}</b-card-text>
    <b-card-text text-variant="info"> {{freet.id}}   {{freet.time}} </b-card-text>
    <b-card-text size="sm"> {{freet.message}}</b-card-text>
    <bcard-text v-if="this.freet.refreet"> Refreet ' {{freet.refreet}}'</bcard-text>
    <b-card-text> Upvotes: {{freet.upvotes}} Downvotes: {{freet.downvotes}}</b-card-text>

    <div v-if="this.freet.ownFreet">
    <b-button v-on:click="removeItem" size="sm">X</b-button>
    <b-button v-on:click="editItem" size="sm">edit</b-button>
    </div>
    <div v-if="!this.freet.ownFreet && this.freet.user !== ''">
      <b-button v-on:click="refreetItem" size="sm">Refreet</b-button>
      <b-button v-if="this.freet.hasUpvote" v-on:click="unvoteFreet" bg-variant="success" size="l">Up</b-button>
      <b-button v-else v-on:click="upvoteFreet" size="sm">Up</b-button>
      <b-button v-if="this.freet.hasDownvote" v-on:click="unvoteFreet" bg-variant="danger" size="l">Down</b-button>
      <b-button v-else v-on:click="downvoteFreet" size="sm">Down</b-button>
      
    </div>

    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";



export default {
  name: "FreetItem",

  props: {
    freet: Object
  },
  data() {

    return {
      user:this.freet.user,
      author: this.freet.author,
      time: this.freet.time,
      id: this.freet.id,
      removeFollow:this.freet.removeFollow,
    };
  },
  methods: {
    removeItem: function() {
      console.log("remove " + this.freet);
      eventBus.$emit("remove-freet", this.freet);
    },
    editItem: function() {
      console.log("edit " + this.freet);
      eventBus.$emit("edit-freet", this.freet);
    },
  refreetItem: function(){
    console.log("refreet " + this.freet);
    eventBus.$emit("refreet-freet", this.freet);
  }, 
  unvoteFreet: function(){
    console.log("vote " + this.freet);
    eventBus.$emit("unvote-freet", this.freet);
  },
  upvoteFreet: function(){
    console.log("upvote " + this.freet+ " true");
    eventBus.$emit("vote-freet", this.freet, true);
  },
  downvoteFreet: function(){
    console.log("downvote " + this.freet+ " false");
    eventBus.$emit("vote-freet", this.freet, false);
  },
}


};
</script>
