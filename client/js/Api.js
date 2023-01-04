class Api {
    baseUrl = '';

    // Playlist URL:s
    playListURL = ''

    // Song URL:s
    songURL = ''

    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.playListURL = this.baseUrl + '/playlist/'
        this.songURL = this.baseUrl + '/playlist/song/'
    }

    /**
     * Method for Creating a new Playlist.
     * @param {string} data
     */
    createPlayList(data) {
        const json = JSON.parse(data)
        console.log(`Sending request for "Playlist" creation with name: ${data.playlistName}`)
        const request = new Request(this.playListURL, {
            method: 'PUT',
            body: json,
            headers: {
                'content-type': 'application/json'
            }
        });
        return fetch(request)
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for getting the full list of available Playlists.
     */
    getAllPlaylists() {
        return fetch(this.playListURL, {method: 'GET'})
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for getting a specific Playlist.
     * @param {int} playlist_id
     */
    getPlaylistByID(playlist_id) {
        return fetch(this.playListURL + playlist_id.toString(), {method: 'GET'})
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for updating a specific Playlist.
     * @param {int} playlist_id
     * @param {string} data
     */
    updatePlayList(playlist_id, data) {
        const json = JSON.parse(data)
        console.log(`Sending request to update "Playlist" with name: ${data.playlistName}`)
        const request = new Request(this.playListURL, {
            method: 'PATCH',
            body: json,
            headers: {
                'content-type': 'application/json'
            }
        });
        return fetch(request)
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for removing a specific Playlist.
     * @param {int} playlist_id
     */
    deletePlaylist(playlist_id) {
        console.log(`Sending request to delete "Playlist" with id: ${playlist_id}`)
        return fetch(this.playListURL + playlist_id.toString(), {method: 'DELETE'})
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for adding a Song to a specific Playlist.
     * @param {int} playlist_id
     * @param data
     */
    addSongToPlaylist(playlist_id, data) {
        const json = JSON.parse(data)
        console.log(`Sending request to add "Song" to "Playlist" with id: ${playlist_id}`)
        const jData = {id: playlist_id, song: json}
        const request = new Request(this.songURL, {
            method: 'PUT',
            body: jData,
            headers: {
                'content-type': 'application/json'
            }
        })
        return fetch(request)
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for updating a Song in a specific Playlist.
     * @param {int} playlist_id
     * @param {string} data
     */
    updateSongInPlaylist(playlist_id, data) {
        const json = JSON.parse(data)
        console.log(`Sending request to update "Song" in "Playlist" with id: ${playlist_id}`)
        const jData = {id: playlist_id, ...json}
        const request = new Request(this.songURL, {
            method: 'PATCH',
            body: jData,
            headers: {
                'content-type': 'application/json'
            }
        })
        return fetch(request)
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }

    /**
     * Method for deleting a Song from a specific Playlist.
     * @param {int} playlist_id
     * @param {string} data
     */
    deleteSongFromPlaylist(playlist_id, data) {
        const json = JSON.parse(data)
        console.log(`Sending request to remove "Song" from "Playlist" with id: ${playlist_id}`)
        const jData = {id: playlist_id, ...json}
        const request = new Request(this.songURL, {
            method: 'DELETE',
            body: jData,
            headers: {
                'content-type': 'application/json'
            }
        })
        return fetch(request)
            .then((result) => result.json()).then((data) => data)
            .catch((e) => console.log(e))
    }
}