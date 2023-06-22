 

type Props = {
    title: string
};

export default function CategoryBanner({title}: Props) {
  return (
    <div className="w-full h-60 flex place-content-center items-center bg-green-400 rounded-md">
      <h2 className="lg:text-4xl">Category: {title}</h2>
    </div>
  );
}
