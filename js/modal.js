// MODAL WINDOW

const modal = document.querySelector('.modal');
const modalOpenButton = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');

let isModalShownThisSession = false;

const openModal = () => {
    if (modal && !isModalShownThisSession) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        isModalShownThisSession = true;
    }
};

const closeModal = () => {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        isModalShownThisSession = true;
    }
};

if (modalOpenButton) {
    modalOpenButton.onclick = () => {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };
}

if (modalCloseButton) {
    modalCloseButton.onclick = closeModal;
}

if (modal) {
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
}

if (!isModalShownThisSession) {
    window.addEventListener('scroll', function scrollHandler() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            openModal();
            window.removeEventListener('scroll', scrollHandler);
        }
    });
}

if (!isModalShownThisSession) {
    let timeoutId = setTimeout(() => {
        openModal();
    }, 10000);

    const resetTimeout = () => {
        if (!isModalShownThisSession) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                openModal();
            }, 10000);
        }
    };

    document.addEventListener('mousemove', resetTimeout);
    document.addEventListener('keydown', resetTimeout);
    document.addEventListener('click', resetTimeout);
    document.addEventListener('scroll', resetTimeout);
}
