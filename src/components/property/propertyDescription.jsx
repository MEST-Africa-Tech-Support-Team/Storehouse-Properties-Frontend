export default function PropertyDescription({ description }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">About this property</h2>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}