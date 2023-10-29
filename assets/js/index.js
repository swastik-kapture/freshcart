// re-render cart
rerender_cart();

// if index page is present and user is not logged in take to signup page
if (localStorage.getItem("userAccount") === null) {
    window.location.href = "/pages/signup.html"
}