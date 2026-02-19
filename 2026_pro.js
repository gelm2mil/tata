const API_URL = "https://script.google.com/macros/s/AKfycbzI7IUbfQe2_xeVvs3uShoMpVJZ3C88_LgM07-3i1bUOl4q-RZzUXpZhJZR8bYOxiPm8g/exec";

let data = [];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const archivoFilter = document.getElementById("archivoFilter");
const fechaFilter = document.getElementById("fechaFilter");
const tipoFilter = document.getElementById("tipoFilter");
const tableBody = document.querySelector("#resultsTable tbody");

/* =========================
   CARGAR DATOS DESDE API
========================= */
async function cargarDatos() {
  try {
    const response = await fetch(API_URL);
    data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error("Error cargando datos:", error);
    tableBody.innerHTML = `<tr><td colspan="7">Error cargando datos</td></tr>`;
  }
}

/* =========================
   RENDERIZAR TABLA
========================= */
function renderTable(results) {
  tableBody.innerHTML = "";

  if (!results || results.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7">Sin resultados</td></tr>`;
    return;
  }

  results.forEach(item => {

    const placa = item["PLACA"] || item["PLACA.E"] || item["Placa"] || "";
    const propietario = item["PROPIETARIO"] || item["propietario"] || "";
    const ruta = item["RUTA"] || "";
    const fecha = item["FECHA"] || "";
    const motivo = item["MOTIVO"] || "";

    const row = `
      <tr>
        <td>${item.archivo || ""}</td>
        <td>${item.hoja || ""}</td>
        <td>${placa}</td>
        <td>${propietario}</td>
        <td>${ruta}</td>
        <td>${fecha}</td>
        <td>${motivo}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
}

/* =========================
   BUSCADOR
========================= */
function buscar() {
  const texto = searchInput.value.toLowerCase();
  const archivo = archivoFilter.value;
  const fecha = fechaFilter.value;
  const tipo = tipoFilter.value;

  const resultados = data.filter(item => {

    const placa = (item["PLACA"] || item["PLACA.E"] || "").toString().toLowerCase();
    const propietario = (item["PROPIETARIO"] || item["propietario"] || "").toString().toLowerCase();
    const ruta = (item["RUTA"] || "").toString().toLowerCase();
    const fechaDato = (item["FECHA"] || "").toString();
    const motivo = (item["MOTIVO"] || "").toString();

    const coincideTexto =
      placa.includes(texto) ||
      propietario.includes(texto) ||
      ruta.includes(texto);

    const coincideArchivo = archivo ? item.archivo === archivo : true;
    const coincideFecha = fecha ? fechaDato.includes(fecha) : true;
    const coincideTipo = tipo ? motivo === tipo : true;

    return coincideTexto && coincideArchivo && coincideFecha && coincideTipo;
  });

  renderTable(resultados);
}

/* =========================
   EVENTOS
========================= */
searchBtn.addEventListener("click", buscar);

searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") buscar();
});

/* =========================
   INICIAR SISTEMA
========================= */
cargarDatos();
