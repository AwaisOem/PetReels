export default 
{
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'User Name',
            type : 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type : 'string',
            // for url of image
        },
        {
            name: 'verified',
            title: 'Verified',
            type : 'boolean',
        },
        {
            name: "followers",
            title: 'Followers',
            type : 'array',
            of:[{
                type: 'reference',
                to: [{ type: 'user'}]
            }] 
        },
        {
            name: "saved",
            title: 'Saved',
            type : 'array',
            of:[{
                type: 'reference',
                to: [{ type: 'post'}]
            }] 
        }
    ]
}