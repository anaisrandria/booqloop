"use client";

import BookForm from "@/app/components/BookForm/BookForm";
import { BookFormData } from "@/app/components/BookForm/BookForm.types";
import addBook from "@/lib/services/books/addBook";
import { useRouter } from "next/navigation";

const AddBook = () => {
  const router = useRouter();
  const handleSubmit = async (data: BookFormData) => {
    await addBook(data);
    router.push("/profile");
  };

  return (
    <BookForm
      title="Ajouter un livre"
      submitLabel="Ajouter à ma bibliothèque"
      onSubmit={handleSubmit}
    />
  );
};

export default AddBook;
