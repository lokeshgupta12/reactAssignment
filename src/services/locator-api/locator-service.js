import ApiHelper from '../api-helper'
import API_SETTINGS from '../../config/api.config';
import API_CONSTANT from '../../constant/api'

const API_URL = API_SETTINGS.MOCK_API['BASE_URL'] + API_SETTINGS.MOCK_API.LOCATOR_SUB_PATH
// Service to send routes to the API 
export const postRoutes = async (body) => {
    const header = {
        'Content-Type': "application/json"
    }
	return await ApiHelper.genericPost(
        API_URL,
        body,
        header
    );
}

// Service to receive routes from the API 
export const getRoutes = async (token) => {

	const response = await ApiHelper.genericGet(API_URL + '/' + token)

	// retrying if status is in progress
	if(response && response.data.status === API_CONSTANT.MSG_IN_PROGRESS) {
		return getRoutes(token);
	}

	return response;
}