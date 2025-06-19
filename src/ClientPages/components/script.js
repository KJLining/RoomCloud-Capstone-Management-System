const hamBurger = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("#sidebar");

// Check localStorage on page load
if (localStorage.getItem("sidebarExpanded") === "true") {
    sidebar.classList.add("expand");
}

hamBurger.addEventListener("click", function () {
    sidebar.classList.toggle("expand");
    // Save current state to localStorage
    localStorage.setItem("sidebarExpanded", sidebar.classList.contains("expand"));
});
