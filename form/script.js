let B7validator = {
    handleSubmit:(event) => {

        // Previni o evento padrão do botão, que seria de enviar o formulário
        event.preventDefault();
        // O envio começa como true no ínicio
        let send = true;

        let inputs = form.querySelectorAll('input');

        // Limpa os erros 
        B7validator.clearErrors();
        
        // um for nos inputs
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];

            // checa se os inputs foram cumpridos com as regras impostas
            let check = B7validator.checkInput(input);
            if (check !== true) {
                send = false;
                
                // Mostra o erro na tela 
                B7validator.showError(input, check);
            }
        }

        
        if(send) {
            form.submit()
        }
    },
    checkInput : (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null ) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return `Requer no mínimo ${rDetails[1]} caracteres`
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido';
                            }
                        }
                    break;
                }
            }

        } 
        
        return true;
        
    },
    showError : (input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    }, 
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7validator.handleSubmit)