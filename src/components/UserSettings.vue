<template>
  <div id="user-settings" class="component">
    <div v-if="isSignedIn">
      <SignOut/>
    </div>
    <div v-else>
      <SignIn/>
    </div>
  </div>
</template>

<script>
import SignIn from "./SignIn.vue";
import SignOut from "./SignOut.vue";
import { eventBus } from "../main";

export default {
  name: "UserSettings",

  components: {
    SignIn,
    SignOut
  },

  data() {
    return {
      isSignedIn: false
    };
  },

  created: function() {
    eventBus.$on("signin-success", () => {
      this.isSignedIn = true;
    });
    
    eventBus.$on("signout-success", () => {
      this.isSignedIn = false;
    });
  }
};
</script>

<style scoped>
#user-settings {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

#user-settings > * {
  margin: 0.5rem;
}
</style>