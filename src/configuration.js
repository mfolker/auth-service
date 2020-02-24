const { interactionPolicy: { Prompt, base: policy } } = require('oidc-provider');

const interactions = policy();

module.exports = {
	//TODO: Load appropriate pieces of configuration at start up
	clients: [
		{
			client_id: 'test_client',
			client_secret: '...',
			grant_types: [ 'refresh_token', 'authorization_code' ],
			redirect_uris: [ 'https://jwt.io' ]
		}
	],
	interactions: {
		policy: interactions,
		url(ctx, interaction) {
			// eslint-disable-line no-unused-vars
			return `/interaction/${ctx.oidc.uid}`;
		}
	}

	//TODO: Add additional configuration
};
