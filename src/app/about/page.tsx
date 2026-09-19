import { aboutPage } from "@/lib/pages/make";

const impl = aboutPage("en");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
