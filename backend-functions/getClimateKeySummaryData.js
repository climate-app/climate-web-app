import { readFileSync } from 'fs';
import path from 'path';

export function getClimateKeySummaryData(nrm) {

    // Like this for cross platform OS
    const filePath = path.join('data', 'climate-key-messages-subcluster.json');

    try {

        let text = JSON.parse(readFileSync(filePath, 'utf8'));

        let nrmText = text.filter(x => x.key == nrm)

        return nrmText[0]

    } catch (err) {
        console.error('Error reading file:', err);
    }


}