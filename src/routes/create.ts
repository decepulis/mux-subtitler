import type { RequestHandler } from '@sveltejs/kit';

const authToken = `${import.meta.env.VITE_MUX_TOKEN_ID}:${import.meta.env.VITE_MUX_TOKEN_SECRET}`;
const authTokenBase64 = Buffer.from(authToken).toString('base64');
const Authorization = `Basic ${authTokenBase64}`;

export const get: RequestHandler = async ({ url }) => {
	const { ASSET_ID, PLAYBACK_ID, closed_captions, ...body } = Object.fromEntries(
		url.searchParams.entries()
	);

	let assetId = ASSET_ID;
	if (PLAYBACK_ID) {
		const assetIdLookupResponse = await fetch(
			`https://api.mux.com/video/v1/playback-ids/${PLAYBACK_ID}`,
			{
				headers: { Authorization }
			}
		);
		if (assetIdLookupResponse.status >= 300) {
			return {
				status: assetIdLookupResponse.status,
				body: assetIdLookupResponse.statusText
			};
		}
		const { data } = await assetIdLookupResponse.json();
		assetId = data.object.id;
	}

	const requestBody = {
		closed_captions: closed_captions === 'true',
		...body
	};
	const createTrackResponse = await fetch(`https://api.mux.com/video/v1/assets/${assetId}/tracks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization
		},
		body: JSON.stringify(requestBody)
	});

	return {
		status: createTrackResponse.status,
		body: createTrackResponse.status >= 300 ? createTrackResponse.statusText : 'Success'
	};
};
