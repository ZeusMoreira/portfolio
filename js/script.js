// Função para revelar elementos ao rolar a página
function reveal() {
    const reveals = document.querySelectorAll('.hidden, .hidden-right, .hidden-top');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach(function (element) {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
}

// Evento de scroll para revelar elementos
window.addEventListener('scroll', reveal);
reveal(); // Executa a função para mostrar os elementos inicialmente

document.addEventListener("DOMContentLoaded", function () {
    // Seleção unificada de elementos
    const icones = document.querySelectorAll('.icone');
    const iconeContainers = document.querySelectorAll('.icone-container');
    const descricoes = document.querySelectorAll('.descricao-habilidade p');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    let currentIndex = 0;
    let currentWidth = window.innerWidth; // Armazenar a largura da tela

    // Reseta a seleção dos ícones e descrições
    function resetarSelecao() {
        icones.forEach(icone => icone.classList.remove('habilidade-selecionada'));
        descricoes.forEach(descricao => descricao.classList.remove('mostrando'));
    }

    // Seleciona a habilidade com base no índice
    function selecionarHabilidade(index) {
        resetarSelecao();
        const icone = iconeContainers[index].querySelector('.icone');
        const habilidade = icone.getAttribute('data-habilidade');

        icone.classList.add('habilidade-selecionada');
        document.getElementById(`descricao-${habilidade}`).classList.add('mostrando');
    }

    // Mostra a habilidade correspondente ao índice
    function mostrarHabilidade(index) {
        iconeContainers.forEach((container, idx) => {
            container.style.display = (idx === index || currentWidth > 830) ? 'block' : 'none';
        });
        selecionarHabilidade(index);
    }

    // Configura a navegação entre ícones
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

    // Adiciona evento de clique aos ícones
    icones.forEach((icone, idx) => {
        icone.addEventListener('click', function () {
            currentIndex = idx;
            selecionarHabilidade(currentIndex);
        });
    });

    // Configuração inicial
    configurarNavegacao();

    // Evento de resize da janela
    window.addEventListener('resize', function () {
        const newWidth = window.innerWidth;
        if (newWidth !== currentWidth) {
            currentWidth = newWidth; // Atualiza a largura da tela
            configurarNavegacao(); // Reconfigura a navegação
        }
    });
});