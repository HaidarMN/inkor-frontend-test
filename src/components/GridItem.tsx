type props = {
  icon: React.ReactNode;
  title: string;
  body: string | number | undefined;
};

const GridItem = ({ icon, title, body }: props) => {
  return (
    <div className="rounded-md w-full p-4 flex flex-col gap-2 bg-black/20">
      <h2 className="flex flex-row items-center gap-2 text-sm lg:text-lg">
        {icon} {title}
      </h2>
      <span className="font-bold text-base lg:text-xl">{body}</span>
    </div>
  );
};

export default GridItem;
