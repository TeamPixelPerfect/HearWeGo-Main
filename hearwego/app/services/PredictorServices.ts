import { predictor_url } from "../constants/keys"

export const predictPopularity = async (song_name: string,  song_ex: string) => {
    const response = await fetch(`${predictor_url}predict?song_name=${song_name}&song_ex=${song_ex}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}