import {Base64File} from 'js-base64-file'

export const encode64 = async (filename) => {
    const file = new Base64File()

    const fileUrl = "http://localhost:5000/files/"

    const data64 = await file.loadRemote(fileUrl, filename)

    return data64
}