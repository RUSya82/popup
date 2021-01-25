let links = document.querySelectorAll('.popup_link');

if(links){
    links.forEach((item, index) => {
       item.addEventListener('click', (e) => {
           let popupLink = item.getAttribute('href').replace('#', '');
           let popup = document.getElementById(popupLink);
           popupOpen(popup);
           popup.addEventListener('click', (e) => {
              if(!e.target.closest('.popup_content')) {
                  popupClose(popup);
              }
           });
           let closeButton = popup.querySelector('.popup_close');
           closeButton.addEventListener('click', (e) => {
               let currentPopup = e.target.closest('.popup');
               if(currentPopup){
                   popupClose(currentPopup);
               }
           })
       })
    });
}

document.addEventListener('keydown', e => {
    if (e.which === 27) {
        let activePopup = document.querySelector('.popup.open');
        if(activePopup){
            popupClose(activePopup);
        }
    }
});

function popupOpen(popup) {
    if(popup){
        let activePopup = document.querySelector('.popup.open');
        if(activePopup){
            popupClose(activePopup);
        }
        popup.classList.add('open');
    }
}
function popupClose(popup) {
    if(popup){
        popup.classList.remove('open');
    }
}