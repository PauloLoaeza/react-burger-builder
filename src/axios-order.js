import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-a24e4.firebaseio.com'
});

export default instance;