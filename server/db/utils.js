import { promises as fs } from 'fs';
import path from 'path';

export const fetchDbFile = async () => {
    const dataFile = getDataFile();
    const fullFileData = await fs.readFile(dataFile);
    return JSON.parse(fullFileData.toString());
};

export const writeDbFile = async (fullDataObj) => {
    const jsonString = JSON.stringify(fullDataObj);
    const dataFile = getDataFile();
    await fs.writeFile(dataFile, jsonString);
};

const getDataFile = () => {
    // __dirname does not exist by default with es6 modules
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    return path.join(__dirname, '..', `data/data.json`);
}
