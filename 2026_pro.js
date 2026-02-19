const data = [
  {
    archivo: "2026",
    hoja: "RENOVACION",
    placa: "C-417BXN",
    propietario: "San Bernabe",
    ruta: "Escolar S. Bernabe",
    fecha: "2025-01-13",
    motivo: "BUS NUEVO"
  },
  {
    archivo: "REVISIONES_2026",
    hoja: "CAMBIO",
    placa: "M-090MY",
    propietario: "Glenda Guzman",
    ruta: "Moto Taxi 125",
    fecha: "2025-02-17",
    motivo: "TORO NUEVO"
  }
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const archivoFilter = document.getElementById("archivoFilter");
const fechaFilter = document.getElementById("fechaFilter");
const tipoFilter = document.getElementById("tipoFilter");
const tableBody = document.querySelector("#resultsTable tbody");

function renderTable(results) {
  tableBody.innerHTML = "";

  if (results.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7">Sin resultados</td></tr>`;
    return;
  }

  results.forEach(item => {
    const row = `
      <tr>
        <td>${item.archivo}</td>
        <td>${item.hoja}</td>
        <td>${item.placa}</td>
        <td>${item.propietario}</td>
        <td>${item.ruta}</td>
        <td>${item.fecha}</td>
        <td>${item.motivo}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function buscar() {
  const texto = searchInput.value.toLowerCase();
  const archivo = archivoFilter.value;
  const fecha = fechaFilter.value;
  const tipo = tipoFilter.value;

  const resultados = data.filter(item => {

    const coincideTexto =
      item.placa.toLowerCase().includes(texto) ||
      item.propietario.toLowerCase().includes(texto) ||
      item.ruta.toLowerCase().includes(texto);

    const coincideArchivo = archivo ? item.archivo === archivo : true;
    const coincideFecha = fecha ? item.fecha === fecha : true;
    const coincideTipo = tipo ? item.motivo === tipo : true;

    return coincideTexto && coincideArchivo && coincideFecha && coincideTipo;
  });

  renderTable(resultados);
}

searchBtn.addEventListener("click", buscar);
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") buscar();
});

renderTable(data);
