import { useRouter } from "next/navigation";
import { Form, Products } from '../Interfaces/types.tsx';

export const validateField = (field: keyof Form, value: string): string => {
     if (field === "price") {
       const length = value.length;
       if (length < 1 || length >= 56) {
         return "Please input a price between 1 and 56 characters long";
       } else if (parseInt(value) < 0) {
         return"Please input a positive price";
       } else if (Number.isNaN(parseInt(value)) && length > 0) {
         return "Price must be a number";
       }
     } else {
       if (value.length < 1 || value.length >= 56) {
         return "Please input a value between 1 and 56 characters long";
       }
     }
 
     return "";
};