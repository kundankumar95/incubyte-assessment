import axios from "axios";
const API_URL = "https://incubyte-assessment-1-f38k.onrender.com";
const placeOrder = async () => {
  await axios.post(
    `${API_URL}/api/order`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  alert("Order placed");
};


export default placeOrder
