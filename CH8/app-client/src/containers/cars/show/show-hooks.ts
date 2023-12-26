/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [data, setData] = useState([]) as any;
  const { id } = useParams();

  useEffect(() => {
    getDataById();
  }, [data]);

  const getDataById = async () => {
    try {
      const response = (await axios.get(
        `http://localhost:8888/api/cars/${id}`
      )) as any;
      setData(response.data.data);
    } catch (error) {
      console.log("Error = ", error);
    }
  };

  return {
    data,
  };
}