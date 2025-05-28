import { postComment } from './api.js'
import { comments, updateComments } from './comments.js'
import { deleteHtml } from './sanitizeHtml.js'

export const initLikeListeners = (renderComments) => {
    const addLikes = document.querySelectorAll('.like-button')
    for (const addLike of addLikes) {
        addLike.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = addLike.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1

            comment.isLiked = !comment.isLiked
            renderComments()
        })
    }
}

export const initReplyListeners = () => {
    const text = document.getElementById('text-input')
    const commentsElements = document.querySelectorAll('.comment')
    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const chosenComment = comments[commentElement.dataset.index]
            text.value = `${chosenComment.name}: ${chosenComment.text}`
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    const name = document.getElementById('name-input')
    const text = document.getElementById('text-input')

    const button = document.querySelector('.add-form-button')

    button.addEventListener('click', () => {
        if (name.value.trim() === '' || text.value.trim() === '') {
            alert('Заполните все поля')
            return
        }

        postComment(deleteHtml(text.value), deleteHtml(name.value)).then(
            (data) => {
                updateComments(data)
                renderComments()
                name.value = ''
                text.value = ''
            },
        )
    })
}
