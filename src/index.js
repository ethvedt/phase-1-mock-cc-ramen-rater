// write your code here
const menu = document.querySelector("#ramen-menu");
const details = document.querySelector("#ramen-detail");
document.addEventListener("DOMContentLoaded", function() {
    createMenu();
    const form = document.querySelector("#new-ramen");
    form.addEventListener("submit", handleNewSubmit);
    const editForm = document.querySelector("#edit-ramen");
    editForm.addEventListener("submit", handleEditSubmit);
    const deleteButton = document.querySelector("#delete-ramen");
    deleteButton.addEventListener("click", handleDelete);
});

function createMenu() {
    fetch("http://localhost:3000/ramens")
        .then(response => response.json())
        .then(data => {
            data.forEach(ramen => {
                const image = document.createElement("img");
                image.src = ramen.image;
                image.alt = ramen.name;
                image.id = "id"+ramen.id;
                menu.appendChild(image);
                image.addEventListener("click",  () => {   
                    const detailImage = document.querySelector(".detail-image");
                    detailImage.src = ramen.image;
                    detailImage.alt = ramen.name;
                    detailImage.id = "id"+ramen.id;
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
            const firstRamen = document.querySelector('#id1');
            firstRamen.dispatchEvent(new Event("click"));
        })
}

function handleNewSubmit(event) {
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
        image.id = "id"+ramen.id;
        menu.appendChild(image);
        image.addEventListener("click",  () => {   
            const detailImage = document.querySelector(".detail-image");
            detailImage.src = data.image;
            detailImage.alt = data.name;
            detailImage.id = "id"+ramen.id;
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

function handleEditSubmit(event) {
    event.preventDefault();
    const editRating = document.querySelector("#edit-rating").value;
    const editComment = document.querySelector("#edit-comment").value;
    const currentRamenId = document.querySelector(".detail-image").id.split("id")[1];
    const editRamenObj = {
        rating: editRating,
        comment: editComment
    }
    fetch(`http://localhost:3000/ramens/${currentRamenId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(editRamenObj)
    })
    .then(response => response.json())
    .then(data => {
        const rating = document.querySelector("#rating-display");
        rating.textContent = data.rating;
        const comment = document.querySelector("#comment-display");
        comment.textContent = data.comment; 
    })
}

// function handleDelete(event) {
//     event.preventDefault();
//     const currentRamenId = document.querySelector(".detail-image").id.split("id")[1];
//     fetch(`http://localhost:3000/ramens/${currentRamenId}`, {
//         method: "DELETE"
//     })
//    .then(response => response.json())
//    .then(data => {
//     console.log(data);
//    })
// }
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