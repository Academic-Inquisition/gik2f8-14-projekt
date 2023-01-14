const PlaylistSelect = (playlist) => {
    let html = `<li>
                    <button onclick="renderPlayList('${playlist}')" class="rounded bg-blue-700 text-white hover:bg-blue-400 px-2 py-2 ml-2 mt-2">`
    html += playlist.replace('.json', '');
    html += `   </button>  
            </li>`

    return html;
}