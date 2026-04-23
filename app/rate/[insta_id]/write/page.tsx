import RateForm from "@/components/RateForm";

export default function RateWritePage({
  params,
  searchParams,
}: {
  params: { insta_id: string };
  searchParams: { b?: string };
}) {
  const instaId = decodeURIComponent(params.insta_id).replace(/^@/, "");
  const birth = (searchParams.b ?? "").replace(/\D/g, "").slice(0, 6);
  return <RateForm instaId={instaId} birth={birth} />;
}
