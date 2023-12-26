import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IApiResponse, IMeta, IParams } from "../../../services/types";
import { ICars } from "../cars.types";
import axios from "axios";

export default function useList() {
  const navigate = useNavigate();
  const [params, setParams] = useState<IParams>({
    page: 1,
    size: 9,
  });
  const [meta, setMeta] = useState<IMeta>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cars, setCars] = useState<ICars[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParams({
      ...params,
      search: value,
    });
  };

  const handleRemove = async (
    e: MouseEvent<HTMLButtonElement>,
    record: ICars
  ) => {
    e.stopPropagation();
    const confirmed = confirm("Are you sure want to DELETE?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8888/api/cars/${record.id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        await fetchCars();
      } catch (error) {
        console.log("Error = ", error);
      }
    }
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: ICars) => {
    e.stopPropagation();
    navigate(`/update/${record.id}`);
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IApiResponse<ICars[]>>(
        "http://localhost:8000/api/cars",
        {
          params,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(params);
      setCars(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log("Error = ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [params]);

  return {
    cars,
    params,
    setParams,
    loading,
    meta,
    handleEdit,
    handleRemove,
    handleSearch,
  };
}