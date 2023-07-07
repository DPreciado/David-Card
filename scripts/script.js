const elCont = document.getElementById('card-container')
const gitUser = document.getElementById("git-user")
const elHijos = elCont.querySelectorAll('#include-img')
const height = elCont.clientHeight
const width = elCont.clientWidth
//parallax
const parallaxImg = document.getElementById('parallax-img');

function disableMousemove(event) {
    event.stopPropagation();
}

gitUser.addEventListener("mousemove", disableMousemove);

elCont.addEventListener('mousemove', (evt) => {
    const { layerX, layerY } = evt;
    const { width, height } = elCont.getBoundingClientRect();

    const xRotation = ((layerY - height / 2) / height) * 3;
    const yRotation = ((layerX - width / 2) / width) * 3;

    const parallaxOffsetX = yRotation * .5;
    const parallaxOffsetY = xRotation * .5;

    const xRotationChild = ((layerY - height / 2) / height) * 15;
    const yRotationChild = ((layerX - width / 2) / width) * 15;

    const string = `
        perspective(500px)
        scale(1.1)
        rotateX(${xRotation}deg)
        rotateY(${-yRotation}deg)`;

    const stringChild = `
        perspective(500px)
        scale(1.03)
        rotateX(${xRotationChild}deg)
        rotateY(${-yRotationChild}deg)`;

    const imgString = `
        translateX(${parallaxOffsetX}px)
        translateY(${-parallaxOffsetY}px)`;
    
    parallaxImg.style.transform = imgString;
    
    elCont.style.transform = string;

    elHijos.forEach((elHijo) => {
        elHijo.style.transform = stringChild;
    });
})
elCont.addEventListener('mouseout', (evt) => {
    const isInsideChild = elCont.contains(evt.relatedTarget);
    if (isInsideChild) {
        return; // Evitar restablecer las transformaciones si el evento ocurrió dentro de un elemento interno
    }else{

        elCont.style.transform = `
            perspective(500px)
            scale(1)
            rotateX(0)
            rotateY(0)`
        elHijos.forEach((elHijo) => {
            elHijo.style.transform = `
            perspective(500px)
            scale(1)
            rotateX(0)
            rotateY(0)`;
        });
        parallaxImg.style.transform = `
            translateX(0px)
            translateY(0px)`;
    }
})

//edad
const fechaActual = new Date();

const fechaNacimiento = new Date('1998-12-23');

let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

const mesActual = fechaActual.getMonth();
const diaActual = fechaActual.getDate();
const mesNacimiento = fechaNacimiento.getMonth();
const diaNacimiento = fechaNacimiento.getDate();

if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edad--;
}

const spanEdad = document.getElementById('edad');
spanEdad.textContent = edad + ' y/o';


