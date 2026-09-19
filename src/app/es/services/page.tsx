import { servicesPage } from "@/lib/pages/make";

const impl = servicesPage("es");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
