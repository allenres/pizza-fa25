// server-side validation for SECURITY
// Client-side validation can be disabled
export function validateForm(data) {
    console.log(data);

    const errors = [];

    // validate first name
    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    // validate last name
    if(!data.lname || data.lname.trim() === "" ) {
        errors.push("Last name is required");
    }

    // validate method
    const validMethods = ["pickup", "delivery"];
    if(!validMethods.includes(data.method)) {
        errors.push("Go away, evildoer!");
    }

    // validate pizza size
    const validPizzaSizes = ["small", "medium", "large"];
    if(!validPizzaSizes.includes(data.size)) {
        errors.push("Go away, evildoer!");
    }

    // validate pizza toppings
    const validToppings = ['pepperoni', 'pineapple', 'sausage'];
    if(data.toppings) {
        // if a single topping is selected, turn it into an array
        const toppings = Array.isArray(data.toppings) ?
        data.toppings : [data.toppings];

        // make sure all toppings are valid
        for(let topping of toppings) {
            if(!validToppings.includes(topping)) {
                errors.push("Invalid toppings selected");
            }
        }
    }

    // return an object with two properties
    // a boolean isValid, and an array of error messages
    return {
        isValid: errors.length === 0, 
        errors: errors
    }
}