/*
//
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Маршрут для отдачи статических файлов
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(process.cwd(), 'public')));

// Маршрут для получения данных из data.json
app.get('/products', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, './data/data.json'), 'utf-8');
        const products = JSON.parse(data).myProducts;
        res.json(products);
    } catch (err) {
        res.status(500).send('Error reading data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//
*/


//
import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 10000;

// Получение текущего каталога файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware для разбора JSON-запросов
app.use(express.json());

// Маршрут для отдачи статических файлов из каталога '../client'
//app.use(express.static(path.join(__dirname, '../client')));

//app.use(express.static(path.join(process.cwd(), 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'store.html'));
});

// Маршрут для получения данных из data.json
app.get('/products', async (req, res) => {
    try {
        //const data = await readFile(path.join(__dirname, 'data', 'data.json'), 'utf8'); // or
        const data = await readFile(path.join(process.cwd(), 'data', 'data.json'), 'utf8'); // or
        const products = JSON.parse(data).myProducts;
        res.json(products);
        console.log(products);
    } catch (err) {
        res.status(500).send('Error reading data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//

