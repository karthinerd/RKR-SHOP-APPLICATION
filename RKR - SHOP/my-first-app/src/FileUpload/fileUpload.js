import React from 'react';
import AuthService from "../Services/auth.service";
import axios from "axios";

const FileUpload = () => {

    const user = AuthService.getCurrentUser();
    
    const onChangeFile = (e) =>{
      let formData = new FormData();
    formData.append("image", e.target.files[0]);
      axios({
        url:'http://localhost:8001/image/fileSystem',
        method:"POST",
        headers:{
          "Content-Type": "multipart/form-data",
          authorization :'Bearer ' + user.dataObject.accessToken,     
        },
        data:formData
      }).then(
          (response) => {
            console.log(response.data.dataObject);
          })
      console.log(e.target.files[0]);
    };

  return (
    <div>
    <label class="form-label" for="customFile">
    Product Image
  </label>
  <input
    type="file"
    class="form-control"
    id="customFile"
    name="file"
    onChange={onChangeFile}
  />
  </div>
  )
}

export default FileUpload