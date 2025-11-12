
document.addEventListener('DOMContentLoaded', () => {
    // CONTROLA SOMBRA DA BARRA FIXA
    const header = document.getElementById('topbar');
    if (header) {
        // estado inicial
        header.classList.remove('shadow-sm', 'shadow', 'shadow-md');
        header.classList.add('shadow-none');

        const checkScroll = () => {
            if (window.scrollY > 10) {
                header.classList.remove('shadow-none');
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
                header.classList.add('shadow-none');
            }
        };

        // roda no load para acertar estado inicial (caso a página já esteja rolada)
        checkScroll();
        window.addEventListener('scroll', checkScroll, { passive: true });
    }

    // CONTROLA SELETOR DE ESTADO
    const seletor = document.getElementById('seletorDeEstado');
    const displayEstado = document.getElementById('estadoSelecionado');

    if (seletor && displayEstado) {
        seletor.addEventListener('change', () => {
            displayEstado.textContent = seletor.value;
        });
    }

    // CONTROLA CARROSSEL SIMPLES (BANNER PRINCIPAL)
    const carouselContainer = document.getElementById('carrosselContainer');
    if (carouselContainer) {
        const carouselItems = carouselContainer.children;
        if (carouselItems.length > 0) {
            const paginationContainer = document.getElementById('carousel-pagination');
            let currentIndex = 0;
            const scrollInterval = 3000;
            let intervalId = null;

            for (let i = 0; i < carouselItems.length; i++) {
                const button = document.createElement('button');
                button.className = 'w-3 h-3 bg-black rounded-full overflow-hidden cursor-pointer relative transition-[width,border-radius] duration-400 ease';
                button.setAttribute('role', 'tab');
                button.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
                button.innerHTML = '<div class="h-full bg-red-500 w-0 rounded-md transition-none"></div>';
                button.addEventListener('click', () => {
                    goToSlide(i);
                });
                paginationContainer.appendChild(button);
            }

            const paginationButtons = paginationContainer.children;

            const updatePagination = () => {
                for (let i = 0; i < paginationButtons.length; i++) {
                    paginationButtons[i].classList.remove('w-10', 'rounded-md');
                    paginationButtons[i].classList.add('w-3', 'rounded-full');
                    if (i === currentIndex) {
                        paginationButtons[i].classList.remove('w-3', 'rounded-full');
                        paginationButtons[i].classList.add('w-10', 'rounded-md');
                    }
                }
            };

            const goToSlide = (index) => {
                currentIndex = index;
                const targetItem = carouselItems[currentIndex];
                if (targetItem) {
                    const scrollPosition = currentIndex === 0 ? 0 : targetItem.offsetLeft - carouselContainer.offsetLeft;
                    carouselContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
                updatePagination();

                clearInterval(intervalId);
                intervalId = setInterval(scrollToNextItem, scrollInterval);
            };

            const scrollToNextItem = () => {
                const nextIndex = (currentIndex + 1) % carouselItems.length;
                goToSlide(nextIndex);
            };

            goToSlide(0);
        }
    }

    // CONTROLA FECHAMENTO DO AVISO
    const avisoSection = document.getElementById('aviso');
    const fecharButton = document.getElementById('fecharAviso');

    if (avisoSection && fecharButton) {
        fecharButton.addEventListener('click', () => {
            avisoSection.style.display = 'none';
        });
    }

    // CONTROLA CARROSSEL DE DESTAQUES
    const carousel = document.getElementById('destaquesCarousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const destaquesPaginationContainer = document.getElementById('destaquesPagination');

    if (carousel && prevButton && nextButton && destaquesPaginationContainer) {
        const cards = carousel.querySelectorAll('.shrink-0');
        const cardWidth = cards.length > 0 ? cards[0].offsetWidth : 0;
        const cardGap = 24; // Corresponde a gap-6
        const scrollAmount = cardWidth + cardGap;

        const totalDots = 5;

        // Limpa os dots existentes para evitar duplicação
        destaquesPaginationContainer.innerHTML = '';

        // Cria os pontos de paginação
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full border-2 border-red-500 bg-transparent cursor-pointer transition-colors duration-300';
            dot.addEventListener('click', () => {
                carousel.scrollTo({
                    left: i * scrollAmount,
                    behavior: 'smooth'
                });
            });
            destaquesPaginationContainer.appendChild(dot);
        }

        const dots = destaquesPaginationContainer.querySelectorAll('button');

        const updateDestaquesPagination = () => {
            const currentIndex = Math.round(carousel.scrollLeft / scrollAmount);
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('bg-red-500');
                } else {
                    dot.classList.remove('bg-red-500');
                }
            });
        };

        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        carousel.addEventListener('scroll', updateDestaquesPagination);
        updateDestaquesPagination(); // Chamada inicial
    }

    // CONTROLA PAGINAÇÃO DAS OFERTAS
    const pageButtons = document.querySelectorAll('.ofertas-page-btn');
    const pages = document.querySelectorAll('.ofertas-page');

    if (pageButtons.length > 0 && pages.length > 0) {
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPage = button.getAttribute('data-page');

                // Esconde todas as páginas
                pages.forEach(page => {
                    page.classList.add('hidden');
                });

                // Mostra a página alvo
                const pageToShow = document.getElementById(`ofertas-page-${targetPage}`);
                if (pageToShow) {
                    pageToShow.classList.remove('hidden');
                }

                // Atualiza o estado ativo dos botões
                pageButtons.forEach(btn => {
                    btn.classList.remove('bg-red-500', 'text-white', 'border-red-500');
                    btn.classList.add('bg-white', 'hover:bg-gray-100', 'border-gray-300');
                });
                button.classList.add('bg-red-500', 'text-white', 'border-red-500');
                button.classList.remove('bg-white', 'hover:bg-gray-100', 'border-gray-300');
            });
        });
    }
});