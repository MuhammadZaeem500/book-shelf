import Image from "next/image";

interface BooksCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  author: string;
}

export default function BooksCard({ imageSrc, imageAlt, title, author }: BooksCardProps) {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col w-full">
      <div className="relative w-full h-48">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600">{author}</p>
      </div>
    </div>
  );
}