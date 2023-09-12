"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Products } from "../../Interfaces/types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "../../Interfaces/types";
import { validateField } from "../../Utils/validation";

export default function ProductDetails({ id }: { id: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Products | null>(null);
  const [errors, setErrors] = useState<Form>({
    name: "",
    type: "",
    color: "",
    price: ""
  });

  const fields: (keyof Form)[] = ["name", "color", "type", "price"];

  useEffect(() => {
    if(id.length) {
      const fetchData = async () => {
        const response = await fetch(`/api/products/${id}`);
        const product = await response.json();
        setFormData({ ...product });
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    const formHasError = Object.values(errors).some(
      (error) => error && error !== ""
    );
    if (!formHasError) {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        router.push(`/`);
      } else {
        alert("There was an issue updating the product.");
      }
    }
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name as keyof Form;
    const value = e.target.value;
    const errorMessage = validateField(fieldName, value);

    setFormData((prev) => ({ ...(prev as Products), [fieldName]: value }));
    setErrors({ ...errors, [fieldName]: errorMessage });
  };

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
          {fields.map((field) => {
            const hasError = errors[field].length > 0;
            return (
              <TextField
                error={hasError}
                helperText={hasError && errors[field]}
                key={field}
                label={`${field}`}
                name={`${field}`}
                defaultValue={formData[field]}
                id={`${field}-field`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleForm(e)
                }
              />
            );
          })}
          <Button variant="contained" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Stack>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
