import express from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';

import * as productHandler from './server/handlers/product_handler.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/product', asyncHandler(productHandler.getProduct));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
