import service from '.';

export function getRec(username, rec) {
    return service({
        method: 'GET',
        url: '/book_mess/home',
        params: {
            username: username,
            rec: rec,
        },
        timeout: 10000,
    });
}

export function getDetail(username,bid) {
    return service({
        method: 'GET',
        url: '/books/bookdetail',
        params: {
            username: username,
            bid: bid,
        },
        timeout:10000,
    });
}

export function getComment(bid,chapter) {
    return service({
        method: 'GET',
        url: '/books/comment',
        params: {
            bid: bid,
            chapter: chapter,
        },
        timeout:10000,
    });
}

export function getDirectory(bid) {
    return service({
        method: 'GET',
        url: '/book_mess/getIndex/',
        params: {
            bid:bid,
        },
        timeout:10000,
    });
}

export function recordReading(bid,username) {
    return service({
        method: 'GET',
        url: '/book_mess/one/',
        params: {
            bid: bid,
            username:username,
        },
        timeout:10000,
    });
}

export function bookRating(username,bid,rate) {
    return service({
        method: 'POST',
        url: '/books/dorating/',
        params: {
            bid: bid,
            username:username,
        },
        timeout: 10000,
        data: {
            'username': username,
            'bid': bid,
            'rate':rate,
        },
    });
}

export function searchBook(q) {
    return service({
        method: 'GET',
        url: '/book_mess/search/',
        params: {
            q,
        },
        timeout:10000,
    });
}

export function postComment(username,bid,chapter,content) {
    return service({
        method: 'POST',
        url: '/books/comment/',
        data: {
            username,
            bid,
            chapter,
            content,
        },
        timeout:10000,
    });
}

export function postFavorite(user_id,book_id) {
    return service({
        method: 'POST',
        url: '/center/addbooktoshelf/',
        data: {
            user_id,
            book_id,
        },
        timeout:10000,
    });
}

export function getAll() {
    return service({
        method: 'GET',
        url: '/books/all',
        timeout: 10000,
    });
}

export function getCate(tag) {
    return service({
        method: 'GET',
        url: '/books/category/',
        params: {
            tag:tag,
        },
        timeout: 10000,
    });
}

export function getNewChap(user_id) {
    return service({
        method: 'GET',
        url: '/message/Message/',
        params: {
            user_id,
        },
        timeout: 10000,
    });
}

export function checkNewChap(user_id) {
    return service({
        method: 'GET',
        url: '/message/checkNewMessage/',
        params: {
            user_id,
        },
        timeout: 10000,
    });
}

export function readMessage(user_id,message_id) {
    return service({
        method: 'POST',
        url: '/message/readMessage/',
        data: {
            user_id,
            message_id
        },
        timeout: 10000,
    });
}

export function getChapter(bid, chapter) {
  return service({
    method: "GET",
    url: "/book_mess/getChapter/",
    params: {
      bid: bid,
      chapter: chapter,
    },
    timeout: 10000,
  });
}

export function getIndex(bid) {
  return service({
    method: "GET",
    url: "/book_mess/getIndex/",
    params: {
      bid: bid,
    },
    timeout: 10000,
  });
}

export function getBookTag(user_id, bid, chapter) {
  return service({
    method: "GET",
    url: "/books/bookTag/",
    params: {
      user_id: user_id,
      bid: bid,
      chapter: chapter,
    },
    timeout: 10000,
  });
}

export function addBookTag(
  user_id,
  bid,
  chapter,
  offset,
  length,
  content,
  color,
  fill,
  priv
) {
  return service({
    method: "POST",
    url: "/books/bookTag/",
    data: {
      user_id,
      bid,
      chapter,
      offset,
      length,
      content,
      color,
      fill,
      private: priv,
    },
    timeout: 10000,
  });
}

export function updateBookTag(tag_id, user_id, content, color, fill, priv) {
  return service({
    method: "OPTIONS",
    url: "/books/bookTag/",
    params: {
      tag_id,
      user_id,
    },
    data: {
      content,
      color,
      fill,
      private: priv,
    },
    timeout: 10000,
  });
}

export function deleteBookTag(tag_id, user_id, bid, chapter) {
  return service({
    method: "DELETE",
    url: "/books/bookTag/",
    params: {
      tag_id,
      user_id,
      bid,
      chapter,
    },
    timeout: 10000,
  });
}

export function getReadingTime(username) {
    return service({
        method: 'GET',
        url: '/center/timeAnalyze',
        params: {
            username:username,
        },
        timeout:10000,
    });
}
export function getMyWorks(user_name) {
    return service({
        method: 'GET',
        url: '/book_mess/GetMyBook',
        params: {
            user_name:user_name,
        },
        timeout:10000,
    });
}
export function getMyCollect(user_id,type) {
    return service({
        method: 'GET',
        url: '/center/getbookfromshelf',
        params: {
            user_id:user_id,
            type:type,
        },
        timeout:10000,
    });
}
export function getMyPopularizing(username) {
    return service({
        method: 'GET',
        url: '/popularize/get_by_username',
        params: {
            username:username,
        },
        timeout:10000,
    });
}

