import { contactData } from '../../public/data';

const TopBar = () => {
  return (
    <div className="bg-primary-dark text-white py-2 text-[0.9rem]">
      <div className="max-w-container mx-auto px-5 flex justify-between items-center">
        <div>
          <i className="fas fa-phone mr-2"></i> {contactData.phone} | 
          <i className="fas fa-location-dot ml-3 mr-2"></i> {contactData.location}
        </div>
        <div>স্বপ্ন বুনুন আমাদের সাথে</div>
      </div>
    </div>
  );
};

export default TopBar;
