import { Pagination, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { customFetch } from "../utility";

const CustomPagination = (props: {
  pageCount: number;
  endpoint: string;
  setter: (something: number | object) => void;
}) => {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} style={{ marginTop: 20 }}>
      <Pagination
        count={props.pageCount}
        shape="rounded"
        onChange={(_, page) => {
          customFetch(props.endpoint, { page: page }, (body) =>
            dispatch(props.setter(body))
          );
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
