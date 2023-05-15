import React, { useState, useEffect } from 'react';
import { reqRequest } from '../../api';
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
    // const response = await reqRequest(storageUtils.getUser().username);
    if (true) {
      setMessage("Please click on the button to update your information");
      setShowDescription(true);
    } else {
      setMessage('请等待管理员审核');
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