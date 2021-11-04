import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import CustomMenue from "./customMenu";
import CustomPagination from "./customPagination";

const StatsCard = (props: { title: string; data: Array<object> }) => {
  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <div>
          <Typography variant="h6" component="div">
            {props.title}
          </Typography>
          <CustomMenue />
        </div>
        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys(props.data[0]).map((field, indx) => (
                  <TableCell key={indx} style={{ fontWeight: "bold" }}>
                    {field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((info, indx1) => (
                <TableRow key={indx1}>
                  {Object.values(info).map((val, indx2) => (
                    <TableCell key={indx2}>{val}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination />
      </CardContent>
    </Card>
  );
};

export default StatsCard;
