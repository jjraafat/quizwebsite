const express = require('express');
const quizController = require('../controllers/quiz.controller');



const router = express.Router(); //express.Router() creates a separate routing system.


// API 1: Get all available exams
router.get('/retrieve/quizzes', quizController.getAllQuizzes);


// API 2: Get questions for a selected exam
router.get('/:quizId/questions', quizController.getQuizQuestions);

// API 3: Check student's answer
router.post('/:quizId/check-answer', quizController.checkQuizAnswer);




module.exports = router;


