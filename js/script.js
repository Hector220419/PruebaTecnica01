// Verificamos que el documento haya cargado correctamente, para evitar errores de cualquier tipo
$(document).ready(function() {
    // Creamos una variable para almacenar los productos del fetch, en caso de que se necesiten posteriormente
    let productos;
    // Con la opcion de JQuery, seleccionamos los elementos en donde vamos a agregar los valores de las tarjetas
    const tarjetasPrincipales =  $(".tarjetasPrincipales"); 
    const tarjetasSecundarias=  $(".tarjetasSecundarias");
    const tarjetasOcultas = $(".tarjetasOcultas");
    
    function obtenerDatos() {
        fetch('data.json')
        .then(function(response) {//response es la respuesta de la data base
            response.json().then(function (json) { //json es el objeto que se obtiene
                productos=json; //se guarda el json en la variable productos
                Array.from(json).forEach((p) => { //Toma el JSON, si es un arreglo haces el forEach. Si no lo es, mandas el error.
                    
                    /****************************  Tarjetas Primarias ******************************/
                    if(p.id == 1){
                    const tarjetaPrincipal = $(`
                    <div class="background">
                        <div class="separation">
                            <img src="${p.img}" alt= "Productos"/>
                            <p>${p.nombre}</p>
                        </div>
                    </div>
                    `);
                    tarjetaPrincipal.hover(()=>{
                    const miniatura = $(`
                      <div class="miniatura">
                        <img src="${p.img}" />
                        <p>${p.nombre}</p>
                      </div>
                    `);
                    tarjetasOcultas.append(miniatura);
                    },() => {
                        $(".miniatura").remove();
                    });
                    tarjetasPrincipales.append(tarjetaPrincipal);
                    }
                    /****************************  Tarjetas Secundarias ******************************/
                    else{
                        const tarjetaSecundaria = $(`
                        <div class="backgroundSec">
                            <div class="separationSec">
                                <img src="${p.img}" alt= "Productos"/>
                                <p>${p.nombre}</p>
                            </div>
                        </div>
                        `);
                        tarjetaSecundaria.hover(()=>{
                        const miniatura = $(`
                          <div class="miniatura">
                            <img src="${p.img}" />
                            <p>${p.nombre}</p>
                          </div>
                        `);
                        tarjetasOcultas.append(miniatura);
                        },() => {
                            $(".miniatura").remove();
                        });
                        tarjetasSecundarias.append(tarjetaSecundaria);
                    }
                }); // foreach para agregar los productos al div del HTML
            });//then
        }).catch(function(err) { //si hay un error
            console.log(err); //imprime el error
        });
      }
    // Llamamos a la funcion obtenerDatos para ejecutar el fetch y mostrar los valores en las tarjetas
    obtenerDatos();
});

/*********************** Tarjetas mostradas cuando se selecciona un elemento ******************************/ 
