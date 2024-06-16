async function loadComponent(componentId, componentPath) {
    const componentElement = document.getElementById(componentId);
    if (componentElement) {
        const response = await fetch(componentPath);
        const componentHTML = await response.text();

        componentElement.innerHTML = componentHTML;
    }
}

window.toggleDarkMode = function () {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.add('dark');
    }
}

window.onscroll = function () {
    scrollFunction()
}

export function scrollFunction() {
    var topButton = document.getElementById("topBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

export function main() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    loadComponent('topBtn', 'components/top-button.html');
    loadComponent('backBtn', 'components/back-button.html');

    scrollFunction();
}

document.addEventListener('DOMContentLoaded', main);