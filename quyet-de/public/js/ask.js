window.onload = () => {
    const textArea = document.getElementById('text-input-1');
    const counter = document.getElementById('counter-1');
    const submit = document.getElementById('submit-1');
    textArea.addEventListener('input', (event) => {
        console.log('content changed');
        const target = event.currentTarget; // Target that event triggered on
        const max = target.getAttribute('maxlength');
        let content = target.value; // target here is the TextArea
        let num = max - content.length;
        counter.innerText = `Character ${num}/200`;
        console.log(num);
    });
    submit.addEventListener('click', (event) => {
        let content = textArea.value;
        if(content.length === 0) {
            console.log(`Cannot submit empty text`);
        }
        else {
            console.log(`Success`);     
        }
    });
};