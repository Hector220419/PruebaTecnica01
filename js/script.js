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
                    // Se crea un apartado para la tarjeta principal seleccionada para el hover y colocarla directamente en el contenedor de tarjetas principales 
                    // Usando el Jquery, se colocan los apartados para la tarjeta, con sus respectivos atributos y clases
                    const tarjetaPrincipal = $(`
                    <div class="background">
                        <div class="separation">
                            <img src="${p.img}" alt= "Productos"/>
                            <p>${p.nombre}</p>
                        </div>
                    </div>
                    `);
                    // Se emplea la funcion de hover, misma que determina cuando el cursor se encuentra sobre el elemento
                    tarjetaPrincipal.hover(()=>{ // Se crea una funcion flecha para mostrar los datos en la tarjeta miniatura
                   // Se crea la constante, los atributos y clases necesarios para la tarjeta, con ayuda del q
                    const miniatura = $(`
                      <div class="miniatura">
                        <img src="${p.img}" />
                        <p>${p.nombre}</p>
                      </div>
                    `);
                    // Se agrega dicha tarjeta seleccionada al contenedor de tarjetas ocultas
                    tarjetasOcultas.append(miniatura);
                    },() => {
                        // Una vez dejando de presionar o mantenernos en el elemento, se elimina todo lo correspondiente a la tarjeta
                        $(".miniatura").remove();
                    });
                    // Se agrega la tarjeta principal individual al contenedor de tarjetas principales
                    tarjetasPrincipales.append(tarjetaPrincipal);
                    }
                    /****************************  Tarjetas Secundarias ******************************/
                    else{ // Si el elemento no es id == 1, se trata de una tarjeta secundaria y se repite el mismo proceso que para las tarjetas primarias
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
