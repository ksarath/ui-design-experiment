import ManuscriptUploader from "@/components/ManuscriptUploader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <ManuscriptUploader />
      </div>
    </div>
  );
}
