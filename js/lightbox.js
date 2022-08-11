
const images = document.querySelectorAll('.lightbx__image');
const lightbox = document.createElement('div');
const controlls = document.createElement('div');

lightbox.id = 'lightbox';
controlls.id = 'controlls';

// controllsElements = '<button id="previousImage" onclick="previousImage()">Back</button>' +
//                     '<button id="closeButton" onclick="closeImage()">Close</button>'+
//                     '<button id="nextImage" onclick="nextImage()">Next</button>';
                    

controllsElements = '<button id="previousImage">Back</button>' +
                    '<button id="closeButton">Close</button>'+
                    '<button id="nextImage">Next</button>';

  
//     document.getElementById("previousImage").addEventListener("click", previousImage());
//     document.getElementById("closeButton").addEventListener("click", closeImage());
document.getElementById("nextImage").addEventListener("click", nextImage);   



 // Extacting Images paths from images Object                         
const imageSrc = Object.entries(images);
var imgSrc = [];

for(let i = 0; i < imageSrc.length; i++){
    imgSrc.push(imageSrc[i][1].src);
}


// Create the Lighbox and append image and controll elements

function showImage() {
    lightbox.classList.add('active');
    const img = document.createElement('img');
    img.src = this.src;

    while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
        controlls.removeChild(controlls.firstChild);
        
    }

    lightbox.appendChild(img);
    lightbox.appendChild(controlls);
    controlls.innerHTML = controllsElements;

}

// Close lighbox if the dark area has been clicked 
// Todo: Add a close Buttom

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')

})

// Next Image Function

function nextImage() {

    var nextImage = imgSrc.indexOf(lightbox.firstChild.src) + 1;
    if (nextImage > imgSrc.length - 1) {
        nextImage = 0;

    }

    lightbox.firstChild.src = imgSrc[nextImage];
    
}

// Previous Image Function

function previousImage() {
    var previousImage = imgSrc.indexOf(lightbox.firstChild.src) - 1;
    if (previousImage < 0) {
        previousImage = imgSrc.length - 1;
    }
    lightbox.firstChild.src = imgSrc[previousImage];
}   

// Close Image Function

function closeImage () {
    lightbox.classList.remove('active')
}   

// Navigation with keyboard

document.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight') {
        nextImage();
    } else if (e.key == 'ArrowLeft') {
        previousImage();
    } else if (e.key == 'Escape') {
        closeImage();
    }
})



images.forEach(element => { element.addEventListener('click', showImage) });
document.body.appendChild(lightbox); 







