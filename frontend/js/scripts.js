// ##################################
// Declaring & Initializing Variables
// ##################################

const timebank_pages = {}

// ###############
// Loader Function
// ###############

timebank_pages.loaderFunction = (func_name) => {
    eval("timebank_pages.load" + func_name + "()")
  }

// #########
// Functions
// #########