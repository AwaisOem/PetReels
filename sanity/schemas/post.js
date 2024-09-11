export default 
{
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: 
    [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string'
        },
        {
            name: 'video',
            title: 'Video',
            type: 'file',
            options: 
            {
                hotspot: true
            }
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'userID',
            title: 'User ID',
            type: 'string'
        },
        {
            name: 'postedBy',
            title: 'Posted By',
            type: 'postedBy'
        },
        {
            name: 'likes',
            title: 'Likes',
            type: 'array',
            of:[{
                    type: 'reference',
                    to: [{ type: 'user'}]
                }] 
        },
        {
            name: 'comments',
            title: 'Comment',
            type: 'array',
            of: [{ type: 'comment'}]
        },
        {
            name: 'topic',
            title: 'Topic',
            type: 'string'
        }
    ]
}