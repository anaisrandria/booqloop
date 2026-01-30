"use client";

import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <main>
      <IconButton onClick={() => router.push("/home")}>
        <ArrowBackIosNewIcon />
      </IconButton>
      {children}
    </main>
  );
}
