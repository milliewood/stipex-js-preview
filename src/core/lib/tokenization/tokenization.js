/**
 * Tokenization for sensitive data as a package and special offerring
 */

export async function tokenizationSession(userApiKey) {
    const userToken = 'your_user_token'; // Replace with actual user token
    
    fetch('http://tokenizer.stipex.co.ke/tokenization_session/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userToken }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success callback data:', data); // Log the success callback data to the console
    })
    .catch(error => {
        console.log('Error callback error:', error); // Log the error callback error to the console
    });
}


export async function retrieveToken(tokenId, successCallback, errorCallback) {
    // Make a GET request to the backend endpoint /retrieve_token/:tokenId
    await fetch(`http://tokenizer.stipex.co.ke/retrieve_token/${tokenId}`)
    .then(response => response.json())
    .then(data => {
        successCallback(data);
    })
    .catch(error => {
        errorCallback(error);
    });
}

// #############################################################################################



// ########################################################################
/**
 * Validations for inputs
 */
export async function handleInputChange(e) {
    // e.preventDefault();
    const { name, value, type, checked } = e.target;

    setFormErrors({
        ...formErrors,
        [name]: '', // Clear the error for the current field
    });

    // Handle checkbox input separately
    if (type === 'checkbox') {
        setFormData({
            ...formData,
            [name]: checked,
        });
    } else if (name === 'cardNumber') {
        // Remove any non-numeric characters from the input
        const numericValue = value.replace(/\D/g, '');

        // Check if the input exceeds 16 digits and show an error
        if (numericValue.length > 16) {
            setFormErrors({
                ...formErrors,
                cardNumber: '',
            });
        } else {
            setFormErrors({
                ...formErrors,
                cardNumber: '', // Clear the error if the input is valid
            });

            // Add a space after every 4 digits
            let formattedValue = '';
            for (let i = 0; i < numericValue.length; i++) {
                formattedValue += numericValue[i];
                if ((i + 1) % 4 === 0 && i !== numericValue.length - 1) {
                    formattedValue += ' ';
                }
            }

            setFormData({
                ...formData,
                [name]: formattedValue,
            });
            setFormErrors({
                ...formErrors,
                [name]: '', // Clear the error for the current field
            });
        }
    } else if (name === 'cardExpiration') {
        // Remove any non-numeric characters from the input
        const numericValue = value.replace(/\D/g, '');

        // Add a slash automatically after entering two digits
        let formattedValue = numericValue;
        /* if (numericValue.length === 2 && !numericValue.includes('/')) {
            formattedValue += '/';
        } */
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
        }
        const [enteredMonthValue, enteredYear] = formattedValue.split('/');
        console.log(enteredMonthValue, "enteredMonth", enteredYear, "enteredYear");
        // Check if the input has a valid MM/YY format (without a leading zero in month)
        if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedValue)) {
            console.log("Invalid MM/YY format");
            /* setFormErrors({
                ...formErrors,
                cardExpiration: '', // Clear the error if the input is valid
            }); */
            const [enteredMonth, enteredYear] = formattedValue.split('/');
            const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
            const currentYear = new Date().getFullYear() % 100; // Last two digits of current year
            console.log(enteredMonth, "enteredMonth");
            // Convert enteredYear to a number
            const numericEnteredYear = parseInt(enteredYear, 10);

            // Check if the entered expiration date is earlier than the current month and year
            if (
                numericEnteredYear < currentYear ||
                (numericEnteredYear === currentYear && parseInt(enteredMonth, 10) < currentMonth)
            ) {
                setFormErrors({
                    ...formErrors,
                    cardExpiration: 'Your card has expired.',
                });
            } else {
                console.log("enter else");
                console.log("enter error");
                setFormErrors({
                    ...formErrors,
                    cardExpiration: '', // Clear the error if the input is valid
                });
            }

            setFormData({
                ...formData,
                [name]: formattedValue,
            });
            /* setFormErrors({
                ...formErrors,
                cardExpiration: '', // Clear the error if the input is valid
            }); */
        } else if (formattedValue.length > 5) {
            setFormErrors({
                ...formErrors,
                cardExpiration: '',
            });
        } else if (enteredMonthValue < 0 || enteredMonthValue > 12) {
            setFormErrors({
                ...formErrors,
                cardExpiration: 'Enter a valid month (1-12)',
            });
        } else {
            console.log("last else");
            setFormData({
                ...formData,
                [name]: formattedValue,
            });
            setFormErrors({
                ...formErrors,
                cardExpiration: '', // Clear the error if the input is valid
            });
        }
    } else if (name === 'cardCVC') {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length > 3) {
            setFormErrors({
                ...formErrors,
                cardCVC: '',
            });
        } else {
            setFormData({
                ...formData,
                [name]: numericValue,
            });
            setFormErrors({
                ...formErrors,
                cardCVC: '', // Clear the error if the input is valid
            });
        }
    } else {
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormErrors({
            ...formErrors,
            [name]: '', // Clear the error for the current field
        });
    }
};

export async function validateForm() {
    const errors = {};

    // Validate email
    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
        errors.email = 'Invalid email address';
    }

    // Validate card number
    if (!formData.cardNumber) {
        errors.cardNumber = 'Card number is required';
    } else if (!isValidCardNumber(formData.cardNumber)) {
        errors.cardNumber = 'Invalid card number';
    }

    // Validate card expiration (MM/YY format)
    if (!formData.cardExpiration) {
        errors.cardExpiration = 'Expiration date is required';
    } else if (!isValidCardExpiration(formData.cardExpiration)) {
        errors.cardExpiration = 'Invalid expiration date (MM/YY)';
    }

    // Validate CVC
    if (!formData.cardCVC) {
        errors.cardCVC = 'CVC is required';
    } else if (!isValidCardCVC(formData.cardCVC)) {
        errors.cardCVC = 'Invalid CVC';
    }

    // Validate Name on card
    if (!formData.cardName) {
        errors.cardName = 'Name on card is required';
    }

    // Validate Select country
    if (!formData.selectedCountry) {
        errors.selectedCountry = 'Select a country is required';
    }

    // Validate Address
    if (!formData.billingAddress) {
        errors.billingAddress = 'Billing address is required';
    }
    if (!formData.saveInfo) {
        errors.saveInfo = 'Please accept the terms to continue.';
    }

    // Add validation logic for other fields here

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
};

export async function isValidEmail(email) {
    // Regular expression pattern for a valid email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Use the test method to check if the email matches the pattern
    return emailPattern.test(email);
};

const isValidCardNumber = (cardNumber) => {
    // Remove any non-numeric characters from the input
    const numericValue = cardNumber.replace(/\D/g, '');

    // Validate if the numeric value contains exactly 16 numerical digits
    return numericValue.length === 16;
};

export async function isValidCardExpiration(expiration) {
    // Validate if expiration is in MM/YY format and within a valid date range
    const [month, year] = expiration.split('/');
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    return /^\d{2}\/\d{2}$/.test(expiration) && +month <= 12 && +month > 0 && +year >= currentYear;
};

export async function isValidCardCVC(cvc) {
    // Validate if CVC contains 3 or 4 numerical digits
    return /^\d{3,4}$/.test(cvc);
};

// Export the functions for usage in your application
