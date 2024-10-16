document.addEventListener("DOMContentLoaded", () => {

    const url = "https://images-api.nasa.gov/";

// realizar un funcion de busqueda que luego se agregara como evento 

// llamar el valor tipeado en el buscador

// desestructurar datos para obtener solo aquellos datos que queremos(no se si lo entendi, no se si lo hice bien esto)???

function buscar() {


let input = document.getElementById("inputBuscar").value

//Antes de realizar la solicitud declaro una variable que sera lo que se agregue
// a la url para realizar la peticion a la API

const params = new URLSearchParams({
  q: input , // Palabra clave de búsqueda
  media_type: 'image' // Tipo de medio
}); 


// le doy formato a la url de la peticion con la varible para que incluya serch?
// inserto fetch con manejo de errores, (ya que se nos pidio  en el proyecto) 

fetch(`${url}search?${params}`)
.then(response => {
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log(data);
    const cardContainer = document.getElementById('contenedor');
    cardContainer.innerHTML = ''; // aqui limpio los resultados previos en caso de que existan

    // declaro una variable para la data de respuesta y para poder manejarla (OJO ACA porque esto siempre me falta)
    const items = data.collection.items;

    // filtro los items, busco si coincide una keywod con el input
    // todo a caja baja para evitar errores

    const filteredItems = items.filter(item => {
        const keywords = item.data[0].keywords ? item.data[0].keywords.map(keyword => keyword.toLowerCase()) : [];
        return keywords.some(keyword => keyword.includes(input.toLowerCase()));
    });

    if (filteredItems.length === 0) {
        cardContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    // para los items filtrados indico un foreach de lo que se tiene que agregar
    // en este caso tarjetas de bootstrap
    // todas quedaban muy desparejas por eso en el css se agregaron cositas 

    filteredItems.forEach(item => {
        const card = `

        <div class="col-4">
        <div class="card text-white bg-dark " id = "contenedorTarjeta">
            <div class = "contImagen">
                <img src="${item.links[0].href}" class="card-img-top" alt="${item.data[0].title}">
            </div>
                
       
            <div class="card-body">
                <h5 class="card-title">${item.data[0].title}</h5>
                 <div class="scroll-container" data-bs-spy="scroll" data-bs-target="#contenedorTarjeta">
                 <p class="card-text">${item.data[0].description || 'Descripción no disponible.'}</p>
                 <small class="card-text">${item.data[0].date_created || 'Descripción no disponible.'}</small>

            </div>

         </div>
        </div>
    </div>
`;
        cardContainer.innerHTML += card;
    });
})
.catch(error => {
    console.error('Hubo un problema con la solicitud:', error);
});
}

  

let btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => 

  buscar()
)
});