import { usePreview } from "@/lib/sanity.preview"

type Props = {
  query: string
}

export default function PreviewDocumentsCount({query}: Props) {
  const data = usePreview(null, query)
  return (
      // <DocumentsCount data={data} />
      <div>Helloo</div>
  )
}