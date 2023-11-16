export const isEmailValid = (email) => {
    return email.includes("@") && email.includes(".");
  };
  
  export const isPasswordValid = (password) => {
    return password.length >= 5;
  };
  
  export const isMobileNumberValid = (mobileNumber)=>{
      return !isNaN(mobileNumber) && mobileNumber.length === 10;
  }
  
  export const isFullnameValid = (fullname)=>{
      return fullname !== ""
  }
  