import { Pagination, Stack } from "@mui/material";

const CustomPagination = () => {
  return (
    <Stack spacing={2} style={{ marginTop: 20 }}>
      <Pagination count={10} shape="rounded" />
    </Stack>
  );
};

export default CustomPagination;
