import RateForm from "@/components/RateForm";

export default function RateWritePage({
  params,
}: {
  params: { insta_id: string };
}) {
  const instaId = decodeURIComponent(params.insta_id).replace(/^@/, "");
  return <RateForm instaId={instaId} />;
}
