type Props = {
    req: any,
    res: any
}

export default function exit({req, res}: Props) {
  res.clearPreviewData()
  res.writeHead(307, {Location: '/'})
  res.end()
}