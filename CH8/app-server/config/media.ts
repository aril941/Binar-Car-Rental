import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

class Media {
  private _upload;
  private _storage;
  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    this._storage = cloudinary.config({
      cloud_name: 'dbsnmbhhl', 
      api_key: '344453513556719', 
      api_secret: 'W3zrNv4xvEb2yy33m4LNm_6ukyU' 
    });
  }

  get upload() {
    return this._upload;
  }

  get storage() {
    return this._storage;
  }
}

export default new Media();
