import { Link, useNavigate } from "react-router-dom";
import useAction from "./list-hooks";
import {
  Button,
  CircularProgress,
  Pagination,
  Stack,
  TableCell,
  TextField,
} from "@mui/material";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ICars } from "../cars.types";
import { format, parseISO } from "date-fns";
import { HeaderElementStyled } from "./list-style";
import CommonPage from "../../../components/common-page/common-page";

export default function List() {
  const navigate = useNavigate();
  const {
    cars,
    loading,
    setParams,
    params,
    meta,
    handleEdit,
    handleRemove,
    handleSearch,
  } = useAction();

  const renderLoading = () => {
    return (
      <TableCell colSpan={5}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem 0",
          }}
        >
          <CircularProgress />
        </div>
      </TableCell>
    );
  };

  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }

    return (
      <Grid container spacing={2}>
        {cars?.map((record: ICars) => (
          <Grid item key={record.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/detail/${record.id}`)}
            >
              {/* Assuming you have a URL for the book cover image */}
              <CardMedia
                component="img"
                height="140"
                image={record.image?.url}
                alt={record.manufacture}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {record.manufacture}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Rp</strong> {record.rentPerDay} <strong>/hari</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Capacity :</strong> {record.capacity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Transmission :</strong> {record.transmission}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Year :</strong> {record.year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {format(
                    parseISO(`${record.created_at}`),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </Typography>
              </CardContent>
              <CardContent sx={{ marginTop: "auto" }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={(e) => handleRemove(e, record)}
                  >
                    Remove
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={(e) => handleEdit(e, record)}
                  >
                    Edit
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <CommonPage
      title="Cars"
      actionElement={
        <HeaderElementStyled>
          <TextField
            name="search"
            placeholder="Search cars title or author"
            onChange={handleSearch}
            size="small"
          />
          <Link to={"/create"}>
            <Button type="button" variant="contained">
              Create new
            </Button>
          </Link>
        </HeaderElementStyled>
      }
    >
      <Grid container spacing={2}>
        {renderContent()}
      </Grid>
      <Pagination
        sx={{ mt: 3 }}
        count={meta?.totalPages}
        variant="outlined"
        shape="rounded"
        onChange={(_, page: number) => {
          setParams({
            ...params,
            page,
          });
        }}
      />
    </CommonPage>
  );
}