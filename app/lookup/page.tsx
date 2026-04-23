import HostLookupForm from "@/components/HostLookupForm";
import { strings } from "@/lib/strings";

export const metadata = {
  title: strings["meta.lookup.title"].ko,
};

export default function LookupPage() {
  return <HostLookupForm />;
}
