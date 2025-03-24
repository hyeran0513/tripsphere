import ServiceIcon from './ServiceIcon';

const ServiceList = ({ services }) => (
  <div className="px-4 py-6 gap-4 sm:px-0 text-sm/6 text-gray-70">
    <ul className="grid grid-cols-2 divide-y divide-gray-100 rounded-md border border-gray-200">
      {services.map((service, index) => (
        <li
          key={index}
          className="flex items-center py-4 px-4 text-sm">
          <div className="flex items-center gap-3">
            <ServiceIcon
              key={service}
              type={service}
              className="text-lg"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ServiceList;
