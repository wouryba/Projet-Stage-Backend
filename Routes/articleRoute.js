const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes publiques
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.get('/articles', articleController.getAllArticles); // example


// Routes protégées
router.post('/', authMiddleware, articleController.createArticle);
router.put('/:id', authMiddleware, articleController.updateArticle); // 🔁 Modifier
router.delete('/:id', authMiddleware, articleController.deleteArticle); // 🗑️ Supprimer
router.post('/:id/like', authMiddleware, articleController.likeArticle);
router.post('/:id/dislike', authMiddleware, articleController.dislikeArticle);
router.post('/:id/comment', authMiddleware, articleController.addComment);
router.put('/:id', articleController.updateArticle);

module.exports = router;
