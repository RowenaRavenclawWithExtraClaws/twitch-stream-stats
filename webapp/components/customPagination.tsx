import { Pagination, Stack } from "@mui/material";

const CustomPagination = (props: { pageCount: number }) => {
  return (
    <Stack spacing={2} style={{ marginTop: 20 }}>
      <Pagination count={props.pageCount} shape="rounded" />
    </Stack>
  );
};

export default CustomPagination;
