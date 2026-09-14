const axiosInstance = axios.create({
  baseURL: "https://api.restful-api.dev",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

const btnNext = document.getElementById("next-btn");
const btnPrev = document.getElementById("prev-btn");
let list = [];
let currentPage = 1;
const limit = 5;

function renderPage() {
  if (!list || list.length === 0) return;

  const totalPages = Math.ceil(list.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedObjects = list.slice(startIndex, endIndex);

  const objectsContainer = document.getElementById("objects-container");
  objectsContainer.innerHTML = "";

  paginatedObjects.forEach((object) => {
    const objectCard = document.createElement("div");
    objectCard.classList.add("object-card");

    const detailsHTML = object.data
      ? Object.entries(object.data)
          .map(
            ([key, value]) => `
            <div class="detail-tag">
              ${key}: <span>${value}</span>
            </div>
          `,
          )
          .join("")
      : '<div class="detail-tag">Sin detalles</div>';

    objectCard.innerHTML = `
        <div class="object-header">
          <div class="object-title">${object.name || "Sin nombre"}</div>
          <div class="object-id">ID: ${object.id}</div>
        </div>
        <div class="object-details">
          ${detailsHTML}
        </div>
      `;
    objectsContainer.appendChild(objectCard);
  });

  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage >= totalPages;

  const currentPageEl = document.getElementById("current-page");
  const totalPagesEl = document.getElementById("total-pages");
  if (currentPageEl) currentPageEl.textContent = currentPage;
  if (totalPagesEl) totalPagesEl.textContent = totalPages;
  const statusMsg = document.getElementById("status-message");
  if (statusMsg) statusMsg.style.display = "none";
}

async function main() {
  const { data: objects } = await axiosInstance.get("/objects");
  list = objects;
  renderPage();
}

main();

btnNext.addEventListener("click", () => {
  const totalPages = Math.ceil(list.length / limit);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});
