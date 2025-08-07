// controllers/categorieController.js

exports.getAllCategories = (req, res) => {
  res.status(200).json({ message: 'Liste de toutes les catégories' });
};

exports.getCategoryById = (req, res) => {
  res.status(200).json({ message: `Catégorie avec l'ID ${req.params.id}` });
};

exports.createCategory = (req, res) => {
  res.status(201).json({ message: 'Catégorie créée avec succès' });
};

exports.updateCategory = (req, res) => {
  res.status(200).json({ message: `Catégorie ${req.params.id} mise à jour` });
};

exports.deleteCategory = (req, res) => {
  res.status(200).json({ message: `Catégorie ${req.params.id} supprimée` });
};
