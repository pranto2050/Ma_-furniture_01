/**
 * Cleans a phone number for use in a WhatsApp link.
 * Removes all non-numeric characters except for the leading digits.
 * @param phone The phone number to clean
 * @returns The cleaned phone number
 */
export const cleanWhatsAppNumber = (phone: string): string => {
  return phone.replace(/[^\d]/g, '');
};

/**
 * Generates a WhatsApp link with an optional pre-filled message.
 * @param phone The phone number
 * @param message The optional pre-filled message
 * @returns The complete WhatsApp URL
 */
export const getWhatsAppLink = (phone: string, message?: string): string => {
  const cleanedPhone = cleanWhatsAppNumber(phone);
  const baseUrl = `https://wa.me/${cleanedPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
};
