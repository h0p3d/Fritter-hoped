<template>
  <div id="app" class='horiz-center'>
  <!-- Navbar courtesy of template https://bootstrap-vue.js.org/docs/components/navbar/ -->
  <div class="w-100 fill">
  <b-navbar toggleable="xl" type="dark" variant="info">
    <b-col>
      <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2"  v-model='author' placeholder="Search username"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" v-on:click='authorFreet'>View Author Freets</b-button>
      </b-nav-form>
      </b-col>

      <b-col><b-navbar-brand>{{username}} Fritter</b-navbar-brand></b-col>

     <b-button v-if="buttonLabel" id = "loggingin" v-on:click='showSignin'> {{buttonLabel}} </b-button>
     
  </b-navbar>
  </div>

<b-row>
    <!-- Rest of Components -->
    <b-container class="bv-example-row">
  <b-row>
    
    <!-- Column 1 followers -->
    <b-col>Following / Followers
      <b-row>     
        <FollowUser/>
      </b-row>

    </b-col>
   

    <!-- Column 2 Freet View -->
    <b-col>
      <b-row>
      <b-col>
      Freet View
      <b-button-group>
        <b-button v-on:click="getAllFreet"> View All Freets </b-button>
        <b-button v-if="currentSession" v-on:click="getFeedFreet"> View Feed </b-button>
        <b-button v-if="currentSession" type="dark" id = "createFreet" v-on:click='createFreet'> Create Freet </b-button>
      </b-button-group>
      
    </b-col>
    </b-row>

      <!-- User Sign in -->
      <b-row>
        <b-col>
        <SignIn/>
      </b-col>
      </b-row>

      <b-row>
        <b-col>
        <CreateFreet/>
      </b-col>
      </b-row>

      <b-row>
        <b-col>
          <FreetShow/>
      </b-col>
      </b-row>

    </b-col>

    <!-- Column 3 User View Stuff -->
    <b-col> User
      <UserManipulation/>
    </b-col>
  </b-row>
</b-container>
    
   
  </div>

  
</template>

<script>
import UserManipulation from "./components/ModifyUser.vue";
import SignIn from "./components/SignInUser.vue"
import FollowUser from "./components/FollowUser.vue"
import CreateFreet from "./components/CreateFreet.vue"
import FreetShow from "./components/FreetShow.vue"
import { eventBus } from "./main";

export default {
  name: "app",
  data() {
    return {
    errors:[],
    column1: "followers",
    column2: "allfreets",
    column3: "create",
    currentSession: false,
    buttonLabel: "Sign In",
    username:"",
    author: "",
    }
  },
  components: {
    UserManipulation,
    SignIn,
    FollowUser,
    CreateFreet,
    FreetShow
  },
  created: function() {
    eventBus.$on("signin-success", res => {
      console.log(res);
      this.currentSession= true;
      this.buttonLabel = "Sign Out";
      this.username = res.username;
    });
  

    eventBus.$on("logout-success", res => {
      this.currentSession= false;
      this.buttonLabel = "Sign In";
      this.username = "";
    });
  },
  methods: {
    showSignin: function() {
      console.log("clicked "+this.currentSession);
      if (this.currentSession){
        console.log("logout show");
        eventBus.$emit('toggle-logout', true);
      }else{
        console.log("log in show");
        eventBus.$emit('toggle-signin', true);
      }
    },
    createFreet: function(){
      console.log("clicked create Freet");
      eventBus.$emit('toggle-create-freet', true);
    },
    getAllFreet: function(){
      console.log("clicked view all Freet");
      eventBus.$emit('all-freet', true);
    },
    getFeedFreet: function(){
      console.log("clicked view all Freet");
      eventBus.$emit('feed-freet', true);
    },
    authorFreet: function(){
      console.log("clicked view all Freet");
      eventBus.$emit('author-freet', this.author);
      this.author = "";
    }
  }
};
</script>

<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-center;
  flex-flow: row wrap;
  width: 100;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightblue;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

.component {
  background-color: whitesmoke;
  padding: 1rem;
}
</style>

<style scoped>
.horiz-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
