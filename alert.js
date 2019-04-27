let alertContainer = document.getElementById("alertContainer");
let btn = document.getElementById("btn");
let alertIcon = document.getElementById("alertIcon");
let alertMessage = document.getElementById("alertMessage");
let alert = document.getElementById('alert');

export function alertFunc(type, message) {
    if (type === 0) {
        alertIcon.classList.add('fa-times');
        alertIcon.classList.add('text-danger');
        alert.style.borderTop = "50px solid #0b9253";
    }else if (type === 1) {
        alertIcon.classList.add('fa-check');
        alertIcon.classList.add('text-success');
        alert.style.borderTop = "50px solid #262626";
    }
    alertMessage.innerHTML = message;
    alertContainer.classList.remove('hide');
    alert.classList.add("show-animation");
    
    setTimeout(() => {
        alertContainer.classList.add('hide-animation');
    }, 2000);

    setTimeout(() => {
        alertContainer.classList.add('hide');
        alert.classList.remove("show-animation");
        alertContainer.classList.remove('hide-animation');
        alertContainer.style.opacity = '1';
        alertIcon.className = '';
        alertIcon.classList.add('fas');
    }, 3000);
}