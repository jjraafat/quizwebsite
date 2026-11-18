
const quizService = require('../services/quiz.service'); //importing the service 

// Get all available quizzes
const getAllQuizzes = async (req, res, next) => {
    
    try {
        const quizzes = await quizService.getAllQuizzes();
        //status(200)  the request succeeded.
        res.status(200).json({

            success: true,
            message: "Available quizzes retrieved successfully",
            data: quizzes

        });
    } catch (error) {
        next(error);
    }
};

 // Get questions for a selected quiz
const getQuizQuestions = async (req, res, next) => {
    try {
// Get the quiz ID from the URL
        const quizId = req.params.quizId;
 // Call the service to retrieve the questions
      const quiz = await quizService.getQuizQuestions(quizId);

        // Check if the quiz exists
        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }
        // Send the retrieved questions
        res.status(200).json({
            success: true,
            message: "Quiz questions retrieved successfully",
            data: quiz
        });

    } catch (error) {
        next(error);
    }
};


const checkQuizAnswer = async (req, res, next) => {

    try {

        // Get quiz ID from URL
        const quizId = req.params.quizId;

        // Get question ID and selected answer from request body
        const { questionId, selectedAnswer } = req.body;

        // Check that required data is provided
        if (!questionId || !selectedAnswer) {
            return res.status(400).json({
                success: false,
                message: "Question ID and selected answer are required"
            });
        }

        // Call service
        const result = await quizService.checkQuizAnswer(
            quizId,
            questionId,
            selectedAnswer
        );

        // Check if quiz exists
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        // Check if question exists
        if (result.questionNotFound) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Send feedback
        res.status(200).json({
            success: true,
            message: result.isCorrect ? "Correct answer!" : "Wrong answer!",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllQuizzes,
    getQuizQuestions,
    checkQuizAnswer
};

