import GuestVerify from "@/components/GuestVerify";

export default function RateVerifyPage({
  params,
}: {
  params: { insta_id: string };
}) {
  const instaId = decodeURIComponent(params.insta_id).replace(/^@/, "");
  return <GuestVerify instaId={instaId} />;
}
