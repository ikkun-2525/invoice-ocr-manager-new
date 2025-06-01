interface InvoicePreviewProps {
  imageUrl?: string;
}

export const InvoicePreview = ({ imageUrl }: InvoicePreviewProps) => {
  return (
    <div className="bg-white shadow sm:rounded-lg p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">請求書画像</h2>
      <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="請求書"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <p className="text-gray-500">請求書画像プレビュー</p>
        )}
      </div>
    </div>
  );
}; 