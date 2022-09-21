export default defineNuxtPlugin((nuxtApp) => {

  const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  const phone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

  return {
    provide: {
      validateForm: (field, type) => {
        return eval(type).test(field);
      },
      formatPhoneNumber: (str) => {
        //Filter only numbers from the input
        let cleaned = ("" + str).replace(/\D/g, "");

        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {
          return "(" + match[1] + ") " + match[2] + "-" + match[3];
        }

        return null;
      }
    }
  };
});