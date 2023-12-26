import { IFileItem } from "../../services/types";

export interface ICars {
  id?: string;
  plate?: string;
  manufacture?: string;
  model?: string;
  image?: IFileItem;
  rentPerDay?: number;
  capacity?: number;
  description?: string;
  availableAt?: string;
  transmission?: string;
  available?: boolean;
  type?: string;
  year?: string;
  options?: string[];
  specs?: string[];
  updated_by?: string;
  updated_at?: string;
  created_by?: string;
  created_at?: string;
  deleted?: boolean;
}