import { Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { BookGridProps } from "./BookGrid.types";
import { BookCard } from "../BookCard";
import { Book } from "@/app/types";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

const BookGrid = ({
  books,
  isLoading,
  header,
  showEditIcons,
}: BookGridProps) => {
  const router = useRouter();
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{
            fontsize: "14px",
            fontWeight: "600",
          }}
        >
          {header}
        </Typography>
        {showEditIcons && (
          <Tooltip title={"Ajouter un livre"} placement="left-end">
            <IconButton
              size="small"
              onClick={() => router.push("/profile/add-book")}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Grid
        container
        columns={{ xs: 2, sm: 4, md: 5, lg: 5, xl: 6 }}
        rowSpacing={3}
        columnSpacing={2.5}
      >
        {books && books.length > 0
          ? books.map((book: Book, index: number) => (
              <Grid key={index} size={1}>
                <BookCard book={book} />
              </Grid>
            ))
          : !isLoading && (
              <Typography paddingY={1}>Aucun livre trouvé.</Typography>
            )}
      </Grid>
    </Stack>
  );
};

export default BookGrid;
