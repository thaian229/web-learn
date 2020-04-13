window.onload = () => {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // chặn mặc định của 1 form 

            const keyWord = document.querySelector('.search-input').value;
            fetch(`/search-questions?keyword=${keyWord}`, { // pass by url query
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    // console.log(result);
                    // clear 
                    document.querySelector('.search-result').innerHTML=``;
                    // then print result
                    result.data.forEach((question) => {
                        const questionElement = `
                        <div>
                            <div>${question.questionContent}</div>
                            <div>Like: ${question.like}</div>
                            <div>Dislike: ${question.dislike}</div>
                        </div>
                        `;

                        document.querySelector('.search-result').insertAdjacentHTML('beforeend',questionElement);
                    });
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        window.alert(error.message);
                    }
                });
        });
    }
};