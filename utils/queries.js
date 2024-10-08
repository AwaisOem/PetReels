export const allPostsQuery = () => {
    const query = `*[_type == "post"] | order(_createdAt desc){
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
        postedBy->{
          _id,
          userName,
          image,
          verified
        },
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image,
        verified
      },
      }
    }`;
  
    return query;
  };
  
  export const postDetailQuery = (postId) => {
    const query = `*[_type == "post" && _id == '${postId}']{
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image,
        verified,
        followers
      },
       likes,
       comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;
    return query;
  };
  
  export const searchPostsQuery = (searchTerm) => {
    const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image,
        verified
      },
  likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image,
        verified
      },
      }
    }`;
    return query;
  };
  
  export const searchUsersQuery = (searchTerm) => {
    const query = `*[_type == "user" && userName match '${searchTerm}*' || _id match '${searchTerm}*']`;
    return query;
  };
  
  export const singleUserQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']
    {
      _id,image,userName,verified,followers,saved
    }`;
    return query;
  };
  
  export const verifiedUserQuery = () => {
    const query = `*[_type == "user" && verified == true]`;
    return query;
  };
  
  export const allUsersQuery = () => {
    const query = `*[_type == "user"]`;
  
    return query;
  };
  
  export const userCreatedPostsQuery = (userId) => {
    const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image,
        verified
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image,
        verified
      },
      }
    }`;
  
    return query;
  };
  
  export const userLikedPostsQuery = (userId) => {
    const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image,
        verified
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image,
        verified
      },
      }
    }`;
  
    return query;
  };
  
  export const topicPostsQuery = (topic) => {
    const query = `*[_type == "post" && topic match '${topic}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image,
        verified
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`;
  
    return query;
  };
  