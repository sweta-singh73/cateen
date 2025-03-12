// /****************************IsEmpty Validator***************************/

// let isEmpty = async (data) => {

//   //Loop through entire object inside that loop you have to push 
//   var arr = [];
//   for (const [key, value] of Object.entries(data)) {
//       if (value == '' || value == undefined || value == null) {
//           arr.push(`${key} is required`)
//       }
//   }
//   return arr;
// }

// /****************************Emp_id validator****************/

// let empIdValidator = async(emp_id)=>{
//   empFormate = /^\d+$/;
//   if(emp_id !== '' && emp_id.match(empFormate)){
//     return true;
//   } 
//     return false;
// }


// /*********************Email Validator**********************/

// let emailValidator = async (email) => {
//   var emailFormate = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//   if (email !== '' && email.match(emailFormate)) {
//       return true;
//   }
//   return false;
// }

// /*******************************Trim Extra Validator**************************/

// let trimExtra = async (str) => {
//   var trimedStr = str.trim();
//   console.log(trimedStr);
//   return str;
// }

// /***************************Name Validator********************************/

// let nameValidator = async (name) => {
//   var namePattern =/^[a-zA-Z ]+$/;
//   var firstName = name.match(namePattern);
//   if (firstName) {
//       return true;
//   }
//   return false;

// }

// /***********************Price Validator**************************/

// const priceValidator = async (price)=>{
//   var priceRegex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
//   var priceMatch = price.match(priceRegex);
//   if(priceMatch){
//       return true;
//   }
//   return false;
// }



// /***********************Validate All Data**************************/

// const validateData = async (data) => {
//   let err = [];
//   for (const [key, value] of Object.entries(data)) {
//       if (key == "email") {
//           let isValid = await emailValidator(value);
//           if (!isValid) {
//               err.push(`${key} is invalid.`)
//           }
//       } else if (key == "name") {
//           let nameValid = await nameValidator(value);
//           if (!nameValid) {
//               err.push(`${key} is invalid`);
//           }
//       }
//       else if (key == "price") {
//           let priceValid = await priceValidator(value);
//           if (!priceValid) {
//               err.push(`${key} is invalid`);
//           }
//       }
//       else if( key == "emp_id"){
//         let empValid = await empValidationSchema(value);
//         if(!empValid){
//           err.push(`${key} is invalid`)
//         }
//       }
//   }
//   return err;
// }

// /*********handles the Validation of the Requests Body************/

// const handleValidation = async (data, res) => {
//   const emptyFields = await isEmpty(data);
//   if (emptyFields.length > 0) {
//     return res
//       .status(400)
//       .json({ message: "All fields are required!", data: emptyFields });
//   }

//   const invalidData = await validateData(data);
//   if (invalidData.length > 0) {
//     return res
//       .status(400)
//       .json({ message: "Data must be valid!", data: invalidData });
//   }
//   return null; // Return null if there are no validation errors
// };



// module.exports = {
//   isEmpty,
//   emailValidator,
//   nameValidator,
//   priceValidator,
//   validateData,
//   handleValidation
// }