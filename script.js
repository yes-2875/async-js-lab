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