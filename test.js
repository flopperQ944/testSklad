const cellSize = 40;

const colors = {
  "луг": "gray",
  "частково": "#ffcc00",
  "заповнена": "#009900",
  "дорога": "#cc0000"
};

const grid = document.getElementById("grid");

function renderGrid(data) {
  grid.innerHTML = ""; // очистити попередні елементи

  // Розмір контейнера
  grid.style.width = `${data.cols * cellSize}px`;
  grid.style.height = `${data.rows * cellSize}px`;
  grid.style.position = "relative";

  data.cells.forEach(cell => {
    const width = cell.width || 1;
    const height = cell.height || 1;

    const div = document.createElement("div");
    div.className = "cell";
    div.style.left = `${cell.x * cellSize}px`;
    div.style.top = `${cell.y * cellSize}px`;
    div.style.width = `${width * cellSize}px`;
    div.style.height = `${height * cellSize}px`;
    div.style.backgroundColor = colors[cell.type] || "gray";
    div.style.border = "2px solid #333";
    div.title = `${cell.type} (${cell.x},${cell.y})`;

    grid.appendChild(div);
  });
}

document.getElementById("jsonFileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const json = JSON.parse(e.target.result);
      if (!json.cols || !json.rows || !Array.isArray(json.cells)) {
        alert("❌ Некоректна структура JSON. Має бути 'cols', 'rows' і масив 'cells'");
        return;
      }
      renderGrid(json);
    } catch (err) {
      alert("❌ Некоректний JSON файл");
    }
  };
  reader.readAsText(file);
});

// Початково порожня сітка (без сітки)
renderGrid({
  cols: 10,
  rows: 7,
  cells: []
});