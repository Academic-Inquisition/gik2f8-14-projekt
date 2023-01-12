const PlaylistSelect = (playlist, id) => {
    let html = `<li>
                    <button onclick="(renderPlayList(${id}))" class="rounded bg-blue-700 text-white hover:bg-blue-400 px-2 py-2 ml-2 mt-2">`
    html += playlist.replace('.json', '');
    html += `   </button>
            </li>`

    return html;
}