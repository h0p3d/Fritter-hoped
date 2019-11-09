<template>
  <div class="form-group">
  <b-button-group>
        <b-button id = "createU" v-on:click='showCreate' > Create User </b-button>
        <b-button id = "deleteU" v-on:click='showDelete'> Delete User </b-button>
        <b-button id = "editU" v-on:click='showEdit'> Edit User </b-button>
  </b-button-group>

    <div v-if="errors.length" id="deliver-message" >
      <h3>Message:</h3>  
         <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
    </h3>
    </div>

  <b-form v-if="create" id="create-user"  v-on:submit.prevent="createUser"  method="post">
    <h3>Create User</h3>

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

    <b-button type="submit" value = 'Create User'>Submit</b-button>
  </b-form>

  <div v-if="edit" id="edit-user">
    <h3>Edit Username:</h3>
      <input id='username' v-model ='username' placeholder="Enter new username" type='text' name='username'>
    <input type='submit' v-on:click="editUsername" value='Change Username' method='put'>

    <h3>Edit Password:</h3>
      <input id='password' v-model ='password' placeholder="Enter new password" type='text' name='username'>
    <input type='submit' v-on:click="editPassword" value='Change Password' method='put'>
  </div>

  <div v-if="deletes">
    <h3> Are you sure you want to delete your account? </h3>
    <b-button-group>
        <b-button id = "deletes" v-on:click='deleteUser' variant='danger' method = 'delete'> Yes, delete my account. </b-button>
        <b-button id = "cancels" v-on:click='cancelAction'> Cancel </b-button>
    </b-button-group>
  </div>

  
</div>


</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "UserManipulation",

  data() {
    return {
      errors: [],
      username: "",
      password: "",
      deletes: false,
      create: false,
      edit: false,
      
    }
  },
  methods: {
    showCreate: function() {
      console.log("show create? " + this.create);
      this.create = !this.create;
    },
    showEdit: function() {
     console.log("show edit?");
      this.edit = !this.edit;
    },
    showDelete: function() {
     console.log("show delete?");
      this.deletes = !this.deletes;
    },
    createUser: function() {
      const bodyContent = { username: this.username, password: this.password };
        axios.post("/users/create", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('create-success', true);
            this.errors.push("User "+ this.username + " successfully created account!");
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
      this.edit = false;
      this.deletes = false;
      this.clearMessages();
    },
    deleteUser: function() {
      const bodyContent = {  };
       axios.delete('/users/delete', bodyContent).then(() => {
            // handle success
            eventBus.$emit('logout-success', true);
            eventBus.$emit('update-follow', true);
            this.errors.push('User '+ this.username + " successfully deleted account!")
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
    editUsername: function() {
      console.log("edit username");
      const bodyContent = { username:this.username, };
       axios.put("/users/edit/username", bodyContent).then(() => {
            // handle success
            eventBus.$emit('logout-success', true);
            eventBus.$emit('update-follow', true);
            this.errors.push('User '+ this.username + " successfully updated username!");
            this.errors.push('Please log in again!');
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

    editPassword: function() {
      console.log("edit password");
      const bodyContent = { password:this.password, };
       axios.put('/users/edit/password', bodyContent).then(() => {
            // handle success
            eventBus.$emit('logout-success', true);
            eventBus.$emit('update-follow', true);
            this.errors.push('User '+ this.username + " successfully updated password!")
            this.errors.push('Please log in again!');
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
      this.username = "";
      this.password = "";
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