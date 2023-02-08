// write your code here
const menu = document.querySelector("#ramen-menu");
const details = document.querySelector("#ramen-detail");
document.addEventListener("DOMContentLoaded", function() {
    createMenu();
    const form = document.querySelector("#new-ramen");
    form.addEventListener("submit", handleSubmit);
});

function createMenu() {
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(data => {
            data.forEach(ramen => {
                const image = document.createElement("img");
                image.src = ramen.image;
                image.alt = ramen.name;
                menu.appendChild(image);
                image.addEventListener("click",  () => {   
                    const detailImage = document.querySelector(".detail-image");
                    detailImage.src = ramen.image;
                    detailImage.alt = ramen.name;
                    const name = document.querySelector(".name");
                    name.textContent = ramen.name;
                    const restaurant = document.querySelector(".restaurant");
                    restaurant.textContent = ramen.restaurant;
                    const rating = document.querySelector("#rating-display");
                    rating.textContent = ramen.rating;
                    const comment = document.querySelector("#comment-display");
                    comment.textContent = ramen.comment;
                    });
            })
        })
    }

function handleSubmit(event) {
    event.preventDefault();
    const newName = event.target.querySelector("#new-name").value;
    const newRestaurant = event.target.querySelector("#new-restaurant").value;
    const newImage = event.target.querySelector("#new-image").value;
    const newRating = event.target.querySelector("#new-rating").value;
    const newComment = event.target.querySelector("#new-comment").value;
    const newRamenObj = {
        name: newName,
        restaurant: newRestaurant,
        image: newImage,
        rating: newRating,
        comment: newComment
    }
    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(response => response.json())
    .then(data => {
        const image = document.createElement("img");
        image.src = data.image;
        image.alt = data.name;
        menu.appendChild(image);
        image.addEventListener("click",  () => {   
            const detailImage = document.querySelector(".detail-image");
            detailImage.src = data.image;
            detailImage.alt = data.name;
            const name = document.querySelector(".name");
            name.textContent = data.name;
            const restaurant = document.querySelector(".restaurant");
            restaurant.textContent = data.restaurant;
            const rating = document.querySelector("#rating-display");
            rating.textContent = data.rating;
            const comment = document.querySelector("#comment-display");
            comment.textContent = data.comment;
            });

    })

}

////////////////////////////////////////////////////////////////
// It helped me to write this function separately, but I couldn't figure out how to pass the json data.
// function handleRamenClick(ramen) {
//     const detailImage = document.querySelector(".detail-image");
//     detailImage.src = ramen.image;
//     detailImage.alt = ramen.name;
//     const name = document.querySelector(".name");
//     name.textContent = ramen.name;
//     const restaurant = document.querySelector(".restaurant");
//     restaurant.textContent = ramen.restaurant;
//     const rating = document.querySelector("#rating-display");
//     rating.textContent = ramen.rating;
//     const comment = document.querySelector("#comment-display");
//     comment.textContent = ramen.comment;
// }