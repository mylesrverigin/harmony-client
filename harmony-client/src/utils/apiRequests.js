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
            resolve(err.response.data)
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

const getUserInfo = async () => {
    return await sendRequestHandleResponse('http://localhost:8081/user/info','GET');
}

const loginUser = async (loginInfo) => {
    const data = await sendRequestHandleResponse('http://localhost:8081/user/login','POST',loginInfo)
    setAllTokens(data);
    return data;
}

const signupUser = async (signupInfo) => {
    const data = await sendRequestHandleResponse('http://localhost:8081/user/signup','POST',signupInfo)
    setAllTokens(data);
    return data;
}

export {getUserInfo, loginUser, signupUser};
