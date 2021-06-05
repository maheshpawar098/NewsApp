import createAxios from 'service/createAxios';
import getHackerApi from 'service/hackerApi';
import {BASE_URL} from 'utils/constant';

const api = getHackerApi(createAxios());


export default api