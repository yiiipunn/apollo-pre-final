document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/courses");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const getAllcourses = await response.json();
    if (getAllcourses.message !== "success") {
      alert("Can't get courses from server");
      return;
    }
    const cardData = getAllcourses.data;

    const dropdown = document.getElementById("dropdownMenu");
    const optionsData = Array.from(new Set(cardData.map((data) => data.department)));

    optionsData.forEach((optionText) => {
      let option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", function () {
      const selectedDepartment = this.value;
      renderCards(selectedDepartment);
    });

    function renderCards(department) {
      container.innerHTML = "";

      cardData
        .filter(
          (data) => department === "All" || data.department === department
        )
        .forEach((data) => {
          const card = document.createElement("div");
          card.className = "card";

          const img = document.createElement("img");
          img.className = "card-image";
          img.src = `${data.imageUrl}`;
          img.alt = `Image of ${data.title} course`;

          const details = document.createElement("div");
          details.className = "card-details";
          details.innerHTML = `
                    <h2><b>${data.title}</b></h2>
                    <p><b>${data.department}</b></p>
                    <p><b>โดย : </b>${data.room}</p>
                    <p><b>สถานที่ : </b>${data.time}</p>
                    <p><b>Caption : </b>${data.students}</p><br/>
                `;

          card.appendChild(img);
          card.appendChild(details);
          container.appendChild(card);
        });
    }

    const container = document.getElementById("cardContainer");

    renderCards("All");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
