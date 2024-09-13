import express from 'express';
import parts from '../models/addspareparts.js'; // Assuming 'addspareparts' is an ES6 module
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import { getAllSpareParts, oneSpareParts } from '../controllers/addparts.controller.js'; // Import the controller function

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Define the getAllSpareParts controller function
router.get('/getAllSpareParts', getAllSpareParts);
router.get('/oneSpareParts/:id',oneSpareParts);

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extname(file.originalname)); // Unique filename
    }
});

// Multer file filter to restrict file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed.'), false); // Reject the file
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Route to handle adding a new product
router.post('/addparts', upload.single('image'), async (req, res) => {
    try {
        // Create a new Product object with the provided data
        const newProduct = new parts({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.path 
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct); // Respond with the saved product data
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
