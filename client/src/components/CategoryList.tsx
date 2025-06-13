import { useCallback, useEffect, useState } from "react";
import { axios } from "@api/axios";
import { LinearProgress, Stack, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import type { CategoryProps } from "@src/types";
import Button from "@components/Button";
import Container from "@components/Container";
import CategoryCard from "@components/CategoryCard";
import AddCategoryModal from "@components/AddCategoryModal";

import AddIcon from "@mui/icons-material/Add";

const CategoryList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<CategoryProps[]>([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/expense-management");
      setData(result.data);
      setLoading(false);
      return;
    } catch (err) {
      enqueueSnackbar(`getAllData ERROR: ${(err as any).request.response} `, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }, [enqueueSnackbar]);

  const handleAddCategory = () => {
    setOpenAddCategoryModal(true);
  };

  const handleCheckUnique = useCallback(
    (value: string) => {
      const existingName = data.find(
        (item) => item.name === value.toLowerCase()
      );
      return !!existingName;
    },
    [data]
  );

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <Container>
      <HeaderComponent>
        <HeaderTextComponent
          variant="h1"
          sx={{ fontSize: { lg: "2vw", sm: "4vw", xs: "6vw" } }}
        >
          Expense Categories
        </HeaderTextComponent>
        <Button
          onClick={handleAddCategory}
          size="small"
          startIcon={<AddIcon />}
        >
          Add Category
        </Button>
      </HeaderComponent>

      {loading && <LinearProgress />}

      <Stack spacing={2}>
        {data.length ? (
          data.map((item, i) => (
            <CategoryCard
              {...item}
              getAllData={getAllData}
              key={`category-${i}`}
            />
          ))
        ) : (
          <p>No Data.</p>
        )}
      </Stack>
      <AddCategoryModal
        open={openAddCategoryModal}
        setOpen={setOpenAddCategoryModal}
        getAllData={getAllData}
        handleCheckUnique={handleCheckUnique}
      />
    </Container>
  );
};

export default CategoryList;

const HeaderComponent = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "24px 0",
});

const HeaderTextComponent = styled(Typography)({});
