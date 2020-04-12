window.onload = () => {
    // const textArea = document.getElementById('text-input-1');
    // const counter = document.getElementById('counter-1');
    // const submit = document.getElementById('submit-1');
    // textArea.addEventListener('input', (event) => {
    //     console.log('content changed');
    //     const target = event.currentTarget; // Target that event triggered on
    //     const max = target.getAttribute('maxlength');
    //     let content = target.value; // target here is the TextArea
    //     let num = max - content.length;
    //     counter.innerText = `Character ${num}/200`;
    //     console.log(num);
    // });
    // submit.addEventListener('click', (event) => {
    //     let content = textArea.value;
    //     if(content.length === 0) {
    //         console.log(`Cannot submit empty text`);
    //     }
    //     else {
    //         console.log(`Success`);     
    //     }
    // });

    const textareaElement = document.querySelector('.input-question');
    if (textareaElement) {
        textareaElement.addEventListener('input', (event) => {
            const content = textareaElement.value;
            const chactersLeft = 200 - content.length;
            
            // display chactersLeft
            const chactersLeftElement = document.querySelector('.characters-left');
            if (chactersLeftElement) {
                chactersLeftElement.innerText = `${chactersLeft} characters left`;
            }
        });
    }

    // listen button click event
    const submitElement = document.querySelector('.submit-button');
    if (submitElement) {
        submitElement.addEventListener('click', (event) => {
            const textareaElement = document.querySelector('.input-question');
            if (textareaElement) {
                const content = textareaElement.value;
                if(!content || content.length === 0) {
                    // show error message
                    const inputContainerElement = document.querySelector('.input-container');
                    if (inputContainerElement) {
                        inputContainerElement.insertAdjacentHTML(
                            'beforeend',
                            `<div class='error-message'>Please input question</div>`,
                        )
                    }
                } 
                else {
                    // removeChild
                    const parentElement = document.querySelector('.input-container');
                    if (parentElement) {
                        const errorMessageElement = document.querySelector('.error-message');
                        if (errorMessageElement) {
                            parentElement.removeChild(errorMessageElement);
                        }
                    }

                    // send question to server
                    // url params
                    // url querry
                    const content = textareaElement.value;
                    fetch(`/create-question`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            questionContent: content,
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            if(data.success) {
                                // redirect to question detail

                                
                            } else {
                                window.alert(data.message);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            window.alert(error.message);
                        })
                }
            }
        });
    }
};