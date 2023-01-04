const PlayList = (songs) => {
    let html = `<table id ="playlist" class="border border-separate border-spacing-y-2 border-spacing-2">
                    <tr class="">
                        <th class="pr-4">#</th>
                        <th class="pr-12">Titel</th>
                        <th class="pr-12">Album</th>
                        <th class="pr-12">År</th>
                        <th>Längd</th>
                    </tr>`;
    
    songs.forEach(song => {
        html += SongInfo(song);
    })

    html += `</table>`;

    return html;
};