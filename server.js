const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Service is running successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
