const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile('index.html');
});

router.get('/about', (req, res) => {
  res.send('about');
});

module.exports = router;