const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const questionModel = require('./models/question.model');

// connect to db (mongoDB)
mongoose.connect(
    'mongodb://localhost:27017/quyetde',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Connect to MongoDB success');

            const app = express();

            // Define routers:
            app.use((req, res, next) => {
                // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
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

            app.get('/search', (req, res) => {
                res.sendFile(path.resolve(__dirname, './public/html/search.html'));
            });

            app.post('/create-question', (req, res) => {
                // // save question to database
                // // questionContent
                // // like
                // // dislike
                // // createdAt

                // // save newQuestion
                // fs.readFile('./data.json', (error, data) => {
                //     if (error) {
                //         res.status(500).json({
                //             success: false,
                //             message: error.message,
                //         });
                //     } else {
                //         const questionList = JSON.parse(data);
                //         const newQuestionId = new Date().getTime();
                //         const newQuestion = {
                //             id: newQuestionId,
                //             questionContent: req.body.questionContent,
                //             like: 0,
                //             dislike: 0,
                //             createdAt: new Date().toString(),
                //         };
                //         questionList.push(newQuestion);

                //         fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
                //             if (error) {
                //                 res.status(500).json({
                //                     success: false,
                //                     message: error.message,
                //                 });
                //             } else {
                //                 res.status(201).json({
                //                     success: true,
                //                     id: newQuestionId,
                //                 });
                //             }
                //         });
                //     }
                // });

                questionModel.create(
                    {
                        questionContent: req.body.questionContent,
                    }, 
                    (error, data) => {
                        // console.log(data);
                        if (error) {
                            console.log(error);
                            res.status(500).json({
                                success: false,
                                message: error.message,
                            });
                        } else {
                            res.status(201).json({
                                success: true,
                                // data: {
                                //     ...data, // lấy tất cả các trường của object data (trả vào trong call back)
                                //     id: data._id, // nếu bị trùng tên thì lấy cái ở dưới (thằng đc viết sau)
                                // },
                                id: data._id,
                            });
                        }
                    });
            });

            app.get('/get-question-by-id/:questionId', (req, res) => {
                // fs.readFile('./data.json', (error, data) => {
                //     if (error) {
                //         res.status(500).json({
                //             success: false,
                //             message: error.message,
                //         });
                //     } else {
                //         const questionList = JSON.parse(data);
                //         let selectedQuestion;
                //         for (let i = 0; i < questionList.length; i += 1) {
                //             if (String(questionList[i].id) === req.params.questionId) {
                //                 selectedQuestion = questionList[i];
                //                 break;
                //             }
                //         }

                //         res.status(200).json({
                //             success: true,
                //             data: selectedQuestion,
                //         });
                //     }
                // });
                
                questionModel.findById(req.params.questionId, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        });
                    } else {
                        // console.log({
                        //     ...data,
                        //     id: data._id,
                        // });
                        res.status(200).json({
                            success: true,
                            data: {
                                ...data._doc, // Nhìn trả về ở console (trên) để hiểu sao cần ._doc 
                                id: data._id,
                            },
                        });
                    }
                });
            });

            app.get('/get-random-question', (req, res) => {
                // fs.readFile('./data.json', (error, data) => {
                //     if (error) {
                //         res.status(500).json({
                //             success: false,
                //             message: error.message,
                //         });
                //     } else {
                //         const questionList = JSON.parse(data);
                //         const randomQuestion = questionList[Math.floor(Math.random() * questionList.length)];
                //         res.status(200).json({
                //             success: true,
                //             data: randomQuestion,
                //         });
                //     }
                // });

                questionModel.aggregate([
                    {$sample: {size: 1}},
                ]).exec((error, data) => { // data here is an array of object.
                    if (error) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        });
                    } else {
                        console.log(data);
                        res.status(200).json({
                            success: true,
                            data: {
                                ...data[0],
                                id: data[0]._id,
                            },
                        });
                    }
                });
            });

            // get: get data
            // post: make new record/data
            // put: update, change,... existed data

            app.put('/vote', (req, res) => {
                // fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
                //     if (error) {
                //         res.status(500).json({
                //             success: false,
                //             message: error.message,
                //         });
                //     } else {
                //         const questionList = JSON.parse(data);
                //         for (let i = 0; i < questionList.length; i += 1) {
                //             if (String(questionList[i].id) === String(req.body.id)) { // Để ý cùng type dữ liệu khi so sánh === 
                //                 questionList[i][req.body.vote] += 1;
                //             }
                //         }

                //         fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
                //             if (error) {
                //                 res.status(500).json({
                //                     success: false,
                //                     message: error.message,
                //                 });
                //             } else {
                //                 res.status(201).json({
                //                     success: true,
                //                 });
                //             }
                //         });
                //     }
                // });

                // Check whether the question exists
                questionModel.findById(req.body.id, (error, data) => {
                    if (error) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        });
                    } else if (!data) {
                        res.status(404).json({
                            success: false,
                            message: 'Question not found',
                        });
                    } else {
                        questionModel.findByIdAndUpdate(
                            req.body.id, 
                            {$inc: {[req.body.vote]: 1}}, 
                            (error) => {
                                if (error) {
                                    res.status(500).json({
                                        success: false,
                                        message: error.message,
                                    });
                                } else {
                                    res.status(201).json({
                                        success: true,
                                    });
                                }
                            }
                        );
                    }
                });
            });

            app.get('/search-questions', (req, res) => {
                const keyword = req.query.keyword; // using method REGEX: Regular expression. use for search and validate

                questionModel.find(
                    {   // i is ignore case
                        questionContent: {$regex: keyword, $options: 'i'}, // options co' s nha
                    }, (error, data) => { // data here is an array
                        console.log(error, data);
                        if (error) {
                            res.status(500).json({
                                success: false,
                                message: error.message,
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                data: data,
                                total: data.length,
                            });
                        }
                    });
            });

            // Make listen to port 3000:
            // app.listen(3000);
            app.listen(3001);
        }
    }
);