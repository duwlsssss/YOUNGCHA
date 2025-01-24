import StarRating from '../common-ui/star-rating/StarRating'
import * as S from './CommentDetail.styled'
import { Button } from '../common-ui/button/Button'
import { useRef, useState } from 'react'
import { Input } from '../common-ui/input/Input'
import { Comment } from '@/types/commentDetail'
import { useCommentDelete } from '@/hooks/mutations/useCommentDelete'
import { useCommentEdit } from '@/hooks/mutations/useCommentEdit'
import { toastError } from '@/utils/toast'

export const ReviewComment = ({
  commentData
}: {
  commentData: Comment | undefined
}) => {
  const [isReadOnly, setIsReadOnly] = useState(true)
  const commentRef = useRef<HTMLInputElement>(null)
  const [commentValue, setCommentValue] = useState(commentData?.comment || '')

  const { updateCommentMutation } = useCommentEdit({
    comment_id: commentData?.comment_id || '',
    newComment: commentRef.current?.value || ''
  })
  const { deleteCommentMutation } = useCommentDelete(
    commentData?.comment_id || ''
  )

  const handelDeleteComment = () => {
    if (window.confirm('선택한 댓글을을 삭제하시겠습니까?')) {
      deleteCommentMutation()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (commentRef.current) {
      setCommentValue(e.target.value)
      commentRef.current.value = e.target.value
    }
  }

  const handelEditMode = () => {
    setIsReadOnly(!isReadOnly)
    if (!isReadOnly) {
      if (commentRef.current?.value === '') {
        setCommentValue(commentData?.comment || '')
      }
    }
  }
  const handleSubmit = () => {
    if (commentRef.current?.value === '') {
      toastError('댓글을 입력해주세요.')
      return
    } else {
      updateCommentMutation()
      setIsReadOnly(!isReadOnly)
    }
  }

  if (!commentData) {
    return <p>데이터가 없습니다.</p>
  }
  return (
    <S.ReviewCommentContainer>
      <S.RatingSection>
        <div>
          <p>평점</p>
          <StarRating
            size={30}
            initialRating={commentData.rating || 0}
            isReadOnly={isReadOnly}
          />
        </div>
        {!isReadOnly ? (
          <div>
            <Button
              color="transparent"
              size="small"
              fontSize="12px"
              onClick={handelEditMode}>
              취소
            </Button>
            <Button
              size="small"
              fontSize="12px"
              onClick={handleSubmit}>
              수정 완료
            </Button>
          </div>
        ) : (
          <div>
            <Button
              color="transparent"
              size="small"
              fontSize="12px"
              onClick={handelEditMode}>
              수정
            </Button>
            <Button
              color="transparent"
              size="small"
              fontSize="12px"
              onClick={handelDeleteComment}>
              삭제
            </Button>
          </div>
        )}
      </S.RatingSection>
      <S.CommentSection readonly={isReadOnly}>
        <p>평가</p>
        <Input
          readOnly={isReadOnly}
          value={commentValue}
          type="textarea"
          ref={commentRef}
          onChange={handleChange}
        />
      </S.CommentSection>
    </S.ReviewCommentContainer>
  )
}
