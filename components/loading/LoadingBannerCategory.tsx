import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";


type Props = {}

const LoadingBannerCategory = (props: Props) => {
  return (
    <div className='mt-10'>
        <Skeleton height={250} />
    </div>
  )
}

export default LoadingBannerCategory