var list_surat;
var judul_surat;
var id_surat;
var arti_surat;
var audio_surat;
var ayat_surat;
var keterangan_surat;
var rukuk_surat;
var type_surat;
var urut_surat;
var detail_surat;

$.ajax({
    type: 'GET',
    url: 'https://al-quran-8d642.firebaseio.com/data.json',
    data: '',
    dataType: 'json',
    success: function (result) {
        //console.log(result[0].nama);
        $('#daftar-surat').html('Daftar Surat');

        list_surat = '<ul class="list-group ">';
        $.each(result, function (i, data) {
            //  console.log(i);
            list_surat += `
            <li class="list-group-item kolom-daftar">
                <input id="id_surat" type="hidden" value="` + i + `"> 
                <a href = "#" onClick="tampilkanDetail(` + i + `)" > ` + data.nomor + `. ` + data.nama + ` (` + data.asma + `) </a>
            </li>`;
        });
        list_surat += '</ul>';
        $('#list-surat').html(list_surat);

        tampilkanDetail(0);
    }

});

function tampilkanDetail(id_surat_param) {
    id_surat = id_surat_param;
    //console.log(id_surat);

    $.ajax({
        type: 'GET',
        url: 'https://al-quran-8d642.firebaseio.com/data.json',
        data: '',
        dataType: 'json',
        success: function (result) {
            judul_surat = result[id_surat].nama;
            arti_surat = result[id_surat].arti;
            audio_surat = result[id_surat].audio;
            ayat_surat = result[id_surat].ayat;
            keterangan_surat = result[id_surat].keterangan;
            rukuk_surat = result[id_surat].rukuk;
            type_surat = result[id_surat].type;
            nomor_surat = result[id_surat].nomor;
            urut_surat = result[id_surat].urut;

            detail_surat = `<ul class="list-group justify">
                                <li class="list-group-item keterangan"><strong>Arti</strong> : ` + arti_surat + `</li>
                                <li class="list-group-item keterangan"><strong>No Urut</strong> : ` + nomor_surat + `</li>
                                <li class="list-group-item keterangan"><strong>Jumlah Ayat</strong> : ` + ayat_surat + `</li>
                                <li class="list-group-item keterangan"><strong>Tipe</strong> : ` + type_surat.charAt(0).toUpperCase() + type_surat.slice(1) + `</li>
                                <li class="list-group-item keterangan"><strong>Keterangan</strong> : ` + keterangan_surat + `</li>
                                <li class="list-group-item keterangan"><strong>Murotal</strong> : <a class="murotal" target="_blank" href="` + audio_surat + `">` + judul_surat + `</li>
                            </ul>`;

            $('#nama-surat').html(judul_surat);
            $('#detail-surat').html(detail_surat);
        }
    });

}