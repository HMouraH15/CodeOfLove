var btn = document.querySelector(".no");
var position = 0;
var isAnimating = false;

btn.addEventListener("click", function() {
    if (!isAnimating) {
        isAnimating = true;
        position = position === 0 ? 150 : 0;
        btn.style.transform = `translate(0px, ${position}px)`;
        btn.style.transition = "all 0.2s ease";

        setTimeout(function() {
            isAnimating = false;
        }, 200);
    }
});

btn.addEventListener("mouseover", function() {
    if (!isAnimating) {
        isAnimating = true;
        position = position === 0 ? 150 : 0;
        btn.style.transform = `translate(0px, ${position}px)`;
        btn.style.transition = "all 0.2s ease";

        setTimeout(function() {
            isAnimating = false;
        }, 200);
    }
});

const sim = document.getElementById('yes');

sim.addEventListener("click", () => {
  let timerInterval;

  Swal.fire({
    title: 'Obrigado 😍',
    html: 'Prometo lhe fazer feliz. 💘',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      function showGiftModal() {
        Swal.fire({
          title: 'Escolha um presente para você:',
          html: `
            <div class="gift-section">
              <label for="gift">Escolha um presente para você:</label>
              <select id="gift" required>
                <option value="" disabled selected>Me deixe fazer você feliz....</option>
                <option value="Hopi-Hari">Hopi-Hari</option>
                <option value="Roupa">Roupa</option>
                <option value="perfume">Perfume</option>
                <option value="viagem">Viagem</option>
                <option value="algo-gamer">Algo gamer</option>
              </select>
            </div>
          `,
          showCancelButton: false,
          confirmButtonText: 'Confirmar',
          preConfirm: () => {
            const gift = Swal.getHtmlContainer().querySelector('#gift').value;
            if (!gift) {
              Swal.showValidationMessage('Por favor, escolha um presente!');
              return false;
            }
            return gift;
          }
        }).then((result) => {
          if (result.isConfirmed) {
            // Crie uma mensagem personalizada
            const message = `Eu escolhi ${result.value} como meu presente! 😍`;
            
            // Crie o link para o WhatsApp
            const whatsappNumber = "5511989877235"; 
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            Swal.fire({
              title: 'Parabéns!',
              text: `Você escolheu ${result.value}.`,
              icon: 'success',
              confirmButtonText: 'Enviar pelo WhatsApp',
              preConfirm: () => {
                window.open(whatsappLink, '_blank');
              }
            }).then(() => {
              window.location.reload();
            });
          }
        });
      }
      
      showGiftModal();
    }
  });
});
