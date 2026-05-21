import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { getAdminSession } from "@/lib/adminAuth";
import { getSiteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Админка",
  description: "Закрытый редактор контента портфолио."
};

export default async function AdminPage() {
  const session = getAdminSession();

  if (!session) {
    return <AdminLogin />;
  }

  const siteContent = await getSiteContent();

  return (
    <AdminEditor
      initialContent={siteContent.content}
      source={siteContent.source}
      updatedAt={siteContent.updatedAt}
      userLogin={session.login}
    />
  );
}
