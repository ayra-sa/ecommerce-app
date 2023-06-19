import groq from 'groq'

type Props = {
    data: any,
}

export const query = groq`count(*[])`

export function DocumentsCount({data}: Props) {
  return (
    <>
      Documents: 
    </>
  )
}