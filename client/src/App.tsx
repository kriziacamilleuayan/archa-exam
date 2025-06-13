import { useEffect, useState } from "react";
import { axios } from "@api/axios";
import Button from "@components/Button";
import { Stack, styled, Typography } from "@mui/material";
import Container from "@components/Container";
import CategoryCard from "@components/CategoryCard";
import type { CategoryCardProps } from "@src/types";
import AddCategoryModal from "@components/AddCategoryModal";

function App() {
  const [data, setData] = useState<CategoryCardProps[]>([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);

  useEffect(() => {
    axios.get("/api/sample").then((data) => {
      try {
        setData(data.data.data);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  const handleAddCategory = () => {
    setOpenAddCategoryModal(true);
  };

  console.log("data", data);

  return (
    <Container>
      <HeaderComponent>
        <HeaderTextComponent
          variant="h1"
          sx={{ fontSize: { lg: "2vw", sm: "4vw", xs: "6vw" } }}
        >
          Expense Categories
        </HeaderTextComponent>
        <Button onClick={handleAddCategory} color="success">
          Add
        </Button>
      </HeaderComponent>
      <Stack spacing={2}>
        {data.map((item) => (
          <CategoryCard {...item} />
        ))}
      </Stack>
      <AddCategoryModal
        open={openAddCategoryModal}
        setOpen={setOpenAddCategoryModal}
      />
    </Container>
  );
}

export default App;

const HeaderComponent = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "24px 0",
});

const HeaderTextComponent = styled(Typography)({});
