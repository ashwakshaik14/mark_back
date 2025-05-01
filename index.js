const express = require('express');
const fs = require('fs');
const cors = require('cors'); // ✅ import cors
const app = express();
const PORT = 5000;

app.use(cors()); // ✅ enable CORS

const user = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
const totalUsers = user.length;

app.get('/api/user', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    if (page < 1 || limit < 1) {
        return res.status(400).json({ error: "invalid page or limit" });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pagination = user.slice(startIndex, endIndex);

    res.json({
        data: pagination,
        total: totalUsers,
        page,
        limit
    });
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
