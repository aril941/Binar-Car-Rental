const Router = require("express").Router;
const db = require("../../../config/database");
const cloudinary = require("../../../config/cloudinary");
const upload = require("../../../config/upload");

// /api/cars
function ApiRouterBook() {
  const router = Router();

  // List
  router.get("/", async (req, res) => {
    const data = await db.select("*").from("cars");
    res.status(200).json({
      data,
    });
  });

  // Single
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = await db.select("*").from("cars").where("id", id);

      if (data.length === 0) {
        return res.status(404).json({ message: "Car data not found" });
      }

      res.status(200).json({
        status: true,
        message: "Get data success!",
        data: data[0],
      });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        status: false,
        message: error.message,
      });
    }
  });

  // Create
  router.post("/", upload.single("photo"), async (req, res) => {
    try {
      const data = req.body;
      const created_at = new Date();

      if (!req.file) {
        console.log("Car photo is null");
        return res.status(400).json({ message: "Car photo is required" });
      } else {
        if (req.file.size > 2000000) {
          return res.status(400).json({ message: "Car photo size should not exceed 2mb" });
        }

        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file, { folder: "cars" }, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        data.photo = result.url;
      }

      data.start_rent = new Date(data.start_rent);
      data.finish_rent = new Date(data.finish_rent);
      data.created_at = created_at;
      data.updated_at = created_at;

      await db("cars").insert(data);

      res.status(201).json({
        status: true,
        message: "Create success!",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });

  // update
  router.put("/:id", upload.single("photo"), async (req, res) => {
    try {
      const id = req.params.id;
      const updateData = req.body;

      const existingCar = await db("cars").where("id", id).first();
      // console.log(existingCar.photo);

      if (!existingCar) {
        return res.status(404).json({ message: "Car data not found" });
      }

      if (!req.file) {
        updateData.photo = existingCar.photo;
      } else {
        if (req.file.size > 2000000) {
          return res.status(400).json({ message: "Car photo size should not exceed 2mb" });
        }

        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file, { folder: "cars" }, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        updateData.photo = result.url;
      }

      updateData.start_rent = new Date(updateData.start_rent);
      updateData.finish_rent = new Date(updateData.finish_rent);
      updateData.updated_at = new Date();

      await db("cars").where("id", id).update(updateData);

      res.status(200).json({
        status: true,
        message: "Update success!",
        updateData,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  });

  // delete
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const car = await db("cars").where("id", id).del();

      if (car < 1) {
        return res.status(404).json({ message: "Car data not found" });
      }

      res.status(200).json({
        status: true,
        message: "Delete success!",
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  });

  return router;
}

module.exports = ApiRouterBook;
