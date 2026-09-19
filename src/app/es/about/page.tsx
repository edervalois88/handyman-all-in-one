import { aboutPage } from "@/lib/pages/make";

const impl = aboutPage("es");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
