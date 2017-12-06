const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('welcome');
});

router.get('/about', (req, res) => {
  res.send('about');
});

module.exports = router;