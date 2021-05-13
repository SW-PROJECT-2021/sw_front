import axios from "axios";

export const UpdateCart = async () => {
   const response = await axios({
      url: "http://15.164.20.183:3003/basket",
      method: "get",
   });
   return response;
};

export const DeleteCart = async (id) => {
   const response = await axios({
      url: `http://15.164.20.183:3003/basket/${id}`,
      method: "delete",
   });
   return response;
};

export const ChangeCountCart = async (data) => {
   console.log(data);
   const response = await axios.put("http://15.164.20.183:3003/basket", data);
   console.log(response);
   return response;
};
