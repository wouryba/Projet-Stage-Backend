const Article = require('../models/Article');

// ✅ Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email');
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// ✅ Récupérer un article par ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email');
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    // Incrémenter les vues
    article.views += 1;
    await article.save();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// ✅ Créer un nouvel article
exports.createArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Titre et contenu sont requis.' });
  }

  try {
    const newArticle = new Article({
      title,
      content,
      author: req.userId
    });

    await newArticle.save();

    res.status(201).json({
      message: 'Article créé avec succès.',
      article: newArticle
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// ✅ Mettre à jour un article
exports.updateArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    res.status(200).json({
      message: 'Article mis à jour.',
      article
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// ✅ Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    res.status(200).json({ message: 'Article supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// ✅ Liker un article
exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    article.likes += 1;
    await article.save();

    res.status(200).json({
      message: 'Article liké.',
      likes: article.likes
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};

// ✅ Ajouter un commentaire à un article
exports.addComment = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Le commentaire ne peut pas être vide.' });
  }

  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé.' });
    }

    article.comments.push({
      user: req.userId,
      text
    });

    await article.save();

    res.status(201).json({
      message: 'Commentaire ajouté.',
      comments: article.comments
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
};
