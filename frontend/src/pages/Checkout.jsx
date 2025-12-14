import axios from "axios";
const API_URL = "http://localhost:4000";
const placeOrder = async () => {
  await axios.post(
    `${API_URL}/api/order`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  alert("Order placed");
};


export default placeOrder