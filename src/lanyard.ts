import { LanyardData, LanyardOptions, LanyardResponse } from './types';
import { API_URL, WEBSOCKET_URL } from './constants';
import { useWebSocket } from '@vueuse/core';

export async function useLanyard(
	options: LanyardOptions
): Promise<LanyardResponse | LanyardResponse[] | void> {
	if (Reflect.has(options, 'socket')) {
		const { socket, onPresenceUpdate } = options;

		const supportsWebSockets =
			'WebSocket' in window || 'MozWebSocket' in window;

		if (socket && !supportsWebSockets) {
			throw new Error("Browser doesn't support WebSocket connections.");
		}

		const subscription =
			typeof options.userId === 'object'
				? 'subscribe_to_ids'
				: 'subscribe_to_id';

		useWebSocket(WEBSOCKET_URL, {
			heartbeat: {
				interval: 30 * 1000,
				message: JSON.stringify({ op: 3 })
			},
			onMessage(_, e) {
				const { t, d } = JSON.parse(e.data) as {
					t: 'INIT_STATE' | 'PRESENCE_UPDATE';
					d: LanyardData;
				};

				if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
					onPresenceUpdate?.(d || ({} as LanyardData));
				}
			},
			onConnected(ws: WebSocket) {
				ws.send(
					JSON.stringify({
						op: 2,
						d: {
							[subscription]: options.userId
						}
					})
				);
			}
		});

		return;
	}

	if (typeof options.userId === 'string') {
		const req = await fetch(`${API_URL}/users/${options.userId}`);
		const body = (await req.json()) as LanyardResponse;

		if (body.error) {
			throw new Error(body.error.message);
		}

		return body as LanyardResponse;
	}

	const responseArray: LanyardResponse[] = [];

	for (const id of options.userId) {
		const req = await fetch(`${API_URL}/users/${id}`);
		const body = (await req.json()) as LanyardResponse;

		if (body.error) {
			throw new Error(body.error.message);
		}

		responseArray.push(body);
	}

	return responseArray as LanyardResponse[];
}
