const router = require("express").Router();

router.get("/test", (req,res) => {
    return res.status(200).json({test: 'Dishes test successful!'});
});

module.exports = router;