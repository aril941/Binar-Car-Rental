import { Grid, Paper, Typography, styled } from "@mui/material";
import CommonPage from "../../../components/common-page/common-page";
import useAction from "./show-hooks";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default function Detail() {
  const { data } = useAction();

  return (
    <CommonPage withBack title="Detail">
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <Item>
            <div style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
              <Typography variant="h6" marginBottom={"4px"}>
                Plate :
              </Typography>
              <Typography variant="body1">{data?.plate}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Manufacture :
              </Typography>
              <Typography variant="body1">{data?.manufacture}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Model :
              </Typography>
              <Typography variant="body1">{data?.model}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Rental per day :
              </Typography>
              <Typography variant="body1">{data?.rentPerDay}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Capacity :
              </Typography>
              <Typography variant="body1">{data?.capacity}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Description :
              </Typography>
              <Typography variant="body1">{data?.description}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Available At :
              </Typography>
              <Typography variant="body1">{data?.availableAt}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Transmission :
              </Typography>
              <Typography variant="body1">{data?.transmission}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Type :
              </Typography>
              <Typography variant="body1">{data?.type}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Year :
              </Typography>
              <Typography variant="body1">{data?.year}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Options :
              </Typography>
              <Typography variant="body1">{data?.options}</Typography>
              <Typography variant="h6" marginBottom={"4px"} marginTop={"14px"}>
                Specs :
              </Typography>
              <Typography variant="body1">{data?.specs}</Typography>
            </div>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item>
            <img src={data?.image?.url} alt="Image" width={"100%"} />
          </Item>
        </Grid>
      </Grid>
    </CommonPage>
  );
}