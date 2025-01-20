import icons from '../../assets/icons';

const Skeleton = () => {
  return (
    <div className="p-4 rounded-md w-full shadow-md animate-pulse">
      <div className="bg-acc-3 flex-center relative w-full h-[160px] mb-4">
        <img src={icons.loadingImg} alt="Loaading image" className="w-8" />
      </div>
      <div className="flex flex-col">
        <div className="h-3 bg-acc-3 rounded-full mb-2"></div>
        <div className="h-2 bg-acc-3 rounded-full w-12 mb-2 self-end"></div>
      </div>
    </div>
  );
};

export default Skeleton;
