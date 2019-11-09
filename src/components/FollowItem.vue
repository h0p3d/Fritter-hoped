<template>
  <div class="follow-list-item">
    {{ follow.user }} 
    <b-button v-on:click="removeItem" size="sm">X</b-button>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";



export default {
  name: "FollowItem",

  props: {
    follow: Object
  },
  data() {
    console.log(follow);
    return {
      user:follow.user,
      removeFollow:follow.removeFollow,
    };
  },
  methods: {
    removeItem: function() {
      console.log(this.follow);
      eventBus.$emit("remove-follow", this.follow);
    }
  }
};
</script>
