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
  Chip,
} from "@mui/material";
import CustomMenue from "./customMenu";
import CustomPagination from "./customPagination";
import EmptyCard from "./emptyCard";

const StatsCard = (props: {
  title: string;
  data: Array<object>;
  pageCount: number;
  endpoint: string;
  setter: (something: number | object) => void;
}) => {
  return (
    <Card sx={{ minWidth: 400 }} style={{ marginTop: 20 }}>
      <CardContent>
        <div>
          <Typography variant="h6" component="div">
            {props.title}
          </Typography>
          <CustomMenue />
        </div>
        {!props.data.length ? (
          <EmptyCard />
        ) : (
          <>
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
                        <TableCell
                          key={indx2}
                          title={val}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 150,
                          }}
                        >
                          {typeof val === "number" ? (
                            <Chip label={val} color="info"></Chip>
                          ) : (
                            val
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CustomPagination
              pageCount={props.pageCount}
              endpoint={props.endpoint}
              setter={props.setter}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
