import crypto from 'crypto';

export const taskProcessing = async(data) => {
    console.log(data);
    const title = data?.title;
    const description = data?.description || '';
    const hash = crypto.createHash('sha256').update(title).digest('hex');
    const wordCount = title.split(' ').length+description.split(' ').length;
    return {  hash, wordCount };
 
    
}