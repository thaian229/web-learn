window.onload = () => {
    // console.log('Question');
    // fetch api => get question by id
    const urlParts = window.location.pathname.split('/');
    console.log(urlParts);
    const questionId = urlParts[urlParts.length - 1];

    fetch(`/get-question-by-id/${questionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if(data.data) {
                // set question content
                console.log(data);
                document.querySelector('.question-content').innerText = data.data.questionContent;
                document.querySelector('.total-vote').innerHTML = Number(data.data.like) + Number(data.data.dislike);

                let likePercent = 0;
                let dislikePercent = 0;
                if(data.data.like === 0 && data.data.dislike === 0) {
                    likePercent = 50;
                    dislikePercent = 50;
                } else {
                    likePercent = ((data.data.like / (data.data.like + data.data.dislike))*100).toFixed(2);
                    dislikePercent = 100 - Number(likePercent);
                }
                
                document.querySelector('.dislike').innerHTML = `${dislikePercent}%`;
                document.querySelector('.like').innerHTML = `${likePercent}%`;
            } else {
                window.alert('Question not found');
            }
        })
        .catch((error) => {
            console.log(error);
            window.alert(error.message);
        });


    // add event listener
    document.querySelector('.other-question-button').addEventListener('click', (event) => {
        window.location.href = '/';
    });
};