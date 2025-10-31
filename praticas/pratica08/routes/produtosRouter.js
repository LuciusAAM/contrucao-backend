const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, (req, res) => {
  res.status(200).json([]);
});


module.exports = router;