export function postSignIn(username, password) {
    return service({
        method: 'POST',
        url: '/api/users/login/',
        data: {
            username: username,
            password: password,
        },
        timeout: 10000,
    });
}
export function postSignUp(username, password,passwordConfirmation,email) {
    return service({
        method: 'POST',
        url: '/api/users/register/',
        data: {
            username: username,
            password: password,
            passwordConfirmation:passwordConfirmation,
            email: email,
        },
        timeout: 10000,
    });
}
export function postActivate(username, email,code) {
    return service({
        method: 'POST',
        url: '/api/users/activeUser/',
        data: {
            username: username,
            email: email,
            code: code,
        },
        timeout: 10000,
    });
}
export function postForgetPassword(username,newpassword,newPasswordConfirmation,email) {
    return service({
        method: 'POST',
        url: '/api/users/forgetPassword/',
        data: {
            username: username,
            newpassword: newpassword,
            newPasswordConfirmation:newPasswordConfirmation,
            email: email,
        },
        timeout: 10000,
    });
}
export function postFindPassword(username,newpassword,newPasswordConfirmation,email,code) {
    return service({
        method: 'POST',
        url: '/api/users/findPassword/',
        data: {
            username: username,
            newpassword: newpassword,
            newPasswordConfirmation:newPasswordConfirmation,
            email: email,
            code: code,
        },
        timeout: 10000,
    });
}
export function postPopularize(username,book,target,tag) {
    return service({
        method: 'POST',
        url: '/popularize/add_popularize/',
        data: {
            username: username,
            book:book,
            target:target,
            tag:tag,
        },
        timeout: 10000,
    });
}

export function postNewChapter(formData) {
    return service({
        method: 'POST',
        url: '/book_mess/bookUpload/',
        data: formData, // 使用 FormData 作为请求数据
        timeout: 10000,
        headers: {
            'Content-Type': 'multipart/form-data', // 设置请求头
        },
    });
}

    export function postNewBook(formData) {
        return service({
            method: 'POST',
            url: '/book_mess/NewBookUpload/',
            data: formData, // 使用 FormData 作为请求数据
            timeout: 10000,
            headers: {
                'Content-Type': 'multipart/form-data', // 设置请求头
            },
        });
    }
export function getAuthorScore(authorname) {
    return service({
        method: 'GET',
        url: '/books/rateForAuthor',
        params: {
            authorname:authorname,
        },
        timeout: 10000,
    });
}
export function postAuthorScore(username,authorname,rate) {
    return service({
        method: 'POST',
        url: '/books/rateForAuthor/',
        data: {
            username:username,
            authorname:authorname,
            rate:rate,
        },
        timeout: 10000,
    });
}
    export function postUploadAvatar(formData) {
        return service({
            method: 'POST',
            url: '/api/users/uploadAvatar/',
            data: formData, // 使用 FormData 作为请求数据
            timeout: 10000,
            headers: {
                'Content-Type': 'multipart/form-data', // 设置请求头
            },
        });
    }

export function getBrowsingHistory(username) {
    return service({
        method: 'GET',
        url: '/book_mess/getHistory',
        params: {
            username:username,
        },
        timeout: 10000,
    });
}
export function getIsAuthor(username) {
    return service({
        method: 'GET',
        url: '/api/users/isAuthor',
        params: {
            username:username,
        },
        timeout: 10000,
    });
}
export function getMyRating(username) {
    return service({
        method: 'GET',
        url: '/books/myRating',
        params: {
            username:username,
        },
        timeout: 10000,
    });
}

export function postReadingProgress(user_id, bid, chapter, offset) {
    return service({
        method: "POST",
        url: "/books/readingProgress/",
        data: {
            user_id,
            bid,
            chapter,
            offset,
        },
        timeout: 10000,
    });
}

export function getLittleTag(littletag) {
    return service({
        method: 'GET',
        url: '/books/detail_category',
        params: {
            littletag,
        },
        timeout: 10000,
    });
}

export function addHistory(bid, username, duration) {
    return service({
        method: "POST",
        url: "/books/addHistory/",
        data: {
            bid,
            username,
            duration,
        },
        timeout: 10000,
    });
}

export function updateTimeForEveryBook(user_id, bid, time) {
    return service({
        method: "POST",
        url: "/books/readingTimeForEveryBook/",
        data: {
            user_id,
            bid,
            time,
        },
        timeout: 10000,
    });
}

export function getMyComment(username) {
    return service({
        method: 'GET',
        url: '/center/myComments',
        params: {
            username:username
        },
        timeout: 10000,
    });
}
    export function getMyAvatar(username) {
        return service({
            method: 'GET',
            url: '/api/users/getAvatar',
            params: {
                username:username
            },
            timeout: 10000,
        });
}
    
export function getReadingNum(username) {
        return service({
            method: 'GET',
            url: '/center/myReading',
            params: {
                username,
            },
            timeout: 10000,
        });
}
export function getReadingProcess(user_id,bid) {
    return service({
        method: 'GET',
        url: '/books/readingProgress',
        params: {
            user_id:user_id,
            bid:bid,
        },
        timeout: 10000,
    });
}
