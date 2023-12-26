import { NextFunction, Request, Response } from "express";
import { IRestController } from "../../interfaces/iRest";
import ServiceCars from "../../services/ServiceCars";
import { IUsers } from "../../models/Users";
import { ICars } from "../../models/Cars";
import { IRequestWithAuth } from "../../middlewares/Auth";
import ResponseBuilder from "../../utils/responBuilder";
import media from "../../config/media";
import { type UploadApiErrorResponse } from "cloudinary";

class ControllerCars {
  private _serviceCars: ServiceCars;

  constructor(serviceCars: ServiceCars) {
    this._serviceCars = serviceCars;
  }

  upload() {
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        if (req.file) {
          const fileBase64 = req.file.buffer.toString("base64");
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          const resultUpload = await media.storage.uploader.upload(
            file,
            (err: any, result: any) => {
              if (err) {
                return ResponseBuilder.response({
                  code: 403,
                  res,
                  data: "Gagal di upload ke dalam storage",
                });
              }
              return result;
            }
          );

          return ResponseBuilder.response({
            code: 200,
            res,
            data: resultUpload,
          });
        }

        ResponseBuilder.response({
          code: 404,
          res,
          data: "file tidak ditemukan",
        });
      } catch (error) {
        ResponseBuilder.response({
          code: 500,
          data: "upload gagal",
          res,
        });
      }
    };
  }

  create() {
    const serviceCars = this._serviceCars;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceCars.setUser = req.user as IUsers;
        console.log(req.body);

        const result = await serviceCars.create(req.body as ICars);

        return ResponseBuilder.response({
          res,
          code: 201,
          data: result,
          message: "Berhasil membuat data mobil",
        });
      } catch (error) {
        next(error);
      }
    };
  }

  update() {
    const serviceCars = this._serviceCars;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        serviceCars.setUser = req.user as IUsers;

        const result = await serviceCars.update(id, req.body as ICars);
        return ResponseBuilder.response({
          res,
          code: 200,
          data: result,
          message: "Berhasil mengubah data mobil",
        });
      } catch (error) {
        next(error);
      }
    };
  }

  list() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query = req.query;
        console.log(query);
        const result = await this._serviceCars.list(query);
        const totalPages =
          Math.floor(result.total / Number(query?.size ?? 9)) + 1;

        return ResponseBuilder.response({
          res,
          code: 200,
          data: result.results,
          message: "Berhasil fetch data mobil",
          meta: {
            page: query?.page ? Number(query?.page) : 1,
            size: query?.size ? Number(query?.size) : 9,
            totalData: result.total,
            totalPages,
          },
        });
      } catch (error) {
        next(error);
      }
    };
  }

  remove() {
    const serviceCars = this._serviceCars;
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        serviceCars.setUser = req.user as IUsers;
        const id = req.params?.id;
        const result = await this._serviceCars.remove(id);

        return ResponseBuilder.response({
          res,
          code: 200,
          data: result,
          message: "Berhasil menghapus data mobil",
        });
      } catch (error) {
        next(error);
      }
    };
  }

  show() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params?.id;
        const result = await this._serviceCars.show(id);

        return ResponseBuilder.response({
          res,
          code: 200,
          data: result,
          message: "Data mobil berhasil ditampilkan",
        });
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerCars;