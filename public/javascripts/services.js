// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => preParent.classList.remove('flashing'), 300);
}

// Axios responses have a lot of data. This shows only the most relevant data.
function showResponse(axiosResponse) {
  const fullResponse = axiosResponse.response === undefined
    ? axiosResponse
    : axiosResponse.response;
  const abridgedResponse = {
    data: fullResponse.data,
    status: fullResponse.status,
    statusText: fullResponse.statusText,
  };
  showObject(abridgedResponse);
}

// IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE

// EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

/**
 * You can use axios to make API calls like this:
 * const body = { bar: 'baz' };
 * axios.post('/api/foo', body)
 *   .then(showResponse) // on success (Status Code 200)
 *   .catch(showResponse); // on failure (Other Status Code)
 * See https://github.com/axios/axios for more info
 */

// Hint: do not assume a 1:1 mapping between forms and routes

function createUser(fields) {
    axios.post('/users/create', fields)
    .then(showResponse)
    .catch(showResponse);
}

function changeUsername(fields) {
  axios.put('/users/edit/username', fields)
    .then(showResponse)
    .catch(showResponse);
}

function changePassword(fields) {
  axios.put('/users/edit/password', fields)
    .then(showResponse)
    .catch(showResponse);
}

function deleteUser(fields) {
    axios.delete('/users/delete', fields)
    .then(showResponse)
    .catch(showResponse);
}

function signIn(fields) {
  axios.post('/users/logging/in', fields)
    .then(showResponse)
    .catch(showResponse);
}

function signOut(fields) {
  axios.post('/users/logging/out', fields)
    .then(showResponse)
    .catch(showResponse);
}

function viewAllFreets(fields) {
  axios.get('/freets/all', fields)
    .then(showResponse)
    .catch(showResponse);
}

function viewFreetsByAuthor(fields) {
  axios.get('/freets/display/'+fields.author, fields)
    .then(showResponse)
    .catch(showResponse);
}

function createFreet(fields) {
  axios.post('/freets/create', fields)
    .then(showResponse)
    .catch(showResponse);
}

function editFreet(fields) {
  axios.put('/freets/edit/', fields)
    .then(showResponse)
    .catch(showResponse);
}

function upvoteFreet(fields) {
  axios.put('/freets/vote/up', fields)
    .then(showResponse)
    .catch(showResponse);
}

function downvoteFreet(fields) {
  axios.put('/freets/vote/down', fields)
    .then(showResponse)
    .catch(showResponse);
}

function removeVoteFreet(fields) {
  axios.put('/freets/vote/remove', fields)
    .then(showResponse)
    .catch(showResponse);
}

function deleteFreet(fields) {
 axios.delete('/freets/delete/'+fields.id, fields)
    .then(showResponse)
    .catch(showResponse);
}

function viewFeed(fields) {
  axios.get('/users/view/feed', fields)
    .then(showResponse)
    .catch(showResponse);
}

function viewFollow(fields) {
  axios.get('/users/view/follow', fields)
    .then(showResponse)
    .catch(showResponse);
}

function followUser(fields) {
  axios.put('/users/follow/add', fields)
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  axios.put('/users/follow/removeFollow', fields)
    .then(showResponse)
    .catch(showResponse);
}

function unfollowerUser(fields) {
  axios.put('/users/follow/removeFollower', fields)
    .then(showResponse)
    .catch(showResponse);
}


// IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE BELOW

// map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser,
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets,
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'refreet-freet': createFreet,
  'upvote-freet' : upvoteFreet,
  'downvote-freet' : downvoteFreet,
  'remove-vote-freet' : removeVoteFreet,
  'view-feed': viewFeed,
  'view-follow': viewFollow,
  'follow-user': followUser,
  'unfollow-user': unfollowUser,
  'unfollower-user': unfollowerUser
};

// attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = (e) => {
      e.preventDefault();
      const data = {};
      (new FormData(form)).forEach((value, key) => {
        data[key] = value;
      });
      handler(data);
      return false; // don't reload page
    };
  });
}

//window.onload = init; // attach handlers once DOM is ready
