document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM
    const card = document.getElementById('card');
    const step2 = document.getElementById('step-2'); // Agregamos la referencia al contenedor del paso 2
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const rsvpForm = document.getElementById('rsvp-form');
    const btnSubmit = document.getElementById('btn-submit');

    // Lógica de Navegación (Fronting)
    btnNext.addEventListener('click', () => {
        card.classList.add('show-form');
    });

    btnPrev.addEventListener('click', () => {
        card.classList.remove('show-form');
    });

    // Lógica de Envío (Integración con Google Forms)
    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que la página recargue

        // 1. URL de tu formulario (cambiamos /viewform por /formResponse)
        const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdb9QufgkPj5xKZxMp1iVAyatExMqCG9yKUPR76diGZ80hpOA/formResponse';

        // 2. Construir los datos usando los 'entry' de tu Google Form
        const formData = new URLSearchParams();
        
        formData.append('entry.359980406', document.getElementById('nombre').value); // Nombre y Apellido
        formData.append('entry.1948544035', document.getElementById('empresa').value); // Empresa / Marca
        formData.append('entry.2088586359', document.getElementById('email').value); // Correo Corporativo
        formData.append('entry.340380742', document.getElementById('dni').value); // DNI
        formData.append('entry.52927284', document.getElementById('dieta').value); // Restricciones Alimenticias

        // Opcional: Cambiar texto del botón mientras envía para dar feedback visual
        const originalBtnText = btnSubmit.textContent;
        btnSubmit.textContent = 'Enviando...';
        btnSubmit.disabled = true;

        // 3. Ejecutar el Fetch
        fetch(formURL, {
            method: 'POST',
            mode: 'no-cors', // Fundamental para enviar a GForms sin bloqueos CORS del navegador
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
        .then(() => {
            // Como estamos en 'no-cors', la promesa siempre se resuelve exitosa si se envía a la red.
            
            // Aplicamos la clase CSS para ocultar títulos, el form y mostrar el mensaje final
            step2.classList.add('success-mode');
            
            // Ocultar botón de volver (para que el usuario no vuelva al form vacío)
            btnPrev.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error al registrar:', error);
            alert('Hubo un error al procesar tu inscripción. Por favor intenta de nuevo.');
        })
        .finally(() => {
            // Restaurar botón (por si falló y el usuario quiere intentar de nuevo)
            btnSubmit.textContent = originalBtnText;
            btnSubmit.disabled = false;
        });
    });
});
