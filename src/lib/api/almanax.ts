import type { AlmanaxState } from '../types/AlmanaxState';
import { sourceLanguageTag, languageTag } from '$lib/paraglide/runtime';

const BASE_URL = 'https://api.dofusdu.de/dofus2';
const getURL = (path: string) => `${BASE_URL}/${languageTag() || sourceLanguageTag}${path}`;

const createAlmanaxState = (data: any): AlmanaxState => ({
    description: data.bonus.description,
    type: data.bonus.type.name,
    date: new Date(data.date).toISOString().split('T')[0],
    image: data.tribute.item.image_urls.hd,
    loot: data.tribute.item.name,
    quantity: data.tribute.quantity,
    id: Date.now()
});

export const fetchDailyAlmanax = () =>
    fetch(getURL('/almanax?range%5Bsize%5D=1'))
        .then(res => res.json())
        .then(([data]) => createAlmanaxState(data));

export const fetchWeeklyAlmanax = () =>
    fetch(getURL('/almanax?range%5Bsize%5D=7'))
        .then(res => res.json())
        .then(data => data.slice(1).map(createAlmanaxState));

export const fetchAlmanaxByDate = (date: string) =>
    fetch(getURL(`/almanax/${date}`))
        .then(res => res.json())
        .then(createAlmanaxState);