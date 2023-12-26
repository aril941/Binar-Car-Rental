import { LoadingButton } from "@mui/lab";
import CommonPage from "../../../components/common-page/common-page";
import { Autocomplete, Box, Stack, Switch, TextField } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import useAction from "./create-hooks";
import { VisuallyHiddenInput } from "./create-style";

export default function Create() {
  const {
    formValues,
    handleSubmit,
    handleUploadImage,
    loadingImage,
    loadingSubmit,
    setFormValues,
    fileItem,
  } = useAction();

  return (
    <CommonPage
      withBack
      component={"form"}
      title="Create new Car"
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
          sx={{ width: "100%", mb: 3 }}
          label="Plate"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              plate: e.target.value,
            })
          }
          variant="filled"
          value={formValues?.plate}
        />
        <TextField
          name="manufacture"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Manufacture"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              manufacture: e.target.value,
            })
          }
          variant="filled"
          value={formValues?.manufacture}
        />
        <TextField
          name="model"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Model"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              model: e.target.value,
            })
          }
          variant="filled"
          value={formValues?.model}
        />
        <TextField
          name="rentPerDay"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Rental per hari"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              rentPerDay: Number(e.target.value),
            })
          }
          variant="filled"
        />
        <TextField
          name="capacity"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Capacity"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              capacity: Number(e.target.value),
            })
          }
          variant="filled"
        />
        <TextField
          name="description"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Description"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              description: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          name="availableAt"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Available at"
          type="date"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              availableAt: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          name="transmission"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Transmission"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              transmission: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          name="type"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Type"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              type: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          name="year"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Year"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              year: e.target.value,
            })
          }
          variant="filled"
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
              sx={{ width: "100%", mb: 3 }}
              label="Options"
              variant="filled"
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
              sx={{ width: "100%", mb: 3 }}
              label="Specs"
              variant="filled"
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
        {fileItem && fileItem.url && (
          <Box>
            <img
              src={fileItem.secure_url}
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