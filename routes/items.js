const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  const items = router.get('../api/items', (request, response) => {
    return response;
  });
  res.render(items);
});

module.exports = router;
