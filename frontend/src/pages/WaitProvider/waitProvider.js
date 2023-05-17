import React, { useState, useEffect } from 'react';
import { getReqeust, reqRequest, reqUserInfo,reqMyRequest,sendRequest } from '../../api';
import storageUtils from '../../utils/storageUtils';
import { Avatar, List, Card, Button, Collapse } from 'antd';
import { useHistory } from 'react-router-dom';

const RequestPage = () => {
  const history = useHistory()
  const [message, setMessage] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    checkRequest();
  }, []);

  const checkRequest = async () => {
     try{
      const response = await reqMyRequest(storageUtils.getUser().email);
    // const user = JSON.parse(response.data);
     // const user = JSON.stringify(response)
       const user = JSON.parse(response.data)
       const status = user.return_obj[0].status
      console.log("雪豹" + response);
      if(status==="Updated"){
       setMessage("Please click on the button to update your information");
       setShowDescription(true);
      }
      else{
        setMessage("Your account was rejected, please register again!");
      }
   }
   catch{
     setMessage('Please wait for administrator review');
   }
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: 600,
        fontSize: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {message}
      {showDescription && (
        <Button
          type='primary'
          style={{
            backgroundColor: 'white',
            color: 'black',
            margin: 5,
            border: '1px solid red',
            borderColor: 'black'
          }}
          onClick={() => {
            history.push('/update');
          }}
        >
          Update
        </Button>
      )}
    </div>
  );
};

export default RequestPage;