import { wrapAuthFetch } from './api';

const sendPhoto = async (file, { type }) => {
	try {
		const { data } = await wrapAuthFetch('upload-to-s3', {
			method: 'POST',
			body: JSON.stringify({ file, type }),
		});

		console.log('data', data);

		return { data: data.fileUrl, valid: true, message: 'success' };
	} catch (error) {
		return {
			data: '',
			valid: false,
			message: error.message === 'Failed to fetch' ? 'Server error' : error.message,
		};
	}
};

export default sendPhoto;
