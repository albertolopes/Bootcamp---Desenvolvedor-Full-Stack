const axios = require('axios');

const url = "http://localhost:8080"

async function getAllTasks() {
    return axios.get(url + '/todos')
    .then((response)=>{        
        return response.data;
    })
    .catch((error)=>{
        console.log(error)
    });
}

async function getByYearAndMonth(year, month) {
    return axios.get(url + `/todos?year=${year}&month=${month}`)
    .then((response)=>{        
        return response.data;
    })
    .catch((error)=>{
        console.log(error)
    });
}

async function getById(id) {
    return axios.get(url + `/todos/${id}`)
    .then((response)=>{        
        return response.data;
    })
    .catch((error)=>{
        console.log(error)
    });
}

async function putTask(id, payload) {
    return axios.put(url + `/todos/${id}`, payload)
    .then((response)=>{        
        return response.data;
    })
    .catch((error)=>{
        console.log(error)
    });
}

export {
    getAllTasks, 
    getByYearAndMonth, 
    getById, 
    putTask
};
