import React, { useState } from 'react';
import { Group, Button, FileInput } from '@mantine/core';

import sendPhoto from 'utils/sendPhoto';

import styles from './styles.module.scss';

const ImageUploader = ({ type, callback = () => {} }) => {
	const [base64, setBase64] = useState('');

	const convertToBase64 = file => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64String = reader.result; //.split(',')[1];
			setBase64(base64String);
		};
		reader.onerror = error => {
			console.error('Error converting file to Base64:', error);
		};
		reader.readAsDataURL(file);
	};

	const onChangeFile = async _file => {
		if (_file) {
			convertToBase64(_file);
		}
	};

	const handleSubmit = async () => {
		const { valid, data } = await sendPhoto(base64, {
			type,
		});

		if (!valid) {
			return;
		}

		console.log('upload success, data:', data);

		callback(data);
	};

	return (
		<div className={styles.imageUploaderWrapper}>
			<FileInput
				label="Upload Image"
				description="File format is limited to jpg or png, image size is limited to 5MB"
				placeholder="Click up select file"
				onChange={onChangeFile}
				accept="image/jpeg, image/png"
			/>
			<Group justify="flex-end" mt="md">
				<Button onClick={handleSubmit} disabled={base64 === ''}>
					Upload
				</Button>
			</Group>
		</div>
	);
};

export default ImageUploader;
