import { v4 as uuidv4 } from 'uuid';

import { fetchDbFile, writeDbFile } from '../db/utils.js';
import * as timeHelper from '../utils/time.js';

export class BaseModel {
    createdDate;
    lastUpdatedDate;
    constructor(props) {
        this.createdDate = props?.createdDate;
        this.lastUpdatedDate = props?.lastUpdatedDate;
    }

    async save() {
        this.validateData();

        if (!this.getPrimaryKeyValue()) {
            // We're saving a new object, generate a random id
            this.setPrimaryKeyValue(uuidv4());
            this.createdDate = timeHelper.getUnixTimestamp();
        }

        this.lastUpdatedDate = timeHelper.getUnixTimestamp();

        const data = this.toDbJson();

        // Note: in a real app this would be talking to an actual database. Just using a local file
        // as the "database" for this project.
        const fullData = await fetchDbFile();
        fullData[this.getPrimaryKeyValue()] = data;
        await writeDbFile(fullData);
    }

    static async load(primaryKeyValue) {
        const fullData = await fetchDbFile();
        if (!fullData[primaryKeyValue]) {
            return null;
        }

        const objData = fullData[primaryKeyValue];
        return new this(objData);
    }

    validateData() {
        // Nothing to validate for the base model, though each model
        // type may want to validate their own fields.
    }
    getPrimaryKeyValue() {
        throw new Error('This method needs to be overridden');
    }
    setPrimaryKeyValue(uuid) {
        throw new Error('This method needs to be overridden');
    }
    toPublicJson() {
        throw new Error('This method needs to be overridden');
    }

    toDbJson() {
        return {
            'createdDate': this.createdDate,
            'lastUpdatedDate': this.lastUpdatedDate,
        };
    }
}
