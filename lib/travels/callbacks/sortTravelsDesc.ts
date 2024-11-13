import { Travel } from "@/types/travels";

const sortTravelsDesc = (a: Travel, b: Travel) =>
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

export default sortTravelsDesc;
