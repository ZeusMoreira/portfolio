function getZoomLevel() {
    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    return zoomLevel;
}

function reveal() {
    const zoomLevel = getZoomLevel();
    const reveals = document.querySelectorAll('.hidden, .hidden-top');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    if (zoomLevel > 150) {
        reveals.forEach(function (element) {
            element.classList.add('show');
        });
        return;
    }

    reveals.forEach(function (element) {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', reveal);
window.addEventListener('resize', reveal);
reveal();

document.addEventListener("DOMContentLoaded", function () {
    const icones = document.querySelectorAll('.icone');
    const iconeContainers = document.querySelectorAll('.habilidades__icone-container');
    const descricoes = document.querySelectorAll('.habilidades__descricao p');
    const prevButton = document.querySelector('.habilidades__prev-button');
    const nextButton = document.querySelector('.habilidades__next-button');

    let currentIndex = 0;
    let currentWidth = window.innerWidth;

    function resetarSelecao() {
        icones.forEach(icone => icone.classList.remove('habilidade-selecionada'));
        descricoes.forEach(descricao => descricao.classList.remove('mostrando'));
    }

    function selecionarHabilidade(index) {
        resetarSelecao();
        const icone = iconeContainers[index].querySelector('.icone');
        const habilidade = icone.getAttribute('data-habilidade');

        icone.classList.add('habilidade-selecionada');
        document.getElementById(`descricao-${habilidade}`).classList.add('mostrando');
    }

    function mostrarHabilidade(index) {
        iconeContainers.forEach((container, idx) => {
            container.style.display = (idx === index || currentWidth > 830) ? 'block' : 'none';
        });
        selecionarHabilidade(index);
    }

    function configurarNavegacao() {
        const isMobile = currentWidth <= 830;
        prevButton.style.display = isMobile ? "inline-block" : "none";
        nextButton.style.display = isMobile ? "inline-block" : "none";

        if (isMobile) {
            mostrarHabilidade(currentIndex);

            prevButton.onclick = () => {
                currentIndex = (currentIndex === 0) ? iconeContainers.length - 1 : currentIndex - 1;
                mostrarHabilidade(currentIndex);
            };

            nextButton.onclick = () => {
                currentIndex = (currentIndex === iconeContainers.length - 1) ? 0 : currentIndex + 1;
                mostrarHabilidade(currentIndex);
            };
        } else {
            iconeContainers.forEach(container => (container.style.display = "block"));
            selecionarHabilidade(currentIndex);
        }
    }

    icones.forEach((icone, idx) => {
        icone.addEventListener('click', function () {
            currentIndex = idx;
            selecionarHabilidade(currentIndex);
        });
    });

    configurarNavegacao();

    window.addEventListener('resize', function () {
        const newWidth = window.innerWidth;
        if (newWidth !== currentWidth) {
            currentWidth = newWidth;
            configurarNavegacao();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const moreButton = document.querySelector('.projetos__more-button');
    const verMaisSpan = document.querySelector('.projetos__ver-mais');
    const segundaLinha = document.querySelectorAll('.segunda-linha');
    let mostrandoMais = false;

    function toggleMore() {
        mostrandoMais = !mostrandoMais;

        segundaLinha.forEach(item => {
            item.style.display = mostrandoMais ? 'flex' : 'none';
        });

        verMaisSpan.textContent = mostrandoMais ? 'ver menos' : 'ver mais';

        moreButton.style.transform = mostrandoMais ? 'rotate(135deg)' : 'rotate(315deg)';
    }

    moreButton.addEventListener('click', toggleMore);
    verMaisSpan.addEventListener('click', toggleMore);
});