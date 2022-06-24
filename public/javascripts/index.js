import { getPosts, getUserPosts } from './post_system.js'
import { likePost } from './like_system.js'
import { commentPost } from './comment_system.js'
import { follow, unfollow } from './follow_system.js'
import { getTrandingPosts } from './trending_system.js'

if (typeof PAGE != 'undefined') {

    switch(PAGE){
        case 'INDEX':
            getPosts()
            likePost()
            commentPost()
            break;
        case 'PROFILE':
            let userUrl = window.location.href.split('/')
            userUrl = userUrl[userUrl.length - 1]
            getUserPosts(userUrl)
            follow()
            unfollow()
            break;
        case 'TRENDING':
            getTrandingPosts()
            break;
    }
    
}