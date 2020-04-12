window.onload = () => {
    let selectedQuestion;
    // get random question
    fetch('/get-random-question', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            selectedQuestion = data.data;
            document.querySelector('.question-content').innerHTML = data.data.questionContent;

        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });
};