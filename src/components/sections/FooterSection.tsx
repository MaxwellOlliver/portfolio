export default function FooterSection() {
  return (
    <div
      className="h-[40dvh] w-full border-t-2 border-neutral-800"
      style={{
        maskImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 95%)",
        maskComposite: "intersect",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Footer</h1>
      </div>
    </div>
  );
}
