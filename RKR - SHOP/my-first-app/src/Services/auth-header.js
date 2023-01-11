
export default function authHeader() {

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.dataObject.accessToken) {
    return { Authorization: 'Bearer ' + user.dataObject.accessToken}; 
  } else {
    return {};
  }
  
}