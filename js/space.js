const url = "https://images-api.nasa.gov/";

// realizar un funcion de busqueda que luego se agregara como evento 

// llamar el valor tipeado en el buscador

function buscar() {

//Antes de realizar la solicitud declaro una variable que sera lo que se agregue
// a la url para realizar la peticion a la API

let input = document.getElementById("inputBuscar").value


const params = new URLSearchParams({
  palabraClave: input , // Palabra clave de búsqueda
  media_type: 'image' // Tipo de medio
}); 

fetch(`${url}?${params}`)

// inserto fetch con manejo de errores, (ya que se nos pidio  en el proyecto) 
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Imprimir los datos obtenidos
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });


    // ahora resuelvo como mostrar estos datos que obtuve con la solicitud
    //de manera que se muestren en formato tarjeta


  }

  function mostrarTarjetas(items) {
    const cardContainer = document.getElementById('contenedor');
    cardContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (items.length === 0) {
        cardContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const card = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${item.links[0].href}" class="card-img-top" alt="${item.data[0].title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.data[0].title}</h5>
                        <p class="card-text">${item.data[0].description || 'Descripción no disponible.'}</p>
                    </div>
                </div>
            </div>
        `;
        cardContainer.innerHTML += card; // Agregar la tarjeta al contenedor
    });
}

let btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => 

  buscar()
)

