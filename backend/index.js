const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/submit-suggestion', (req, res) => {
    const { student_number, suggestion } = req.body;

    if (!student_number || !suggestion) {
        return res.status(400).json({ error: 'Student number and suggestion are required' });
    }

    db.run(
        `INSERT INTO suggestions (student_number, suggestion) VALUES (?, ?)`,
        [student_number, suggestion],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Suggestion submitted successfully', id: this.lastID });
        }
    );
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
