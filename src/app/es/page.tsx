import { homePage } from "@/lib/pages/make";

const impl = homePage("es");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
