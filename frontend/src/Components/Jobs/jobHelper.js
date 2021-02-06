import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const addJobFormSchema = yup.object().shape({
  title: yup.string().required(),
  employer: yup.string().required(),
  apply_date: yup.date().required(),
  description: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
});

export const addFormResolver = yupResolver(addJobFormSchema);
