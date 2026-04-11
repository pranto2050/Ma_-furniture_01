import { contactData } from '../../public/data';
import { getWhatsAppLink } from '../utils/whatsapp';

const FloatingWhatsApp = () => {
  return (
    <a 
      href={getWhatsAppLink(contactData.whatsapp)} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-[30px] right-[30px] bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-[2rem] shadow-[0_5px_20px_rgba(0,0,0,0.3)] z-999 animate-ring"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default FloatingWhatsApp;
