export const cloudinaryService = {
    uploadFile
}

function uploadFile(ev) {
    const CLOUD_NAME = 'dswmustlv'
    const PRESET_NAME = 'mdft5iz6'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    // console.log('target', ev.target)
    formData.append('file', ev.target.files[0])
    // console.log('ev.target.files[0]):', ev.target.files[0])
    formData.append('upload_preset', PRESET_NAME);
    // console.log('formData:', formData)

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log('res', res)
            return res
        })
        .catch(err => console.error(err))
}
