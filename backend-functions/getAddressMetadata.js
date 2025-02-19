import child from 'node:child_process'
import os from 'node:os'
import path from "node:path"

export function getAddressMetadata(id) {
    
    //const filePath = path.join('data', 'address-id-coordinates-mp-id.csv');
    const filePath = path.join('data', 'address-id-coordinates-mp-id-gnaf-core-columns.csv');

    const platform = os.platform();
    
    const execCommand = platform === 'win32'
        ? `findstr "${id}" "${filePath}"`
        : `grep "${id}" "${filePath}"`;

    let addressMetadataBuffer = child.execSync(execCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        //console.log(`stdout:\n${stdout}`);
        return stdout
    })

    // Split the CSV string and create an object by mapping keys to values
    const addressMetadataKeys = ["id", "LATITUDE", "LONGITUDE", "MP_ID"];

    let addressMetadata = addressMetadataBuffer
        .toString()
        .replace(/(\r\n|\n|\r)/gm, "")
        .split(",")
        .reduce((obj, value, index) => {
            obj[addressMetadataKeys[index]] = value
            return obj;
        }, {});

    addressMetadata.LATITUDE = Number(addressMetadata.LATITUDE)
    addressMetadata.LONGITUDE = Number(addressMetadata.LONGITUDE)

    return addressMetadata
}