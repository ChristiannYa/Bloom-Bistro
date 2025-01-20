import MenuItemSkeleton from '../../components/loading-skeleton/MenuItemSkeleton';

const MenuSkeleton = () => (
  <div className="pt-custom-2 pb-custom-1">
    <div className="screen">
      <h1 className="text-acc-1 font-livvic font-medium text-2xl mb-4">
        Loading Menu Items...
      </h1>
      <div className="menu-grid">
        {[...Array(7)].map((_, index) => (
          <MenuItemSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

export default MenuSkeleton;
