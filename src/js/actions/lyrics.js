import { UPDATE_STANZA_ARRAY, UPDATE_ORIGINAL_LYRICS } from './';

export const updateStanzaArray = (newStanzaArray) => (
	{
		type: UPDATE_STANZA_ARRAY,
		payload: newStanzaArray
	}
);

export const updateOriginalLyrics = (newLyrics, newTitle) => (
	{
		type: UPDATE_ORIGINAL_LYRICS,
		payload: {
			originalLyrics: newLyrics,
			songTitle: newTitle
		}
	}
);
