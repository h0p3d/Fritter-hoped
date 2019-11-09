<template>
  <div class="form-group">
  <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" v-model ='user' placeholder="Follow username"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" v-on:click='followUser'>Follow User</b-button>
  </b-nav-form>
  <div v-if="errors.length" id="deliver-message" >
      <h3>Message:</h3>  
         <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
    </h3>
  </div>

  <div v-if="followRemove">
    <h3> Are you sure you want to remove {{followerToRemove}}? </h3>
    <b-button-group>
        <b-button id = "deletes" v-on:click='removeFollow' variant='danger' method = 'delete'> Yes </b-button>
        <b-button id = "cancels" v-on:click='cancelAction'> Cancel </b-button>
    </b-button-group>
  </div>

  <div v-if="followerRemove">
    <h3> Are you sure you want to remove {{followerToRemove}}? </h3>
    <b-button-group>
        <b-button id = "deletes" v-on:click='removeFollower' variant='danger' method = 'delete'> Yes </b-button>
        <b-button id = "cancels" v-on:click='cancelAction'> Cancel </b-button>
    </b-button-group>
  </div>

  <div class="box">
  <b-card title="Following" bg-variant="dark" text-variant="white">
    <b-card-text>
    <FollowItem
          v-for="follow in following"
          v-bind:follow="follow"
          v-bind:key="follow.id"
        />
    </b-card-text>
  </b-card>
  </div>

   <div class="box">
  <b-card title="Followers" bg-variant="dark" text-variant="white">
    <b-card-text>
    <FollowItem
          v-for="follow in followers"
          v-bind:follow="follow"
          v-bind:key="follow.id"
        />
    </b-card-text>
  </b-card>
  </div>

  </div>

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import FollowItem from "./FollowItem";

export default {
  name: "UserManipulation",
  components: { FollowItem },
  data() {
    return {
      errors: [],
      following: [],
      followers: [],
      user: "",
      followRemove: false,
      followerRemove: false,
      followerToRemove: "",
      
    }
  },created: function() {
    eventBus.$on("update-follow", res => {
      console.log("update-follow");
      this.getFollow();
    });

    eventBus.$on("remove-follow", item => {
      console.log(item);
      this.followerToRemove = item.user;
      if (item.removeFollow){
        this.followRemove = true;
      }else{
        this.followerRemove = true;
      }
    });
  
  }, mounted: function() {
    this.getFollow();
  },

  methods: {
    getFollow: function() {
      console.log("get follow ");
      const bodyContent = { username: this.user };
      axios.get("/users/view/follow", bodyContent)
          .then(res => {
  
            if (res.status === 200){ // success! update follow / followers
              
              console.log(this.followers);
              console.log("before " + this.following);
              this.following = res.data.follow.following;
              this.following = this.following.map(function callback(currentValue){
                return{user:currentValue, removeFollow:true}});
              this.followers = res.data.follow.follow;
              this.followers = this.followers.map(function callback(currentValue){
                return{user:currentValue, removeFollow:false}});
              console.log("after "+this.following);
              console.log(this.followers);
            }else{ //handle error
              this.errors.push(err.response.status);
              this.errors.push(err.response.data.error);
            }
            
          }).catch(err => {
            // handle error
            console.log(err);
          }).then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
    },
    followUser: function() {
      const bodyContent = { username: this.user };
        axios.put("/users/follow/add", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('update-follow', true);
            this.errors.push("User successfully followed " + this.user+"!");
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
    removeFollow: function() {
      const bodyContent = { username: this.followerToRemove};
        axios.put("/users/follow/removeFollow", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('update-follow', true);
            this.errors.push("User successfully unfollowed " + this.followerToRemove+"!");
            this.followerToRemove = "";
            this.followRemove= false;
            this.followerRemove= false;
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
    removeFollower: function() {
      const bodyContent = { username: this.followerToRemove };
        axios.put("/users/follow/removeFollower", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('update-follow', true);
            this.errors.push("User successfully removed follower " + this.followerToRemove+"!");
            this.followerToRemove = "";
            this.followRemove= false;
            this.followerRemove= false;
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
      this.user = "";
    },
    cancelAction: function(){
      this.errors.push("Action Canceled...");
      this.followRemove = {}
      this.followRemove= false;
      this.followerRemove= false;
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