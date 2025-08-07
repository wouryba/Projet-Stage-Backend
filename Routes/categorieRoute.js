const express = require('express');
const router = express.Router();

// Contrôleurs fictifs à remplacer par vos vraies fonctions
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categorieController');

// Obtenir toutes les catégories
router.get('/', getAllCategories);

// Obtenir une catégorie par ID
router.get('/:id', getCategoryById);

// Créer une nouvelle catégorie
router.post('/', createCategory);

// Mettre à jour une catégorie
router.put('/:id', updateCategory);

// Supprimer une catégorie
router.delete('/:id', deleteCategory);

module.exports = router;
