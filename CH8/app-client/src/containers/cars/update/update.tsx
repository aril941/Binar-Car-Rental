import { LoadingButton } from "@mui/lab";
import CommonPage from "../../../components/common-page/common-page";
import { Autocomplete, Box, Stack, Switch, TextField } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import useAction from "./update-hooks";
import { VisuallyHiddenInput } from "./update-style";
import { useEffect } from "react";
import { format } from "date-fns";

export default function Update() {
  const {
    formValues,
    handleSubmit,
    handleUploadImage,
    loadingImage,
    loadingSubmit,
    setFormValues,
    fileItem,
    data,
  } = useAction();

  useEffect(() => {
    setFormValues(data);
  }, [data]);

  const convertDateToInputFormat = (dateString: string | number | Date) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  return (
    <CommonPage
      withBack
      component={"form"}
      title="Update Car"
      actionElement={
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loadingSubmit}
        >
          Submit
        </LoadingButton>
      }
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          width: "50%",
        }}
      >
        <TextField
          name="plate"
          size="small"
          label="Plate"
          sx={{ width: "100%", mb: 3 }}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              plate: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.plate}
          value={formValues?.plate || ""}
        />
        <TextField
          name="manufacture"
          size="small"
          label="Manufacture"
          sx={{ width: "100%", mb: 3 }}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              manufacture: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.manufacture}
          value={formValues?.manufacture || ""}
        />
        <TextField
          name="model"
          size="small"
          label="Model"
          sx={{ width: "100%", mb: 3 }}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              model: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.model}
          value={formValues?.model || ""}
        />
        <TextField
          name="rentPerDay"
          size="small"
          label="Rental per Day"
          sx={{ width: "100%", mb: 3 }}
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              rentPerDay: Number(e.target.value),
            })
          }
          variant="outlined"
          placeholder={data?.rentPerDay}
          value={formValues?.rentPerDay || ""}
        />
        <TextField
          name="capacity"
          size="small"
          label="Capacity"
          sx={{ width: "100%", mb: 3 }}
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              capacity: Number(e.target.value),
            })
          }
          variant="outlined"
          placeholder={data?.capacity}
          value={formValues?.capacity || ""}
        />
        <TextField
          name="description"
          size="small"
          label="Description"
          sx={{ width: "100%", mb: 3 }}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              description: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.description}
          value={formValues?.description || ""}
        />
        <TextField
          name="availableAt"
          size="small"
          label="Available At"
          sx={{ width: "100%", mb: 3 }}
          type="date"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              availableAt: e.target.value,
            })
          }
          variant="outlined"
          value={convertDateToInputFormat(formValues?.availableAt || "")}
        />
        <TextField
          name="transmission"
          size="small"
          label="Transmission"
          sx={{ width: "100%", mb: 3 }}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              transmission: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.transmission}
          value={formValues?.transmission || ""}
        />
        <TextField
          name="type"
          size="small"
          label="Type"
          sx={{ width: "100%", mb: 3 }}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              type: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.type}
          value={formValues?.type || ""}
        />
        <TextField
          name="year"
          size="small"
          label="Year"
          sx={{ width: "100%", mb: 3 }}
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              year: e.target.value,
            })
          }
          variant="outlined"
          placeholder={data?.year}
          value={formValues?.year || ""}
        />
        <Autocomplete
          multiple
          id="options"
          options={[]}
          freeSolo
          value={formValues?.options || []}
          onChange={(_, newValue) =>
            setFormValues({
              ...formValues,
              options: newValue,
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="options"
              size="small"
              label="Options"
              sx={{ width: "100%", mb: 3 }}
              variant="outlined"
              value={formValues?.options || ""}
            />
          )}
        />
        <Autocomplete
          multiple
          id="specs"
          options={[]}
          freeSolo
          value={formValues?.specs || []}
          onChange={(_, newValue) =>
            setFormValues({
              ...formValues,
              specs: newValue,
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="specs"
              size="small"
              label="Specs"
              sx={{ width: "100%", mb: 3 }}
              variant="outlined"
              value={formValues?.specs || ""}
            />
          )}
        />
        <LoadingButton
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          sx={{ mb: 3 }}
          loading={loadingImage}
        >
          Upload Car Image
          <VisuallyHiddenInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleUploadImage}
          />
        </LoadingButton>
        {fileItem ? (
          fileItem &&
          fileItem.url && (
            <Box>
              <img
                src={fileItem.secure_url}
                alt="preview"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Box>
          )
        ) : data?.image == null ? null : (
          <Box>
            <img
              src={data?.image?.url}
              alt="preview"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>
        )}
        <Box>
          <Stack direction={"row"} alignItems={"center"}>
            <div>Publish</div>
            <Switch
              name="available"
              title="Available"
              checked={formValues?.available || false}
              value={formValues?.available}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  available: e.target.checked,
                })
              }
            />
          </Stack>
        </Box>
      </Box>
    </CommonPage>
  );
}