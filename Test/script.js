async function Posts(API) {
    let response = await fetch(API, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    let result = await response.json();
    return result.data;
}

function displayPosts(posts) {
    const container = document.getElementById("posts-container");
    container.innerHTML = ""; 

    posts.forEach(user => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");

        const title = document.createElement("h2");
        title.textContent = `User ID: ${user._userid}`;
        userDiv.appendChild(title);

        const postList = document.createElement("ul");

        user._posts.forEach(post => {
            const li = document.createElement("li");
            li.textContent = `Post ID: ${post.postId} | Content: ${post.content}`;
            postList.appendChild(li);
        });

        userDiv.appendChild(postList);
        container.appendChild(userDiv);
    });
}

Posts("http://localhost:3100/api/posts/allposts")
    .then(data => 
      displayPosts(data)
        
    )
    .catch(err => {
        console.error(err);
        document.getElementById("posts-container").textContent = "Failed to load posts.";
    });
