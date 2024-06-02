export const ValidationMessage : any = {
  "username": {
    "required": "Email is required.",
    "email": "Email not in valid format.",
    "pattern": "Email not in valid format."
  },
  "password": {
    "required": "Password is required.",
    "minlength": "Password must be at least 8 characters long.",
    "maxlength": "Password cannot be more than 20 characters long.",
    "pattern": "Password should contain atleast 1 uppercase, 1 lowercase, 1 number and 1 symbol"
  },
  "name":{
    "required": "Name is required.",
    "minlength": "Name must be at least 6 characters long.",
    "maxlength": "Name cannot be more than 20 characters long."
  },
  "email":{
    "required": "Email is required.",
    "email": "Email not in valid format.",
    "pattern": "Email not in valid format."
  },
  "phoneNo":{
    "required": "Phone Number is required.",
    "pattern": "Phone Number not in valid format."
  },
  "cpassword":{
    "required": "Confirm Password is required.",
    "minlength": "Confirm Password must be at least 8 characters long.",
    "maxlength": "Confirm Password cannot be more than 20 characters long.",
    "pattern": "Password should contain atleast 1 uppercase, 1 lowercase, 1 number and 1 symbol"
  },
  "comment":{
    "required":"Comment is required.",
    "minlength": "Comment must be at least 15 characters long."
  }
}
