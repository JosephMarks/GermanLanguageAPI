const express = require('express');
const { getAllWords, addWord } = require('../data/db');

const router = express.Router();

router.get('/words', async (req, res) => {
    try {
        const words = await getAllWords();
        res.json(words);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/words', async (req, res) => {
    const { word, meaning } = req.body;
    if (!word || !meaning) {
        return res.status(400).json({ error: 'Word and meaning are required' });
    }

    try {
        const newWord = await addWord(word, meaning);
        res.status(201).json(newWord);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
