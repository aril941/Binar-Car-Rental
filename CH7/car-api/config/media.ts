import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

class Media {
    private _upload;
    private _storage;
    constructor() {
        this._upload = multer({ storage: multer.memoryStorage() });
        cloudinary.config({
            cloud_name: 'dhwwzz0u2',
            api_key: '846751124312314',
            api_secret: 'dVSqHY7JRRLwhyMAnmCaIWl3kXc',
        });
        this._storage = cloudinary;
    }

    get upload() {
        return this._upload;
    }

    get storage() {
        return this._storage;
    }
}

export default new Media();
