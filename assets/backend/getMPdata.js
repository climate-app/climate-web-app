import { readFileSync } from 'fs';
import path from 'path';

export function getMPJson(id) {

    const filePath = path.join('data', 'theyvoteforyou', 'persons', `person-${id}.json`);

    try {

        let mpData = JSON.parse(readFileSync(filePath, 'utf8'));

        const idsToFilter = [3, 7, 14, 20, 33, 37, 64, 103, 127, 152, 183, 222, 225, 227, 228, 250, 260, 268, 273, 274, 285, 286,
            287, 316, 323, 141, 154, 162, 201, 231, 302]
        const idSet = new Set(idsToFilter)

        mpData.policy_comparisons = mpData.policy_comparisons.filter(x => idSet.has(x.policy.id))

        const voteBins = {
            '1': item => item.agreement > 95,
            '2': item => item.agreement >= 85 && item.agreement <= 95,
            '3': item => item.agreement >= 60 && item.agreement <= 85,
            '4': item => item.agreement >= 40 && item.agreement <= 60,
            '5': item => item.agreement >= 15 && item.agreement <= 40,
            '6': item => item.agreement >= 5 && item.agreement <= 15,
            '7': item => item.agreement < 5
        };

        const voteBinTitles = {
            '1': "Voted consistently for",
            '2': "Voted almost always for",
            '3': "Voted generally for",
            '4': "Voted a mixture of for and against",
            '5': "Voted generally against",
            '6': "Voted almost always against",
            '7': "Voted consistently against"
        }

        // Group by bins
        mpData.policy_comparisons = Object.keys(voteBins).reduce((acc, bin) => {
            acc[bin] = mpData.policy_comparisons.filter(voteBins[bin]);
            return acc;
        }, {});

        mpData.policy_comparisons = Object.keys(mpData.policy_comparisons).map((e,i) => {
            return {
                title: voteBinTitles[e],                
                policy_comparisons: mpData.policy_comparisons[e],
                voteBin: i
            }
        })

        return mpData

    } catch (err) {
        console.error('Error reading file:', err);
    }


}