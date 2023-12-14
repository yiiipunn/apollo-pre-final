function myFunction() {
    var x = document.getElementById("MenuMol");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById("toggleBtn");
    const qaDropdown = document.getElementById("qaDropdown");
  
    toggleBtn.addEventListener('click', function () {
      qaDropdown.classList.toggle('active');
    });
  });