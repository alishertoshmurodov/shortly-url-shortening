const inputField = document.querySelector('#url-input');
const shortenButton = document.querySelector('#shorten-button');
const shortenerContainer = document.querySelector('.shortener');
const shortenerInput = document.querySelector('.shortener__input');
const copy = [];
const errorMessage = document.createElement('p');
errorMessage.classList.add('error-message-hidden');

shortenButton.addEventListener('click', function (e) {
    const url = inputField.value;
    const shorten = `https://api.shrtco.de/v2/shorten?url=${url}`;

    errorMessage.setAttribute('class', 'error-message');
    shortenerInput.appendChild(errorMessage);


    fetch(shorten).then(data => data.json()).then(json => {
        let isValid = json.ok;
        if (inputField.value.length === 0) {
            inputField.classList.add('error');
            errorMessage.textContent = 'Please add a link';
            errorMessage.classList.remove('error-message-hidden');
        }
        else if (!isValid) {
            inputField.classList.add('error');
            errorMessage.textContent = 'Invalid link';
        }
        else {
            errorMessage.textContent = '';
            errorMessage.classList.add('error-message-hidden');
            inputField.classList.remove('error');
            const shortenedLink = document.createElement('div');
            shortenedLink.setAttribute('class', 'shortened-link');
            const inputLink = document.createElement('p');
            const outputLinkContainer = document.createElement('div');
            outputLinkContainer.setAttribute('class', 'output-link');
            const outputLink = document.createElement('a');
            outputLink.setAttribute('target', '_blank');

            const outputCopyBtn = document.createElement('div');
            outputCopyBtn.textContent = 'Copy';




            fetch(shorten)
                .then(data => data.json())
                .then(json => {
                    outputLink.textContent = json.result.full_short_link;
                    outputLink.href = json.result.full_short_link;
                    inputLink.textContent = json.result.original_link;
                });

            outputLinkContainer.appendChild(outputLink);
            outputLinkContainer.appendChild(outputCopyBtn);
            shortenedLink.appendChild(inputLink);
            shortenedLink.appendChild(outputLinkContainer);
            shortenerContainer.appendChild(shortenedLink);
            copy.push(outputCopyBtn);
            outputCopyBtn.addEventListener('click', function (e) {
                const buttonsAll = document.querySelectorAll('.output-link div');
                buttonsAll.forEach(element => {
                    element.textContent = 'Copy';
                    element.removeAttribute('class');
                });
                navigator.clipboard.writeText(outputCopyBtn.previousElementSibling.textContent);
                if (outputCopyBtn.textContent === 'Copy') {
                    outputCopyBtn.textContent = 'Copied!';
                    outputCopyBtn.setAttribute('class', 'copied-background');
                }
            });

            inputField.value = '';
        }
    });
});


// burger menu 

const burgerIconEl = document.querySelector('.burger-icon');
const menuList = document.querySelector('.header__menu-list');
const sign = document.querySelector('.header__sign');
const headerMenuEl = document.querySelector('.header__menu');
const mobileMenu = document.createElement('div');

burgerIconEl.addEventListener('click', function (e) {
    if (menuList.hasAttribute('style')) {
        menuList.removeAttribute('style');
        sign.removeAttribute('style');
    } else {
        menuList.style = "display:flex";
        sign.style = "display:flex";
    }

});












