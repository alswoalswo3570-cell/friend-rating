import GuestStartForm from "@/components/GuestStartForm";
import { strings } from "@/lib/strings";

export const metadata = {
  title: strings["meta.rateStart.title"].ko,
};

export default function RateStartPage() {
  return <GuestStartForm />;
}
