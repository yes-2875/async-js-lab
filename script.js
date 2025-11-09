// HELPER FUNCTION FOR LOGGING TO CONSOLE AND HTML SIMULTANEOUSLY.
const resultsElement = document.getElementById("results");

function logToHtml(text) {
    resultsElement.innerHTML += (text + '<br>');
    console.log(text);
}

function errorToHtml(text) {
    resultsElement.innerHTML += "<b style=\"color: red;\">" + text + "</b> <br>";
    console.error(text);
}


// ------ PART 2: Data Fetching Functions ------

// Task A: Returns a Promise that uses setTimeout() to create a 1-second delay.
// After the delay finishes, the Promise returns a user object.
function fetchUserProfile(userId) {
    return new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            const user = {
                id: userId,
                name: "Mirza",
                email: "mirza@example.com",
                username: "mirza.2875"
            };
            resolve(user);
        }, 1000);
    });
}

// Task B: Returns a Promise that uses setTimeout() to create a 1.5-second delay.
// After the delay finishes, the Promise returns an array of 3 post objects.
function fetchUserPosts(userId) {
    return new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            
            // PART 4 TASK F: Unreliable function
            // Will randomly reject with a 30% chance.
            if (Math.random() <= 0.3) {
                reject(new Error(`Failed to fetch posts for user id ${userId}`));
                return;
            }
            
            const posts = [ 
                {postId: 12459, userId: userId, title: "Sample post 1", content: "Lorem ipsum..."},
                {postId: 24902, userId: userId, title: "Sample post 2", content: "...dolor sit amet..."},
                {postId: 2305,  userId: userId, title: "Sample post 3", content: "...consectetur adipiscing elit."}
            ];
            
            resolve(posts);
        }, 1500);
    });
}

// Task C: Returns a Promise that uses setTimeout() to create a 2-second delay.
// After the delay finishes, the Promise returns an array of 3 comment objects.
function fetchPostComments(postId) {
    return new Promise(function(resolve, reject) {
        
        setTimeout(function() {
            const comments = [ 
                {commentId: 12,  postId: postId, username: "j.doe",    comment: "cool post!"},
                {commentId: 34,  postId: postId, username: "rob.1923", comment: "Fyp blessing me at 2am"},
                {commentId: 103, postId: postId, username: "john.a",   comment: "ngl, delete this post."}
            ];
            
            resolve(comments);
        }, 2000);
    });
}

// ------ PART 3: Sequential vs. Parallel Fetching ------

// Task D: Sequential Fetching
// Fetches data from fetchUserProfile(), fetchUserPosts() and fetchPostComments() one at a time.
async function sequentialDataFetch(userId) {
    const startTime = Date.now(); // Track a timestamp of the current moment.
    
    try {
        var profile = await fetchUserProfile(userId);
        logToHtml("User profile retrieved.");
        
        var posts = await fetchUserPosts(userId);
        logToHtml("User posts retrieved.");
        
        // Loop through posts and await fetchPostComments() for each post.
        var comments = [];
        
        for (let post of posts) {
            const commentList = await fetchPostComments(post.postId);
            comments.push(commentList);
            
            logToHtml(`Comments retrieved for post id ${post.postId}.`);
        }
        
        
        const endTime = Date.now(); // Timestamp at the end of fetch.
        logToHtml(`Sequential fetch took ${endTime - startTime}ms`);
        
        // Return all the data combined
        return {profile: profile, posts: posts, comments: comments};
        
    // ------ PART 4: Adding Error Handling ------
    // TASK G: Handle Errors Gracefully
    // Return partial successful data if possible.
    } catch (error) {
        errorToHtml("Error in sequential fetch: " + error.message);
        
        // Quick shortcuts to conditional statements (for organization and less cluttered if statements)
        const profileNull = (profile === null || typeof profile === 'undefined');
        const postsNull = (posts === null || typeof posts === 'undefined');
        const commentsNull = (comments === null || typeof comments === 'undefined');
        
        const data = {};
        
        if (!(profileNull && postsNull && commentsNull)) {
            
            errorToHtml("Returning partial data.");
            if (!profileNull)   { data.profile = profile; }
            if (!postsNull)     { data.posts = posts; }
            if (!commentsNull)  { data.comments = comments; }
        }
        
        return data;
    }
}

// Task E: Parallel Fetching
// Fetches data from all of the previous fetching functions at once.
async function parallelDataFetch(userId) {
    const startTime = Date.now(); // Track the current timestamp.
    
    try {
        // Fetch user profile and posts simultaneously using Promise.all();
        var [profile, posts] = await Promise.all([fetchUserProfile(userId), fetchUserPosts(userId)]);
        logToHtml("User and posts retrieved simultaneously.");
        
        // Fetch all comments for all posts in parallel using posts.map() with fetchPostComments();
        var comments = posts.map(function(post) {
           return fetchPostComments(post.postId);
        });
        
        const endTime = Date.now();
        logToHtml(`All comments for all posts of user ${userId} fetched. Parallel fetch took ${endTime - startTime}ms`);
        
        // Return all data combined.
        return {profile: profile, posts: posts, comments: comments};
        
    // ------ PART 4: Adding Error Handling ------
    // TASK G: Handle Errors Gracefully
    // Return partial successful data if possible.
    } catch (error) {
        errorToHtml("Error in parallel fetch: " + error.message);
        
        // Quick shortcuts to conditional statements (for organization and less cluttered if statements)
        const profileNull = (profile === null || typeof profile === 'undefined');
        const postsNull = (posts === null || typeof posts === 'undefined');
        const commentsNull = (comments === null | typeof comments === 'undefined');
        
        const data = {};
        
        if (!(profileNull && postsNull && commentsNull)) {
            
            errorToHtml("Returning partial data.");
            if (!profileNull)   { data.profile = profile; }
            if (!postsNull)     { data.posts = posts; }
            if (!commentsNull)  { data.comments = comments; }
        }
        
        return data;
    }
}

// ------ PART 5: Main Function ------
/*async function getUserContent(userId) {
    logToHtml("=== Fetching all user content ===");
    
    try {
        // Step 1: Fetch user profile
        const user = await fetchUserProfile();
    }
}*/

// ------ PART 6: Display results in HTML ------
// When user clicks the Sequential Fetch button, call sequentialDataFetch() and display results in HTML.
document.getElementById("sequentialFetch").addEventListener("click", async function(event) {
    sequentialDataFetch(Math.floor(Math.random() * 10000));
    
    // TODO: call helper function to display data nicely.
});

// When user clicks the Parallel Fetch button, call parallelDataFetch() and display results in HTML.
document.getElementById("parallelFetch").addEventListener("click", async function(event) {
    parallelDataFetch(Math.floor(Math.random() * 10000));
    
    // TODO: call helper function to display data nicely.
});