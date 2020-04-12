const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Define routers:
app.use(express.static('public')); // set public as static folder
app.use(bodyParser.json());

app.get('/', (req, res) => {    // sendFile must use absolute path
    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});

// send through params
app.get('/question/:questionId', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/question.html'));
});

app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
});

app.post('/create-question', (req, res) => {
    // save question to database
    // questionContent
    // like
    // dislike
    // createdAt

    // save newQuestion
    fs.readFile('./data.json', (error, data) => {
        if(error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            const newQuestionId = new Date().getTime();
            const newQuestion = {
                id: newQuestionId,
                questionContent: req.body.questionContent,
                like: 0,
                dislike: 0,
                createdAt: new Date().toString(),
            };
            questionList.push(newQuestion);

            fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        id: newQuestionId,
                    });
                }
            });
        }
    });
});

app.get('/get-question-by-id/:questionId', (req, res) => {
    fs.readFile('./data.json', (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            let selectedQuestion;
            for (let i = 0; i < questionList.length; i += 1) {
                if (String(questionList[i].id) === req.params.questionId) {
                    selectedQuestion = questionList[i];
                    break;
                }
            }

            res.status(200).json({
                success: true,
                data: selectedQuestion,
            });
        }
    });
});

app.get('/get-random-question', (req, res) => {
    fs.readFile('./data.json', (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];
            res.status(200).json({
                success: true,
                data: randomQuestion,
            });
        }
    });
});

// Make listen to port 3000:
app.listen(3000);