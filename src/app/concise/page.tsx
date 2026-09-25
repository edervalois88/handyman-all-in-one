import { conciseHomePage } from "@/lib/pages/concise";

const impl = conciseHomePage("en");

export const generateMetadata = impl.generateMetadata;
export default impl.default;
