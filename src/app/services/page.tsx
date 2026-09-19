import { servicesPage } from "@/lib/pages/make";

const impl = servicesPage("en");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
