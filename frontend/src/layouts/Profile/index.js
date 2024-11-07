import React, { useState, useEffect } from 'react';
import { Text, Group, Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from 'models/auth';
import { useUserData } from 'models/user';

import styles from './styles.module.scss';

function ProfilePage() {
	const [
		{ displayName, imageUrl, createdDate, userId, points, challenges, consecutiveDays, firstLogin, name },
		{ getUser, updateUser },
	] = useUserData();
	const [, { logout }] = useAuth();
	const [form, setForm] = useState({ displayName: '', imageUrl: '' });
	const [opened, { close, open }] = useDisclosure(false);

	const updateForm = () => {
		updateUser(form);
		close();
	};

	useEffect(() => {
		if (!userId) {
			getUser();
		}
	}, []);

	return (
		<div className={styles.profileLayout}>
			<Text size="xl" mb="lg">
				Profile
			</Text>
			<img src={imageUrl} alt="avatar" />
			<ul>
				<li>Name: {displayName}</li>
				<li>Points: {points}</li>
				<li>Consecutive Days: {consecutiveDays}</li>
			</ul>
			<Group justify="center" mt="md">
				<Button variant="filled" onClick={open}>
					Edit
				</Button>
				<Button variant="filled" onClick={logout}>
					Logout
				</Button>
			</Group>

			<Modal opened={opened} onClose={close} title="Update Your Profile" centered>
				<TextInput
					label="Display Name"
					placeholder="Your name"
					mt="md"
					value={form.displayName}
					onChange={e => setForm({ ...form, displayName: e.target.value })}
				/>
				<TextInput
					label="Image URL"
					placeholder="Blank for default"
					mt="md"
					value={form.imageUrl}
					onChange={e => setForm({ ...form, imageUrl: e.target.value })}
				/>
				<Group justify="flex-end" mt="md">
					<Button onClick={updateForm} disabled={!form.displayName}>
						Submit
					</Button>
				</Group>
			</Modal>
		</div>
	);
}

export { ProfilePage };
