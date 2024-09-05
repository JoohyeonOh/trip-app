function addDelimeter(value: number | string, delimeter = ",") {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimeter);
}

export default addDelimeter;
