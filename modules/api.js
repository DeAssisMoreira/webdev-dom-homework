const host = 'https://wedev-api.sky.pro/api/v1/vlad-pozharov'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}

export const postComment = (name, text, retryCount = 3) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            name,
            text,
            forceError: true,
        }),
    }).then((response) => {
        if (response.status === 500 && retryCount > 0) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(postComment(name, text, retryCount - 1))
                }, 1000)
            })
        }

        if (response.status === 500) {
            throw new Error('Ошибка сервера')
        }
        if (response.status === 400) {
            throw new Error('Количество символов должно быть не менее трех')
        }
        if (response.status === 201) {
            return response.json()
        }
    })
}
