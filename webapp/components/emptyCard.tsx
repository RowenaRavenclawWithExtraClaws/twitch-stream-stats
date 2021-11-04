import { Card, CardContent, Typography } from "@mui/material";

const EmptyCard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5" component="div">
        No data available!
      </Typography>
    </div>
  );
};

export default EmptyCard;
