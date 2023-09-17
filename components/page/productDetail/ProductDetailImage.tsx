import ImageItem from "@/components/ImageItem";

type Props = {
    name: string
    image: any
    index: number
};

export default function ProductDetailImage({name, image, index}: Props) {
  if (!image) {
    return null;
  }

  const selectedImage = image && (index !== undefined ? image[index] : image[0]);

  return (
    <div className="bg-neutral-200 flex justify-center items-center rounded-xl w-full h-96 py-10">
      <figure className="relative w-4/5 max-w-[80%] h-auto">
        <ImageItem
          alt={name}
          imageAsset={selectedImage}
          width="w-full"
        />
      </figure>
    </div>
  );
}
