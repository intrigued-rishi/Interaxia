for(let i=0;i<$('.post-comments-submit').length;i++){    
    $('.post-comments-submit').eq(i).on('click',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/comments/create',
            data:$(".comments-form").eq(0).serialize(),
            success:function(data){
                let comment = newCommentDom(data.data.comment);
                $(`#post-comments-${data.data.comment.post}`).prepend(comment);
                $('#comment-val').val("");
                new Noty({
                    theme: 'relax',
                    text: "Comment published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error:function(err){
                console.log(error.responseText);
                new Noty({
                    theme: 'danger',
                    text:"Error in publishing comment :3",
                    type: 'failure',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            }
        });
    });
}    

function newCommentDom(comment){
    // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
    return $(`<li id="comment-${ comment._id }">
                    <p>
                        
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                        </small>
                        
                        ${comment.content}
                        <br>
                        <small>
                            ${comment.user.name}
                        </small>
                    </p>    

            </li>`);
}