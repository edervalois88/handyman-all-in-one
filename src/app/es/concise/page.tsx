import { conciseHomePage } from "@/lib/pages/concise";

const impl = conciseHomePage("es");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
