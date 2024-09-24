export const formatPhoneNumber = (phoneNumber: string) => {
	const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

	// Check if the numeric phone number has 10 digits
	if (numericPhoneNumber.length !== 10) {
		console.error("Invalid phone number. Please provide a 10-digit number.");
		return null;
	}

	// Format the phone number as xx-xxx-xxxx
	const formattedPhoneNumber =
		numericPhoneNumber.substring(0, 3) +
		"-" +
		numericPhoneNumber.substring(3, 6) +
		"-" +
		numericPhoneNumber.substring(6);

	return formattedPhoneNumber;
};
