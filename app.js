// A POST request that creates a new Post:
function createPost(){
    axios.request({
        url: `https://jsonplaceholder.typicode.com/posts`,
        method: `POST`,
        data: {
            title: postTitle.value,
            body: postBody.value,
            userId: postUserId.value
        }
    }).then(postSuccess).catch(postFailure);
}

function postSuccess(response){
    clearTextFields();
    let postData = response.data;
    resultsContainer.insertAdjacentHTML(`beforeend`, `<h4>Post ${postData.id} was successful!</h4>`)
}

function postFailure(error){
    clearTextFields();
    alert(`Post: Failed`);
}

// A PATCH request that updates a Post:
function updatePost(){
    axios.request({
        url: `https://jsonplaceholder.typicode.com/posts/1`,
        method: `PATCH`,
        data: {
            body: postBody.value,
        }
    }).then(updatePostSuccess).catch(postFailure);
}

function updatePostSuccess(response){
    clearTextFields();
    console.log(response);
    resultsContainer.insertAdjacentHTML(`beforeend`, `<h4>Successfully amended the body of your post.</h4>`);
}

// Delete request to delete a Post:
function deletePost(){
    axios.request({
        url: `https://jsonplaceholder.typicode.com/posts/1`,
        method: `DELETE`,
    }).then(deletePostSuccess).catch(updatePost);
}

function deletePostSuccess(response){
    console.log(response);
    resultsContainer.insertAdjacentHTML(`beforeend`, `<h4>Successfully deleted post.</h4>`);
}

// GET request to show all Posts:
// run script on startup, not as a function but the function is set off within the API call
axios.request({
    url: `https://jsonplaceholder.typicode.com/posts`,
    method: `GET`,
}).then(allPostSuccess).catch(postFailure);

// 2nd API call for Comments
// leaving as comment so i can ask and come back to this later
// axios.request({
//     url: `https://jsonplaceholder.typicode.com/posts/1/comments`,
//     method: `GET`,
// }).then(allPostSuccess).catch(postFailure);

// rubber duck:
// we have 2 endpoints
// GET is working on each individually, can see the obj in debugger
// when I get to function allPostSuccess, I can either get 1 or the other API to work, not both
// the data = response.data is what's not letting me use 2 API because they're both response.data
// and the comments are under response.data.email (or whatever it should be)
// so need to get both to work inside function and insert on page

function allPostSuccess(response){
    let data = response.data;
    for(posts of data){
        resultsContainer.insertAdjacentHTML(`beforeend`, 
                                            `<h3>Title: ${posts.title}</h3>
                                            <p>User ID: ${posts.userId}</p>
                                            <h4>Body: ${posts.body}</h4>`);
    }
}

// Clearing the text that the User typed into our `Input` text fields
function clearTextFields(){
    postTitle.value = ``;
    postBody.value = ``;
    postUserId.value = ``;
}

// Clear results from the "results container"
function clearResults(){
    resultsContainer.innerHTML = ``;
}

// General 'Results Container' variable
let resultsContainer = document.getElementById(`results`);

// POST to API: Variables and Event Listeners
let postTitle = document.getElementById(`title`);
let postBody = document.getElementById(`body`);
let postUserId = document.getElementById(`userId`);

document.getElementById(`postSubmit`).addEventListener(`click`, createPost);
document.getElementById(`amendSubmit`).addEventListener(`click`, updatePost);
document.getElementById(`deleteSubmit`).addEventListener(`click`, deletePost);
document.getElementById(`clearResults`).addEventListener(`click`, clearResults);