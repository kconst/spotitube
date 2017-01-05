import parse from 'query-parse';

const query = parse.toObject(location.search.replace('?',''));

function getKeys(which) {
    let keys;
    
    return {
        'spotify': () => {
            if (query && query.spotify_cb) {
                localStorage.setItem('spotifyKeys', JSON.stringify(keys = {
                    access_token: query.access_token,
                    refresh_token: query.refresh_token,
                    timeStamp: (new Date).getTime()
                }));
            } else if (localStorage.getItem('spotifyKeys')) {
                keys = JSON.parse(localStorage.getItem('spotifyKeys'));
                
                // invalidate if over an hour
                if ((new Date).getTime() - keys.timeStamp > 3600000) {
                    return localStorage.removeItem('spotifyKeys');
                }
            }
            
            return keys;
        },
        'youtube': () => {
            if (query && query.youtube_cb) {
                localStorage.setItem('youtubeKeys', JSON.stringify(keys = {
                    access_token: query.access_token,
                    timeStamp: (new Date).getTime()
                }));
            } else if (localStorage.getItem('youtubeKeys')) {
                keys = JSON.parse(localStorage.getItem('youtubeKeys'));
                
                // invalidate if over an hour
                if ((new Date).getTime() - keys.timeStamp > 3600000) {
                    return localStorage.removeItem('youtubeKeys');
                }
            }
            
            return keys;
        }
    }[which]();
}

export default getKeys;