

    // CONTROLA FECHAMENTO DO AVISO
    const avisoSection = document.getElementById('aviso');
    const fecharButton = document.getElementById('fecharAviso');

    if (avisoSection && fecharButton) {
        fecharButton.addEventListener('click', () => {
            avisoSection.style.display = 'none';
        });
    }

    