const AddSong = () => {
    return `<form id="songForm" class="">
                <div id="form__add-name">
                <div class="flex">
                    <label for="addName" class="form-label pl-2">Song name</label>
                    <p id="songError" class="message pt-0.5 pl-1 text-sm text-red-700 hidden">
                    Error message
                    </p>
                </div>
                <input name="addName" type="text" class="form-control mb-4" id="addName" placeholder="Song name">
                </div>
                <div id="form__add-year">
                <div class="flex">
                    <label for="addYear" class="form-label pl-1">Release year</label>
                    <p id="yearError" class="message pt-0.5 pl-1 text-sm text-red-700 hidden">
                    Error message
                    </p>
                </div>
                <input name="addYear" type="text" class="form-control mb-4 pl-2" id="addYear" placeholder="Release year">
                </div>
                <div id="form__add-artists">
                <div class="flex">
                    <label for="addArtists" class="form-label pl-1">Artists</label>
                    <p id="artistsError" class="message pt-0.5 pl-2 text-sm text-red-700 hidden">
                    Error message
                    </p>
                </div>
                <textarea name="addArtists" class="form-control mb-4" id="addArtists" rows="5"></textarea>
                </div>
                <div id="form__add-albumname">
                <div class="flex">
                    <label for="addAlbumName" class="form-label pl-1">Album name</label>
                    <p id="albumError" class="message pt-0.5 pl-2 text-sm text-red-700 hidden">
                    Error message
                    </p>
                </div>
                <input name="addAlbumName" type="text" class="form-control mb-4" id="addAlbumName" placeholder="Album name">
                </div>
                <div id="form__add-albumart">
                <div class="flex">
                    <label for="addAlbumArt" class="form-label pl-1">Album art (Optional)</label>
                    <p id="artError" class="message pt-0.5 pl-2 text-sm text-red-700 hidden">
                    Error message
                    </p>
                </div>
                <input name="addAlbumArt" type="text" class="form-control mb-4" id="addAlbumArt" placeholder="Link to album art">
                </div>
                <div id="form__add-length">
                <div class="flex">
                    <label for="addLength" class="form-label pl-1">Song length</label>
                    <p id="lengthError" class="message pt-0.5 pl-2 text-sm text-red-700 hidden">
                    Error message
                    </p>
                </div>
                <input name="addLength" type="text" class="form-control mb-4" id="addLength" placeholder="Length (mm:ss)">
                </div>
                <div class="flex">
                <button name="submit" type="submit" class="rounded-md bg-blue-300 hover:bg-blue-400 px-4 py-1">Spara</button>
                <p id="playListError" class="message pt-0.5 pl-4 pt-1 text-sm text-red-700 hidden">
                    Error message
                </p>
                </div>
            </form>`
}