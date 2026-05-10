// GOOGLE SHEETS API

const API_URL =
'https://script.google.com/macros/s/AKfycbzeNgwnJc6jP6oykCIQ9N18fCUsMNeOsUCjTCq89qN_Y8-tqq5W0smUWOjYEFR0FuHZ/exec';

// ANIMACIONES SCROLL

const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {

    reveals.forEach(reveal => {

        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint){
            reveal.classList.add('active');
        }

    });

});

// NAVBAR EFECTO SCROLL

const header = document.querySelector('header');

window.addEventListener('scroll', () => {

    if(window.scrollY > 50){
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

});

// FRASES TECNOLÓGICAS REALES

const quotes = [

{
    text:"La innovación distingue a los líderes de los seguidores.",
    author:"Steve Jobs"
},

{
    text:"Talk is cheap. Show me the code.",
    author:"Linus Torvalds"
},

{
    text:"El software es una gran combinación entre arte e ingeniería.",
    author:"Bill Gates"
},

{
    text:"Primero resuelve el problema. Después escribe el código.",
    author:"John Johnson"
},

{
    text:"La simplicidad es la máxima sofisticación.",
    author:"Leonardo da Vinci"
},

{
    text:"Cualquier tecnología suficientemente avanzada es indistinguible de la magia.",
    author:"Arthur C. Clarke"
},

{
    text:"Aprender a escribir programas expande tu mente.",
    author:"Steve Jobs"
},

{
    text:"Hazlo funcionar, luego hazlo bien, luego hazlo rápido.",
    author:"Kent Beck"
},

{
    text:"La mejor manera de predecir el futuro es inventarlo.",
    author:"Alan Kay"
},

{
    text:"Los programas deben escribirse para que las personas puedan leerlos.",
    author:"Harold Abelson"
},

{
    text:"La computadora nació para resolver problemas que antes no existían.",
    author:"Bill Gates"
},

{
    text:"El código es como el humor. Cuando tienes que explicarlo, es malo.",
    author:"Cory House"
},

{
    text:"La tecnología mueve el mundo.",
    author:"Steve Jobs"
},

{
    text:"La inteligencia es la habilidad de adaptarse al cambio.",
    author:"Stephen Hawking"
},

{
    text:"El detalle importa. Vale la pena esperar para hacerlo bien.",
    author:"Steve Jobs"
},

{
    text:"La web no solo conecta máquinas, conecta personas.",
    author:"Tim Berners-Lee"
},

{
    text:"No temo a los computadores. Temo la falta de ellos.",
    author:"Isaac Asimov"
},

{
    text:"La programación no trata sobre lo que sabes, sino sobre lo que puedes descubrir.",
    author:"Chris Pine"
}

];

function showQuotes(){

    const quoteContainer =
    document.getElementById('quote');

    quoteContainer.innerHTML = "";

    const shuffled =
    [...quotes].sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0,4);

    selected.forEach(item => {

        quoteContainer.innerHTML += `

        <div class="quote-card">

            <p>"${item.text}"</p>

            <h4>- ${item.author}</h4>

        </div>

        `;

    });

}

showQuotes();

setInterval(showQuotes, 10000);

// ENVIAR COMENTARIOS

const commentForm =
document.getElementById('commentForm');

if(commentForm){

    commentForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const data = {

            type: "comment",

            nombre:
            document.getElementById('nombre').value,

            apellido:
            document.getElementById('apellido').value,

            correo:
            document.getElementById('correo').value,

            comentario:
            document.getElementById('comentario').value

        };

        try{

            const response = await fetch(API_URL, {

                method:'POST',

                body: JSON.stringify(data)

            });

            addCommentToScreen(data);

            alert('Comentario enviado correctamente');

            commentForm.reset();

        }

        catch(error){

            alert('Error enviando comentario');

            console.error(error);

        }

    });

}

// MOSTRAR COMENTARIOS EN PANTALLA

const commentsSlider =
document.getElementById('commentsSlider');

function addCommentToScreen(data){

    commentsSlider.innerHTML += `

    <div class="comment-card">

        <h4>
            ${data.nombre} ${data.apellido}
        </h4>

        <p>
            ${data.comentario}
        </p>

        <small>
            ${new Date().toLocaleDateString()}
        </small>

    </div>

    `;

}

// ENVIAR SOLICITUDES

const serviceForm =
document.getElementById('serviceForm');

if(serviceForm){

    serviceForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const data = {

            type: "service",

            nombre:
            document.getElementById('solNombre').value.trim(),

            apellido:
            document.getElementById('solApellido').value.trim(),

            telefono:
            document.getElementById('solTelefono').value.trim(),

            correo:
            document.getElementById('solCorreo').value.trim(),

            servicio:
            document.getElementById('solTipo').value,

            tipoCliente:
            document.querySelector(
                'input[name="cliente"]:checked'
            )?.value || "",

            mensaje:
            document.getElementById('solMensaje').value.trim()

        };

        console.log("DATA ENVIADA:", data);

        try{

            const response = await fetch(API_URL, {

                method:'POST',

                body: JSON.stringify(data)

            });

            console.log("STATUS:", response.status);

            const result =
            await response.json();

            console.log("RESPUESTA:", result);

            if(result.success){

                alert(
                    'Solicitud enviada correctamente'
                );

                serviceForm.reset();

            } else {

                alert(result.error);

                console.error(result);

            }

        }

        catch(error){

            alert(
                'Error enviando solicitud'
            );

            console.error(
                'ERROR FETCH:',
                error
            );

        }

    });

}

// CARGAR COMENTARIOS DESDE GOOGLE SHEETS
async function loadComments(){

    try{

        const response = await fetch(
            API_URL + '?action=getComments'
        );

        const comentarios =
        await response.json();

        document.getElementById(
            'commentsCount'
        ).innerText = comentarios.length;

        const commentsSlider =
        document.getElementById(
            'commentsSlider'
        );

        commentsSlider.innerHTML = "";

        const orderedComments =
        [...comentarios].reverse();

        const duplicatedComments = [
            ...orderedComments,
            ...orderedComments
        ];

        duplicatedComments.forEach(item => {

            commentsSlider.innerHTML += `

            <div class="comment-card">

                <h4>
                    ${item.nombre}
                    ${item.apellido}
                </h4>

                <p>
                    ${item.comentario}
                </p>

                <small>
                    ${new Date(item.fecha)
                    .toLocaleDateString()}
                </small>

            </div>

            `;

        });

    }

    catch(error){

        console.error(
            'Error cargando comentarios',
            error
        );

    }

}

loadComments();

async function updateVisits(){

    try{

        const response = await fetch(
            API_URL + '?action=visit'
        );

        const data =
        await response.json();

        document.getElementById(
            'visits'
        ).innerText = data.visits;

    }

    catch(error){

        console.error(
            'Error visitas',
            error
        );

    }

}

updateVisits();