const fs = require('fs').promises;  
const path = require('path');


// Get all available quizzes
const getAllQuizzes = async () => {

    // Read quizzes.json file
    const filePath = path.join(__dirname, '../../src/models/quizzes.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    // Convert JSON text into JavaScript array
    const quizzes = JSON.parse(fileData);

    // Return only quiz information needed by frontend
    return quizzes.map(quiz => ({
        id: quiz.id,
        title: quiz.title,
        
    }));

};
 // Get questions for a selected quiz
const getQuizQuestions = async (quizId) => {

    // Read quizzes.json file
    const filePath = path.join(__dirname, '../../src/models/quizzes.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    // Convert JSON text into JavaScript array
    const quizzes = JSON.parse(fileData);

    // Find the selected quiz using its ID
    const quiz = quizzes.find(
        quiz => String(quiz.id) === String(quizId)
    );

    // Check if the quiz exists
    if (!quiz) {
        return null;
    }

    // Return questions without correct answers
    const questions = quiz.questions.map(question => ({
        id: question.id,
        question: question.question,
        options: question.options
    }));

    return {
        quizId: quiz.id,
        title: quiz.title,
        questions: questions
    };
};
const checkQuizAnswer = async (quizId, questionId, selectedAnswer) => {

    // Read quizzes.json file
    const filePath = path.join(__dirname, '../../src/models/quizzes.json');

    const fileData = await fs.readFile(filePath, 'utf8');

    // Convert JSON text into JavaScript array
    const quizzes = JSON.parse(fileData);

    // Find the selected quiz
    const quiz = quizzes.find(
        quiz => String(quiz.id) === String(quizId)
    );

    // Check if quiz exists
    if (!quiz) {
        return null;
    }

    // Find the selected question
    const question = quiz.questions.find(
        question => String(question.id) === String(questionId)
    );

    // Check if question exists
    if (!question) {
        return { questionNotFound: true };
    }

    // Compare the student's answer with the correct answer
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Return the result
    return {
        questionId: question.id,
        selectedAnswer: selectedAnswer,
        isCorrect: isCorrect,
        correctAnswer: question.correctAnswer
    };
};

module.exports = {
    getAllQuizzes,
    getQuizQuestions,
    checkQuizAnswer
};
