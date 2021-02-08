import axios from "axios";

const baseURL = "http://localhost:3001";

const post = async (object)  => {
  return await axios.post(baseURL + "/api/transaction",object);
};

//   const put = (url, object) => {
//     const requestUrl = `${this.apiurl}${url}`;
//     return httpClient.put(requestUrl, object);
//   };

//   const deleteById = (url) => {
//     const requestUrl = `${this.apiurl}${url}`;
//     return httpClient.delete(requestUrl);
//   }

const get = async (object) => {
  return await axios.get(baseURL + "/api/transaction", {
    params: {
      object,
    },
  });
};

export { get, post };
