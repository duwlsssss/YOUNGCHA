import { PosterBox } from '@/components/common-ui/poster/PosterBox'
import * as S from '@/components/comment-detail/CommentDetail.styled'
import * as Skeleton from '@/components/comment-detail/CommentDetailSkeleton'
import checkIsMovie from '@/utils/checkIsMovie'
import { MediaDetails } from '@/types/media'
import { Link } from 'react-router-dom'

export const CommentPosterBox = ({
  mediaData,
  isLoading,
  created_at
}: {
  mediaData: MediaDetails | undefined
  isLoading: boolean
  created_at: string
}) => {
  if (!mediaData) {
    return <p>mediaData를 불러오는 걸 실패했습니다</p>
  }
  return (
    <S.ContentsHeader>
      <Link
        to={`/media-details/${checkIsMovie(mediaData) ? 'movie' : 'tv'}/${mediaData.id}`}>
        <PosterBox
          isLoading={isLoading}
          title={checkIsMovie(mediaData) ? mediaData.title : mediaData.name}
          imageUrl={`${import.meta.env.VITE_TMDB_IMG_URL}${mediaData.poster_path}`}
          date={
            checkIsMovie(mediaData)
              ? mediaData.release_date
              : mediaData.first_air_date
          }
          flex={true}
        />
      </Link>
      {isLoading ? (
        <Skeleton.WrittenDate />
      ) : (
        <S.WrittenDate>작성일: {created_at}</S.WrittenDate>
      )}
    </S.ContentsHeader>
  )
}
