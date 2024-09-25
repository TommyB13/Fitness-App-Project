import {
	CognitoIdentityProviderClient,
	InitiateAuthCommand,
	SignUpCommand,
	ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoConfig = {
	region: process.env.REACT_APP_COGNITO_REGION,
	userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
	clientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};

export const cognitoClient = new CognitoIdentityProviderClient({
	region: cognitoConfig.region,
});

export const signIn = async (username, password) => {
	const params = {
		AuthFlow: 'USER_PASSWORD_AUTH',
		ClientId: cognitoConfig.clientId,
		AuthParameters: {
			USERNAME: username,
			PASSWORD: password,
		},
	};
	try {
		const command = new InitiateAuthCommand(params);
		const { AuthenticationResult } = await cognitoClient.send(command);
		if (AuthenticationResult) {
			sessionStorage.setItem('idToken', AuthenticationResult.IdToken || '');
			sessionStorage.setItem('accessToken', AuthenticationResult.AccessToken || '');
			sessionStorage.setItem('refreshToken', AuthenticationResult.RefreshToken || '');
			return AuthenticationResult;
		}
	} catch (error) {
		console.error('Error signing in: ', error);
		throw error;
	}
	return null;
};

export const signUp = async (email, password) => {
	const params = {
		ClientId: cognitoConfig.clientId,
		Username: email,
		Password: password,
		UserAttributes: [
			{
				Name: 'email',
				Value: email,
			},
		],
	};
	try {
		const command = new SignUpCommand(params);
		const response = await cognitoClient.send(command);
		console.log('Sign up success: ', response);
		return response;
	} catch (error) {
		console.error('Error signing up: ', error);
		throw error;
	}
};

export const confirmSignUp = async (username, code) => {
	const params = {
		ClientId: cognitoConfig.clientId,
		Username: username,
		ConfirmationCode: code,
	};
	try {
		const command = new ConfirmSignUpCommand(params);
		await cognitoClient.send(command);
		console.log('User confirmed successfully');
		return true;
	} catch (error) {
		console.error('Error confirming sign up: ', error);
		throw error;
	}
};
