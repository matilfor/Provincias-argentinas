//defino desde dónde voy a pedir los datos que mostraré en mi página y guardo la dirección en una constante llamada endopoint
const endpoint = 'https://gist.githubusercontent.com/matilfor/a97ae5695caa45967e78f901bcf7739b/raw/29cf93c6a872b361b215b3155fc4ba82e4e19ce8/provincias.json';
//defino un array donde guardaré los datos que me traigo del endpoint
const provincias = [];
//con el fetch traigo esos datos
fetch(endpoint)
//traigo los datos del archivo con formato json
	.then(res => res.json())
//hago un push para guardar los datos dentro del array provincias y luego un spread para ordenarlos en datos individuales
	.then(datos => provincias.push(...datos));
//creo una función para buscar la ciudad/provincia que ingreso en el cuadro de búsqueda
function buscarDatos(busqueda, lugares){
	//corroboro que la ciudad buscada coincide con los registros dentro de mi array de datos
	return provincias.filter(lugar => {
		//utilizo una expresión regular para que valide la búsqueda para cualquier combinación de letras ingresadas
		//gi = global (busca dentro de toda la palabra ingresada en la búsqueda), insensitive (no distingue entre mayúsculas o minúsculas)
		const regex = new RegExp(busqueda, 'gi');
    	return lugar.provincia.match(regex) || lugar.capital.match(regex)
	})
}
//esta función agrega puntos a los millares de las cifras de población
function numerosConPuntos(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
//creo una función para mostrar las búsquedas en pantalla
function mostrarBusqueda(){
	//guardo un array con la búsqueda ingresada en el input (procesada en la función buscarDatos)
	//y lo comparo con el array de datos 'provincias' 
	const arrayBusqueda = buscarDatos(this.value, provincias);
	//creo un nuevo array con el método map y lo guardo dentro de la constante 'html' 
	//este array guarda la provincia, capital y población que se asemejan a la búsqueda y los muestra
	const html = arrayBusqueda.map(lugar => {
	//con esto tomamos lo que se haya buscado y le ponemos a ese span la clase hl (highlight) que resaltará la palabra buscada
    const regex = new RegExp(this.value, 'gi');
    const nombreProvincia = lugar.provincia.replace(regex, `<span class="hl">${this.value}</span>`);
    const nombreCapital = lugar.capital.replace(regex, `<span class="hl">${this.value}</span>`);
    //lleno los span con los datos de la provincia, capital y población buscados
    return `
      <li>
        <span class="nombre">${nombreProvincia}, ${nombreCapital}</span>
        <span class="poblacion">${numerosConPuntos(lugar.poblacion)}</span>
      </li>
    `;
  }).join(''); //uno los strings poniéndoles un espacio entre cada palabra
	//modifico el contenido del elemento que tiene la clase filtrar con la información de la búsqueda
  filtrar.innerHTML = html;
}

//guardo en una constante lo que se ingresa en el input (cuadro) de búsqueda con la clase 'buscar'
const buscarInput = document.querySelector('.buscar');
//guardo en una constante lo que se va buscando y se muestra dentro del elemento ul con la clase 'filtrar'
const filtrar = document.querySelector('.filtrar');
//llamo a la función cuando cambie lo que se muestra dentro del input de búsqueda
buscarInput.addEventListener('change', mostrarBusqueda);
//también llamo a esa función cuando presiono y suelto teclas mientras estoy escribiendo una palabra en el input
buscarInput.addEventListener('keyup', mostrarBusqueda);