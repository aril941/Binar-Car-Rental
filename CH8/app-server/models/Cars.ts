import database from "../config/database";
import { Model } from "objection";

Model.knex(database);

export interface ICars {
  id?: string;
  plate: string;
  manufacture: string;
  model: string;
  image?: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  availableAt: string;
  transmission: string;
  available: boolean;
  type: string;
  year: string;
  options: string[];
  specs: string[];
  updatedBy?: string;
  createdBy?: string;
}

class Cars extends Model {
  static get tableName() {
    return "cars";
  }

  static get idColumn() {
    return "id";
  }

  $beforeInsert() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.updated_at = new Date().toISOString();
  }

  static get timestamps() {
    return true;
  }
}

export default Cars;