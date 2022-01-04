import axios from 'axios';

const createHeader = () => {
    const token = localStorage.getItem('harmonyAuth');
    if (!token){ return {}}

    return { auth : 'bearer '+token}
}

const setAuthToken = (token) => {
    localStorage.setItem('harmonyAuth',token);
}
const setRefreshToken = (token) => {
    localStorage.setItem('harmonyAuthRefresh',token);
}

const setAllTokens = (data) => {
    if (data.data && data.data.status) {
        setAuthToken(data.data.auth);
        setRefreshToken(data.data.refresh);
    }
}

const sendRequestHandleResponse = (url,request,data={}) => {
    return new Promise((resolve, reject) => {
        createRequest(url,request,data).then(res=>{
            resolve(res)
        })
        .catch(err=>{
            resolve('err',err.response.data)
        })
    });
    
}

const createRequest = (url,request,data) => {
    switch (request) {
        case 'POST':
            return axios({ method:'post',url:url,data:data,headers:createHeader()});
        case 'GET':
            return axios({ method:'get',url:url,headers:createHeader()});
        case 'PUT':
            return axios({ method:'put',url:url,data:data,headers:createHeader()});
        default:
            break;
    }
}

const baseAddress = 'http://localhost:8081';

const getUserInfo = async () => {
    return await sendRequestHandleResponse(baseAddress+'/user/info','GET');
}

const loginUser = async (loginInfo) => {
    const data = await sendRequestHandleResponse(baseAddress+'/user/login','POST',loginInfo)
    setAllTokens(data);
    return data;
}

const signupUser = async (signupInfo) => {
    const data = await sendRequestHandleResponse(baseAddress+'/user/signup','POST',signupInfo)
    setAllTokens(data);
    return data;
}

const createGoal = async (goalData) => {
    const returnData = await sendRequestHandleResponse(baseAddress+'/goal','POST',goalData);
    return returnData;
}

const getGoal = async () => {
    const returnData = await sendRequestHandleResponse(baseAddress+'/goal','GET');
    return returnData;
}

const updateGoal = async (update) => {
    const returnData = await sendRequestHandleResponse(baseAddress+'/goal','PUT',update);
    return returnData;
}

const testRequest = async() => {
    const returnData = await sendRequestHandleResponse(baseAddress+'/','GET');
    return returnData;
}

export {getUserInfo, loginUser, signupUser,createGoal,getGoal,updateGoal,testRequest};
