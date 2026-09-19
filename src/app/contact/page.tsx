import { contactPage } from "@/lib/pages/make";

const impl = contactPage("en");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
