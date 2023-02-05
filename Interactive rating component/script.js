
// info of selected rating(number) and last selected item
let info = {
    rating: 0,
    lastItem: null
};

document.getElementById("rating").addEventListener('click', (evt) => {
    if (info['lastItem'] !== null) {
        // if there is an item already selected, we set it back to its default color
        // to avoid changing all of the buttons colors
        info['lastItem'].style.backgroundColor = 'var(--dark-blue)';
        info['lastItem'].style.color = 'var(--light-grey)';
    }
    if (evt.target.id !== "rating") { // to avoid changing the ul element bgColor
        info['rating'] = evt.target.innerText; // retrieve selected rating and changing its colors (bg and color)
        evt.target.style.backgroundColor = 'var(--medium-grey)';
        evt.target.style.color = 'var(--white)';
        info['lastItem'] = evt.target;
        // kkep the last selected rating to use it in case the user changes his mind
    }
});

document.getElementById("submit-btn").addEventListener('click', (evt) => {
    if (info['rating'] === 0) { // in case the user submited without selection
        alert("Please choose a number");
    }
    else { // show the thnakyouState and hide the normalState + adding the rating
        document.getElementById("selected-rating").innerText = info['rating'];
        document.getElementById("normaleState").style.display = "none";
        document.getElementById("thankYouState").style.display = "block";
    }
});