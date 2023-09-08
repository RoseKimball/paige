"use client";
import { useEffect, useState } from "react";
import { Products } from "../../Interfaces/types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function ProductDetails({
  id,
  details
}: {
  id: string;
  details: Products | null;
}) {
  const [formData, setFormData] = useState({ ...details });
  // display form with prefilled values
  // show value to update
  // when update button is pressed, send PATCH or maybe PUT request to /api/products/:id

  // notes: use useEffect... useState... axios/fetch
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fields: (keyof typeof formData)[] = ["name", "color", "type", "price"];

  return (
    <div className="w-full h-screen">
      {formData ? (
        <Stack
          component="form"
          sx={{
            width: "200px"
          }}
          spacing={3}
          className="mx-auto mt-32"
        >
          {fields.map((field) => (
            <TextField
              label={`${field}`}
              name={`${field}`}
              defaultValue={formData[field]}
              id={`${field}-field`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleForm(e)
              }
            />
          ))}
        </Stack>
      ) : (
        <p>There seems to be an issue loading the product.</p>
      )}
    </div>
  );
}
