import bcrypt from "bcryptjs";

export const hashData = async (data) => await bcrypt.hash(data, 10);
export const compareData = async (data, hash) => await bcrypt.compare(data, hash);
