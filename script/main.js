const searchInput = document.getElementById("search");

fetch("https://salin-abangku.vercel.app/api/all")
  .then((response) => response.json())
  .then((data) => {
    const parentDiv = document.getElementById("main");

    // Function to display the data
    const displayData = (data) => {
      // Clear the parent div
      parentDiv.innerHTML = "";

      data.forEach((item, index) => {
        const newDiv = document.createElement("div");
        newDiv.className =
          "btn flex justify-between bg-white shadow-lg hover:bg-gray-100 no-animation";
        newDiv.id = "button" + index;
        newDiv.innerHTML = `
          <span class="w-[85%] hover:bg-gray-100">
            ${item}
          </span>
          <div class="">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
          </div>`;
        newDiv.addEventListener("click", () => {
          navigator.clipboard.writeText(item).then(
            () => {
              const successDiv = document.createElement("div");
              successDiv.textContent = "Copy successful!";
              successDiv.className =
                "alert alert-success sticky bottom-5 w-full text-white text-md font-bold transition";
              parentDiv.appendChild(successDiv);
              setTimeout(function () {
                successDiv.className = "opacity-0";
              }, 1000);
            },
            (err) => {
              console.error("Could not copy text: ", err);
            }
          );
        });
        parentDiv.appendChild(newDiv);
      });
    };

    // Display all data initially
    displayData(data);

    // Add event listener to the search input
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();

      // Filter the data
      const filteredData = data.filter((item) =>
        item.toLowerCase().includes(searchTerm)
      );

      // Display the filtered data
      displayData(filteredData);
    });
  })
  .catch((error) => console.error("Error:", error));
