import express from 'express';
import { join } from 'path';

const staticAssets = express.static(join(__dirname, '../../public'));

export default staticAssets;
