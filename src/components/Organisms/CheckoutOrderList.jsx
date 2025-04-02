import TypeMapping from '../Atoms/TypeMapping';

const CheckoutOrderList = ({ IconComponent, Title, type }) => {
  return (
    <li className="flex items-center justify-start  py-4 pr-5 pl-4 text-sm/6 dark:text-gray-200">
      <div className="ml-4 flex min-w-0 flex-1 gap-2 items-center ">
        <span className="text-gray-400">
          <IconComponent className="text-2xl" />
        </span>
        <span className="font-medium">{Title}</span>
      </div>

      {type && <TypeMapping type={type} />}
    </li>
  );
};

export default CheckoutOrderList;
