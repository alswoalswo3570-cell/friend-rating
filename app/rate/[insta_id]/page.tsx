import { redirect } from "next/navigation";

export default function RateVerifyPage({
  params,
}: {
  params: { insta_id: string };
}) {
  const instaId = decodeURIComponent(params.insta_id).replace(/^@/, "");
  redirect(`/rate/${encodeURIComponent(instaId)}/write`);
}
