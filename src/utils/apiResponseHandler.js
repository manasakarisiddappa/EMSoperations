import { toast } from "react-toastify";

export const handleApiResponse = (res, refreshFunctions = []) => {
  const message = res.message;
  if (res.success) {
    toast.success(message);
    refreshFunctions.forEach((refresh) => refresh());
  } else {
    toast.error(message);
    console.log("error", message);
  }
};
