// get file
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'text.txt');
    const text = fs.readFileSync(filePath, 'utf8');

    res.status(200).json({ text });
}