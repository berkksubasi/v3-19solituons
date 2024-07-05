
import axios from 'axios';

const BASE_URL = 'https://nebimv3api.com';

export const acceptTransfer = async (transferId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/transfer/accept`, { transferId });
    return response.data;
  } catch (error) {
    console.error('Error accepting transfer:', error);
    throw error;
  }
};

export const sendTransfer = async (transferData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/transfer/send`, transferData);
    return response.data;
  } catch (error) {
    console.error('Error sending transfer:', error);
    throw error;
  }
};
