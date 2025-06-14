import { useEffect, useState } from "react";
import { Box, LinearProgress, Stack, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import type { CategoryProps } from "@src/types";
import CategoryCard from "@components/features/category/CategoryCard";
import AddCategoryModal from "@components/features/category/AddCategoryModal";
import Button from "@components/common/Button";
import Container from "@components/common/Container";
import { useGetAllCategories } from "@components/features/category/queries";

import AddIcon from "@mui/icons-material/Add";

const CategoryList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const {
    data: categoryData,
    isLoading,
    isFetched,
    error,
  } = useGetAllCategories();

  const handleAddCategory = () => {
    setOpenAddCategoryModal(true);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`Fetch Category List ERROR: ${error.response?.data} `, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }, [enqueueSnackbar, error]);

  return (
    <Container>
      <HeaderComponent>
        <HeaderTextComponent
          variant="h1"
          sx={{ fontSize: { lg: "2vw", sm: "4vw", xs: "6vw" } }}
        >
          Expense Categories
        </HeaderTextComponent>
        <Box>
          <Button onClick={handleAddCategory} startIcon={<AddIcon />}>
            Add Category
          </Button>
        </Box>
      </HeaderComponent>

      {isLoading && <LinearProgress />}

      <Stack spacing={2}>
        {isFetched && !categoryData?.length && <p>No Data.</p>}

        {categoryData && categoryData.length
          ? categoryData.map((item: CategoryProps, i: number) => (
              <CategoryCard {...item} key={`category-${i}`} />
            ))
          : null}
      </Stack>
      <AddCategoryModal
        open={openAddCategoryModal}
        setOpen={setOpenAddCategoryModal}
      />
    </Container>
  );
};

export default CategoryList;

const HeaderComponent = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px 0",
});

const HeaderTextComponent = styled(Typography)({
  color: "steelblue",
});
