export const buyerInterests = ["Plot", "Villa", "Site Visit", "Investment", "Brochure"];
export const contactMethods = ["WhatsApp", "Call", "Email"];

export function validateLead(values) {
  const errors = {};
  if (!values.fullName?.trim() || values.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!/^[0-9+\-\s()]{8,18}$/.test(values.mobile || "")) errors.mobile = "Please enter a valid mobile number.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.city && values.city.length > 80) errors.city = "City name is too long.";
  if (values.budget && values.budget.length > 80) errors.budget = "Budget should be under 80 characters.";
  if (values.requirement && values.requirement.length > 160) errors.requirement = "Requirement should be under 160 characters.";
  if (!buyerInterests.includes(values.buyerInterest)) errors.buyerInterest = "Please select your interest.";
  if (!contactMethods.includes(values.preferredContactMethod)) errors.preferredContactMethod = "Please select a contact method.";
  if (values.message && values.message.length > 1000) errors.message = "Message should be under 1000 characters.";
  return errors;
}
