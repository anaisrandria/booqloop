"use client";

import BookForm from "@/app/components/BookForm/BookForm";
import { BookFormData } from "@/app/components/BookForm/BookForm.types";
import { getBook } from "@/lib/services/books/getBook";
import { updateBook } from "@/lib/services/books/updateBook";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditBook = () => {
  const router = useRouter();
  const { bookId } = useParams();
  const [initialData, setInitialData] = useState<BookFormData | undefined>();

  useEffect(() => {
    const loadBook = async () => {
      const book = await getBook(Number(bookId));
      if (book) {
        setInitialData({
          title: book.title ?? "",
          author: book.author ?? "",
          description: book.description ?? "",
          published_year: book.published_year ?? undefined,
          category_id: book.category_id,
          image_url: book.image_url ?? "",
          availability_status_id: book.availability_status_id ?? 1,
        });
      }
    };
    loadBook();
  }, [bookId]);

  const handleSubmit = async (data: BookFormData) => {
    await updateBook(Number(bookId), data);
    router.push("/profile");
  };

  return (
    <BookForm
      title="Modifier le livre"
      submitLabel="Enregistrer les modifications"
      onSubmit={handleSubmit}
      initialData={initialData}
    />
  );
};

export default EditBook;
