const PlayList = (result, id) => {
    // TODO:
    console.log(result);
    let html = `<table id ="playlist" class="border border-separate border-spacing-y-2 border-spacing-2">
                    <tr class="">
                        <th class="pr-4">#</th>
                        <th class="pr-12">Titel</th>
                        <th class="pr-12">Album</th>
                        <th class="pr-12">År</th>
                        <th>Längd</th>
                        <th>Ta bort</th>
                    </tr>`;

    result.songs.forEach(song => {
        html += SongInfo(song);
    });

    /* html += `<td>
                <button onclick="deleteSong(${id})" class="inline-block bg-blue-300 text-xs text-black border border-white px-3 py-1 rounded-md ml-2"></button>
            </td>`; */
    html += `</table>`;

    return html;
}